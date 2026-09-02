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
  it('serves the NH FIT employee Copilot demo', async () => {
    const baseUrl = await startServer();
    const response = await fetch(baseUrl);
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toBe('text/html; charset=utf-8');
    expect(response.headers.get('x-content-type-options')).toBe('nosniff');
    expect(response.headers.get('content-security-policy')).toContain("default-src 'none'");
    expect(body).toContain('<title>NH FIT · 상담 Copilot 데모</title>');
    expect(body).toContain('DEMO-001');
    expect(body).toContain('Fake STT');
    expect(body).toContain('Browser STT');
    expect(body).toContain("fetch('/api/analyze'");
    expect(body).toContain('POSSIBLE');
    expect(body).toContain('SUPPORTED');
    expect(body).toContain('HIGHEST-VALUE CLARIFICATION');
    expect(body).toContain('활용');
    expect(body).toContain('나중에');
    expect(body).toContain('건너뛰기');
    expect(body).toContain('BURDEN_RELIEF');
    expect(body).toContain('DEBT_RECOVERY');
    expect(body).toContain('상품 추천 아님 · 직원 검토 필요');
    expect(body).toContain('AI는 판단하거나 승인하지 않습니다.');
  });

  it('reports health', async () => {
    const baseUrl = await startServer();
    const response = await fetch(`${baseUrl}/health`);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      status: 'ok',
      service: 'aifrontier',
      provider: 'local-rules',
    });
    expect(response.headers.get('cache-control')).toBe('no-store');
  });

  it('analyzes a transcript with the offline provider', async () => {
    const baseUrl = await startServer();
    const response = await fetch(`${baseUrl}/api/analyze`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ transcript: '급여일 전에 카드대금 납부가 걱정돼요.' }),
    });
    const body = (await response.json()) as { provider: string; signals: { code: string }[] };

    expect(response.status).toBe(200);
    expect(body.provider).toBe('local-rules');
    expect(body.signals.map((signal) => signal.code)).toEqual(['CASHFLOW_GAP', 'PAYMENT_BURDEN']);
  });

  it('rejects an empty transcript', async () => {
    const baseUrl = await startServer();
    const response = await fetch(`${baseUrl}/api/analyze`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ transcript: ' ' }),
    });

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: 'transcript_required' });
  });

  it('returns JSON for unknown routes', async () => {
    const baseUrl = await startServer();
    const response = await fetch(`${baseUrl}/missing`);

    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({ error: 'not_found' });
  });
});
