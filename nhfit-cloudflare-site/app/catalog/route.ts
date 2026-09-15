import { env } from 'cloudflare:workers';
import { renderProductCatalogPage } from '../../../src/product-catalog-page';
import { productCatalogFixture } from '../../../src/product-catalog-fixture';
import type { CatalogSnapshot } from '../../../src/product-catalog';

export const dynamic = 'force-dynamic';

export async function GET() {
  const catalog =
    (await env.PRODUCT_CATALOG?.get<CatalogSnapshot>('catalog:latest', 'json')) ??
    productCatalogFixture;
  return new Response(renderProductCatalogPage(catalog), {
    headers: {
      'cache-control': 'no-store',
      'content-type': 'text/html; charset=utf-8',
      'content-security-policy':
        "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
      'x-content-type-options': 'nosniff',
    },
  });
}
