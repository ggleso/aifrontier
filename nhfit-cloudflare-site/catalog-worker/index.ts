import { crawlKinfaCatalog } from '../../src/kinfa-crawler.js';

interface Env {
  PRODUCT_CATALOG: KVNamespace;
}
const SNAPSHOT_KEY = 'catalog:latest';

async function sync(env: Env) {
  const snapshot = await crawlKinfaCatalog();
  if (!snapshot.products.length) throw new Error('empty catalog rejected');
  await env.PRODUCT_CATALOG.put(SNAPSHOT_KEY, JSON.stringify(snapshot), {
    metadata: { generatedAt: snapshot.generatedAt, productCount: snapshot.products.length },
  });
}

export default {
  async fetch(_request: Request, env: Env) {
    const stored = await env.PRODUCT_CATALOG.getWithMetadata(SNAPSHOT_KEY);
    return Response.json({
      status: stored.value ? 'ready' : 'empty',
      metadata: stored.metadata,
    });
  },
  async scheduled(_controller: ScheduledController, env: Env, ctx: ExecutionContext) {
    ctx.waitUntil(sync(env));
  },
};
