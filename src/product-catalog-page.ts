import { productCatalogFixture } from './product-catalog-fixture.js';

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

export function renderProductCatalogPage() {
  const rows = productCatalogFixture.products
    .map(
      (p) =>
        `<tr><td><strong>${escapeHtml(p.name)}</strong><small>${escapeHtml(p.operator)}</small></td><td>${escapeHtml(p.audience)}</td><td>${escapeHtml(p.rateOrFee)}</td><td>${escapeHtml(p.status)}</td><td>${escapeHtml(p.effectiveAt)}<small>확인 ${escapeHtml(p.lastVerifiedAt)}</small></td><td><a href="${escapeHtml(p.source.url)}" rel="noreferrer">공식 출처</a></td></tr>`,
    )
    .join('');
  const changes = productCatalogFixture.changes
    .map(
      (c) =>
        `<li><b>${escapeHtml(c.status)}</b> ${escapeHtml(c.summary)}<small>발표 ${escapeHtml(c.announcedAt ?? '미상')} · 시행 ${escapeHtml(c.effectiveAt ?? '미상')} · 탐지 ${escapeHtml(c.detectedAt)}</small></li>`,
    )
    .join('');
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>NH FIT 상품 정보 허브</title><style>body{margin:0;background:#f3f7f5;color:#17352b;font:15px system-ui}main{max-width:1120px;margin:auto;padding:32px}h1{font-size:32px}.notice{background:#fff6d9;border:1px solid #ead28a;padding:14px;border-radius:12px}.grid{display:grid;grid-template-columns:2fr 1fr;gap:20px;margin-top:20px}.card{background:white;padding:20px;border-radius:16px;box-shadow:0 8px 24px #17352b12;overflow:auto}table{width:100%;border-collapse:collapse}th,td{text-align:left;padding:12px;border-bottom:1px solid #e4ebe7;vertical-align:top}small{display:block;color:#60766e;margin-top:5px}li{padding:12px 0;border-bottom:1px solid #e4ebe7}a{color:#087b52}@media(max-width:800px){.grid{grid-template-columns:1fr}}</style></head><body><main><p>NH FIT · 직원 검토용</p><h1>포용금융 상품 정보 허브</h1><p class="notice">공공데이터로 목록을 만들고, 공식 공지에서 변경 후보를 탐지한 뒤, 운영기관 상품설명서로 확정합니다. 실제 안내 직전 반드시 공식 출처를 다시 확인하세요.</p><div class="grid"><section class="card"><h2>상품 목록</h2><table><thead><tr><th>상품</th><th>대상</th><th>금리·보증료</th><th>접수</th><th>시행/확인</th><th>근거</th></tr></thead><tbody>${rows}</tbody></table></section><aside class="card"><h2>변경 이력</h2><ul>${changes}</ul><h3>운영 주기</h3><p>공지 ${productCatalogFixture.cadence.notices}<br>전체 대조 ${productCatalogFixture.cadence.fullReconciliation}<br>${productCatalogFixture.cadence.beforeAdvice}</p></aside></div></main></body></html>`;
}
