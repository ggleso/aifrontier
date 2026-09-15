import type { CatalogSnapshot } from './product-catalog.js';

export const productCatalogFixture: CatalogSnapshot = {
  generatedAt: '2026-09-15T00:00:00+09:00',
  cadence: {
    notices: '매일~주 1회',
    fullReconciliation: '월 1회',
    beforeAdvice: '안내 직전 재확인',
  },
  products: [
    {
      id: 'kinfa-sunshine-loan-youth',
      name: '햇살론유스',
      operator: '서민금융진흥원',
      institutions: ['취급 금융회사'],
      audience: '청년층의 금융애로 완화 지원',
      eligibility: ['세부 소득·나이·취업 상태는 공식 안내에서 확인'],
      rateOrFee: '공식 최신 안내 확인',
      limit: '공식 최신 안내 확인',
      repayment: '공식 최신 안내 확인',
      applicationPeriod: '상시 여부 재확인',
      status: 'unknown',
      effectiveAt: '2026-09-15',
      lastVerifiedAt: '2026-09-15',
      source: {
        kind: 'operator',
        publisher: '서민금융진흥원',
        retrievedAt: '2026-09-15T00:00:00+09:00',
        url: 'https://www.kinfa.or.kr/financialProduct/peopleFinancial.do',
      },
    },
  ],
  changes: [
    {
      id: 'notice-example-20260915',
      productId: 'kinfa-sunshine-loan-youth',
      detectedAt: '2026-09-15T00:00:00+09:00',
      announcedAt: '2026-09-15',
      effectiveAt: '2026-10-01',
      status: 'candidate',
      summary: '예시 변경 후보 — 운영기관 상세 안내로 검증 필요',
      source: {
        kind: 'notice',
        publisher: '금융위원회/운영기관 공지 예시',
        retrievedAt: '2026-09-15T00:00:00+09:00',
        url: 'https://www.fsc.go.kr/no010101',
      },
    },
  ],
};
