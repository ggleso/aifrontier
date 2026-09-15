import { renderProductCatalogPage } from '../../../src/product-catalog-page';

export const dynamic = 'force-dynamic';

export function GET() {
  return new Response(renderProductCatalogPage(), {
    headers: {
      'cache-control': 'no-store',
      'content-type': 'text/html; charset=utf-8',
      'content-security-policy':
        "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
      'x-content-type-options': 'nosniff',
    },
  });
}
