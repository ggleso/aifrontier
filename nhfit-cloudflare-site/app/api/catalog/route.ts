import { productCatalogFixture } from '../../../../src/product-catalog-fixture';

export const dynamic = 'force-dynamic';

export function GET() {
  return Response.json(productCatalogFixture, { headers: { 'cache-control': 'no-store' } });
}
