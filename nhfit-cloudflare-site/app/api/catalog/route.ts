import { env } from 'cloudflare:workers';
import { productCatalogFixture } from '../../../../src/product-catalog-fixture';
import type { CatalogSnapshot } from '../../../../src/product-catalog';

export const dynamic = 'force-dynamic';

export async function GET() {
  const catalog = await env.PRODUCT_CATALOG?.get<CatalogSnapshot>('catalog:latest', 'json');
  return Response.json(catalog ?? productCatalogFixture, {
    headers: catalog
      ? { 'cache-control': 'public, max-age=900' }
      : { 'cache-control': 'no-store', 'x-catalog-fallback': 'fixture' },
  });
}
