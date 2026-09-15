export type ProductStatus = 'open' | 'scheduled' | 'closed' | 'unknown';

export interface ProductSource {
  url: string;
  publisher: string;
  retrievedAt: string;
  kind: 'public-data' | 'operator' | 'institution' | 'notice';
}

export interface FinancialProduct {
  id: string;
  name: string;
  operator: string;
  institutions: string[];
  audience: string;
  eligibility: string[];
  rateOrFee: string;
  limit: string;
  repayment: string;
  applicationPeriod: string;
  status: ProductStatus;
  announcedAt?: string;
  effectiveAt: string;
  lastVerifiedAt: string;
  source: ProductSource;
}

export interface ProductChange {
  id: string;
  productId: string;
  detectedAt: string;
  announcedAt?: string;
  effectiveAt?: string;
  status: 'candidate' | 'verified' | 'rejected';
  summary: string;
  before?: FinancialProduct;
  after?: FinancialProduct;
  source: ProductSource;
}

export interface CatalogSnapshot {
  generatedAt: string;
  products: FinancialProduct[];
  changes: ProductChange[];
  cadence: { notices: string; fullReconciliation: string; beforeAdvice: string };
}

const clone = <T>(value: T): T => structuredClone(value);

export function detectChanges(
  current: readonly FinancialProduct[],
  incoming: readonly FinancialProduct[],
  detectedAt: string,
): ProductChange[] {
  const previous = new Map(current.map((product) => [product.id, product]));
  return incoming.flatMap((product) => {
    const before = previous.get(product.id);
    if (!before) {
      return [
        {
          id: `${product.id}:${detectedAt}`,
          productId: product.id,
          detectedAt,
          ...(product.announcedAt ? { announcedAt: product.announcedAt } : {}),
          effectiveAt: product.effectiveAt,
          status: 'candidate' as const,
          summary: `신규 상품 후보: ${product.name}`,
          after: clone(product),
          source: clone(product.source),
        },
      ];
    }
    const comparable = (item: FinancialProduct) =>
      JSON.stringify({
        name: item.name,
        audience: item.audience,
        eligibility: item.eligibility,
        rateOrFee: item.rateOrFee,
        limit: item.limit,
        repayment: item.repayment,
        applicationPeriod: item.applicationPeriod,
        status: item.status,
        effectiveAt: item.effectiveAt,
      });
    if (comparable(before) === comparable(product)) return [];
    return [
      {
        id: `${product.id}:${detectedAt}`,
        productId: product.id,
        detectedAt,
        ...(product.announcedAt ? { announcedAt: product.announcedAt } : {}),
        effectiveAt: product.effectiveAt,
        status: 'candidate' as const,
        summary: `조건 변경 후보: ${product.name}`,
        before: clone(before),
        after: clone(product),
        source: clone(product.source),
      },
    ];
  });
}

export function verifyChange(
  history: readonly ProductChange[],
  changeId: string,
  verifiedProduct: FinancialProduct,
  source: ProductSource,
): ProductChange[] {
  return history.map((entry) =>
    entry.id === changeId
      ? {
          ...clone(entry),
          status: 'verified' as const,
          after: clone(verifiedProduct),
          source: clone(source),
        }
      : clone(entry),
  );
}

export interface PublicDataAdapterOptions {
  endpoint: string;
  serviceKey?: string;
  fetcher?: typeof fetch;
}

export async function fetchPublicDataProducts(options: PublicDataAdapterOptions): Promise<unknown> {
  if (!options.serviceKey) throw new Error('PUBLIC_DATA_SERVICE_KEY is not configured');
  const url = new URL(options.endpoint);
  url.searchParams.set('serviceKey', options.serviceKey);
  url.searchParams.set('type', 'json');
  const response = await (options.fetcher ?? fetch)(url, {
    headers: { accept: 'application/json' },
  });
  if (!response.ok) throw new Error(`Public data request failed (${response.status})`);
  return response.json();
}
