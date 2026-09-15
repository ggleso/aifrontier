import { execFile } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { promisify } from 'node:util';
import { crawlKinfaCatalog } from '../src/kinfa-crawler.js';

const run = promisify(execFile);
const siteDirectory = resolve('nhfit-cloudflare-site');
const temporaryDirectory = await mkdtemp(join(tmpdir(), 'aifrontier-catalog-'));
const snapshotPath = join(temporaryDirectory, 'catalog.json');

try {
  const snapshot = await crawlKinfaCatalog();
  if (snapshot.products.length < 10) {
    throw new Error(`수집 상품 수가 비정상적으로 적습니다: ${snapshot.products.length}`);
  }
  await writeFile(snapshotPath, JSON.stringify(snapshot), { encoding: 'utf8', mode: 0o600 });
  await run(
    'npx',
    [
      'wrangler',
      'kv',
      'key',
      'put',
      'catalog:latest',
      '--binding',
      'PRODUCT_CATALOG',
      '--remote',
      '--path',
      snapshotPath,
    ],
    { cwd: siteDirectory },
  );
  console.log(`상품 ${snapshot.products.length}개를 Cloudflare KV에 동기화했습니다.`);
} finally {
  await rm(temporaryDirectory, { recursive: true, force: true });
}
