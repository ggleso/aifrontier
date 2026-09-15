import { describe, expect, it, vi } from 'vitest';
import {
  detectChanges,
  fetchPublicDataProducts,
  verifyChange,
  type FinancialProduct,
} from '../src/product-catalog.js';
import { renderProductCatalogPage } from '../src/product-catalog-page.js';
import { extractKinfaLinks, parseKinfaProduct } from '../src/kinfa-crawler.js';

const product = (rateOrFee = '연 3%'): FinancialProduct => ({
  id: 'p1',
  name: '테스트상품',
  operator: '운영기관',
  institutions: ['은행'],
  audience: '대상',
  eligibility: ['조건'],
  rateOrFee,
  limit: '1천만원',
  repayment: '분할',
  applicationPeriod: '상시',
  status: 'open',
  announcedAt: '2026-09-01',
  effectiveAt: '2026-10-01',
  lastVerifiedAt: '2026-09-15',
  source: {
    kind: 'operator',
    publisher: '운영기관',
    retrievedAt: '2026-09-15',
    url: 'https://example.com/product',
  },
});

describe('product catalog lifecycle', () => {
  it('detects changed conditions without mutating the previous record', () => {
    const before = product();
    const changes = detectChanges([before], [product('연 4%')], '2026-09-16');
    expect(changes).toHaveLength(1);
    expect(changes[0]?.before?.rateOrFee).toBe('연 3%');
    expect(changes[0]?.after?.rateOrFee).toBe('연 4%');
    expect(before.rateOrFee).toBe('연 3%');
  });
  it('keeps immutable history when a candidate is verified', () => {
    const history = detectChanges([], [product()], '2026-09-16');
    const verified = verifyChange(history, history[0]!.id, product('연 3.2%'), product().source);
    expect(history[0]?.status).toBe('candidate');
    expect(verified[0]?.status).toBe('verified');
  });
  it('requires optional public API credentials', async () => {
    await expect(fetchPublicDataProducts({ endpoint: 'https://example.com' })).rejects.toThrow(
      'PUBLIC_DATA_SERVICE_KEY',
    );
  });
  it('does not expose the key in returned data', async () => {
    const fetcher = vi.fn(() =>
      Promise.resolve(new Response('{"items":[]}', { status: 200 })),
    ) as unknown as typeof fetch;
    await expect(
      fetchPublicDataProducts({
        endpoint: 'https://example.com',
        serviceKey: 'not-a-real-secret',
        fetcher,
      }),
    ).resolves.toEqual({ items: [] });
  });
  it('renders provenance and distinct announcement/effective dates', () => {
    const html = renderProductCatalogPage();
    expect(html).toContain('공식 출처');
    expect(html).toContain('발표');
    expect(html).toContain('시행');
  });
  it('discovers official detail links and extracts qualification fields', () => {
    const links = extractKinfaLinks(
      '<p data-menuurl="/financialProduct/demo.do"><span>테스트 대출</span></p>',
    );
    expect(links).toEqual([
      { name: '테스트 대출', url: 'https://www.kinfa.or.kr/financialProduct/demo.do' },
    ]);
    const parsed = parseKinfaProduct(
      links[0]!,
      '<h2>지원대상</h2><p>연소득 4천만원 이하</p><h2>대출한도</h2><p>최대 1천만원</p><h2>대출금리</h2><p>연 5%</p><h2>상환방법</h2><p>원리금균등분할</p><h2>신청방법</h2><p>앱 신청</p>',
      '2026-09-15',
    );
    expect(parsed.audience).toContain('연소득 4천만원 이하');
    expect(parsed.limit).toContain('최대 1천만원');
    expect(parsed.rateOrFee).toContain('연 5%');
    expect(parsed.repayment).toContain('원리금균등분할');
  });
});
