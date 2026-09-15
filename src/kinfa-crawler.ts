import type { CatalogSnapshot, FinancialProduct } from './product-catalog.js';

const INDEX_URL = 'https://www.kinfa.or.kr/financialProduct/peopleFinancial.do';
const ORIGIN = 'https://www.kinfa.or.kr';
const LABELS = [
  '지원대상',
  '신청대상',
  '보증대상',
  '대출한도',
  '보증한도',
  '지원한도',
  '대출금리',
  '보증료율',
  '금리',
  '상환방법',
  '상환기간',
  '신청방법',
  '취급처',
];
const decode = (v: string) =>
  v
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#40;', '(')
    .replaceAll('&#41;', ')')
    .replace(/&#(\d+);/g, (_, c: string) => String.fromCodePoint(Number(c)));
const text = (html: string) =>
  decode(html)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export interface KinfaLink {
  name: string;
  url: string;
}
export function extractKinfaLinks(html: string): KinfaLink[] {
  const found = new Map<string, KinfaLink>();
  const pattern =
    /data-menuurl="(\/financialProduct\/[^"]+\.do)"[\s\S]{0,300}?<span[^>]*>([^<]+)<\/span>/gi;
  for (const match of html.matchAll(pattern)) {
    const name = text(match[2] ?? '');
    if (name && !found.has(match[1]!))
      found.set(match[1]!, { name, url: new URL(match[1]!, ORIGIN).href });
  }
  return [...found.values()];
}
const section = (plain: string, aliases: string[]) => {
  const starts = aliases
    .map((label) => ({ label, at: plain.indexOf(label) }))
    .filter((x) => x.at >= 0)
    .sort((a, b) => a.at - b.at);
  if (!starts.length) return '공식 상세페이지 확인';
  const start = starts[0]!.at + starts[0]!.label.length;
  const next =
    LABELS.map((label) => plain.indexOf(label, start + 2))
      .filter((at) => at > start)
      .sort((a, b) => a - b)[0] ?? Math.min(start + 900, plain.length);
  return plain.slice(start, next).trim().slice(0, 800) || '공식 상세페이지 확인';
};
export function parseKinfaProduct(
  link: KinfaLink,
  html: string,
  verifiedAt: string,
): FinancialProduct {
  const contentStart = html.lastIndexOf('<div class="sub-con">');
  const contentEnd = html.indexOf('<footer', Math.max(0, contentStart));
  const main =
    contentStart >= 0
      ? html.slice(contentStart, contentEnd > contentStart ? contentEnd : undefined)
      : (html.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)?.[0] ?? html);
  const plain = text(main);
  return {
    id: `kinfa-${link.url.split('/').pop()!.replace(/\.do$/, '').toLowerCase()}`,
    name: link.name,
    operator: '서민금융진흥원',
    institutions: [section(plain, ['취급처', '취급기관', '협약은행'])],
    audience: section(plain, ['지원대상', '신청대상', '보증대상']),
    eligibility: [section(plain, ['자격조건', '지원대상', '신청대상'])],
    rateOrFee: section(plain, ['대출금리 및 보증료율', '대출금리', '금리', '보증료율']),
    limit: section(plain, ['보증한도 및 보증기간', '대출한도', '보증한도', '지원한도']),
    repayment: section(plain, ['상환방법', '상환기간', '보증기간']),
    applicationPeriod: section(plain, ['신청방법', '이용절차', '신청기간']),
    status: 'unknown',
    effectiveAt: verifiedAt,
    lastVerifiedAt: verifiedAt,
    source: {
      kind: 'operator',
      publisher: '서민금융진흥원',
      retrievedAt: verifiedAt,
      url: link.url,
    },
  };
}
export async function crawlKinfaCatalog(fetcher: typeof fetch = fetch): Promise<CatalogSnapshot> {
  const now = new Date().toISOString();
  const index = await fetcher(INDEX_URL, {
    headers: { accept: 'text/html', 'user-agent': 'NH-FIT-Catalog/1.0' },
  });
  if (!index.ok) throw new Error(`KINFA index request failed (${index.status})`);
  const links = extractKinfaLinks(await index.text());
  if (!links.length) throw new Error('KINFA product links were not found');
  const rows = await Promise.all(
    links.map(async (link) => {
      const response = await fetcher(link.url, {
        headers: { accept: 'text/html', 'user-agent': 'NH-FIT-Catalog/1.0' },
      });
      return response.ok ? parseKinfaProduct(link, await response.text(), now.slice(0, 10)) : null;
    }),
  );
  const products = rows.filter((row): row is FinancialProduct => row !== null);
  return {
    generatedAt: now,
    products,
    changes: [],
    cadence: {
      notices: '매일~주 1회',
      fullReconciliation: '월 1회',
      beforeAdvice: '안내 직전 재확인',
    },
  };
}
