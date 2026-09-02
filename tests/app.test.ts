import { once } from 'node:events';
import type { AddressInfo } from 'node:net';
import { afterEach, describe, expect, it } from 'vitest';
import { createApp } from '../src/app.js';

const openServers: ReturnType<typeof createApp>[] = [];

afterEach(async () => {
  await Promise.all(
    openServers.splice(0).map(
      (server) =>
        new Promise<void>((resolve, reject) => {
          server.close((error) => (error ? reject(error) : resolve()));
        }),
    ),
  );
});

async function startServer() {
  const server = createApp();
  openServers.push(server);
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const { port } = server.address() as AddressInfo;
  return `http://127.0.0.1:${String(port)}`;
}

describe('HTTP app', () => {
  it('serves the example landing page', async () => {
    const baseUrl = await startServer();
    const response = await fetch(baseUrl);
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toBe('text/html; charset=utf-8');
    expect(response.headers.get('x-content-type-options')).toBe('nosniff');
    expect(response.headers.get('content-security-policy')).toContain("default-src 'none'");
    expect(body).toContain('<title>AI Frontier — Explore what comes next</title>');
    expect(body).toContain('Explore the <span>AI frontier.</span>');
    expect(body).toContain('From signal to evidence.');
    expect(body).toContain('No tracking · No external assets');
  });

  it('reports health', async () => {
    const baseUrl = await startServer();
    const response = await fetch(`${baseUrl}/health`);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ status: 'ok', service: 'aifrontier' });
    expect(response.headers.get('cache-control')).toBe('no-store');
  });

  it('returns JSON for unknown routes', async () => {
    const baseUrl = await startServer();
    const response = await fetch(`${baseUrl}/missing`);

    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({ error: 'not_found' });
  });
});
