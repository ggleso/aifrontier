import { createServer, type IncomingMessage, type Server, type ServerResponse } from 'node:http';
import { landingPage } from './landing-page.js';
import { createProvider, type CopilotProvider } from './copilot.js';

const serviceName = 'aifrontier';

function sendJson(response: ServerResponse, status: number, body: object) {
  response.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'x-content-type-options': 'nosniff',
  });
  response.end(JSON.stringify(body));
}

function sendHtml(response: ServerResponse, body: string) {
  response.writeHead(200, {
    'content-type': 'text/html; charset=utf-8',
    'cache-control': 'no-store',
    'content-security-policy':
      "default-src 'none'; connect-src 'self'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
    'referrer-policy': 'no-referrer',
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'DENY',
  });
  response.end(body);
}

async function readJson(request: IncomingMessage) {
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of request) {
    const buffer = Buffer.from(chunk as Uint8Array);
    size += buffer.length;
    if (size > 16_384) throw new Error('request_too_large');
    chunks.push(buffer);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8')) as unknown;
}

export function createApp(provider: CopilotProvider = createProvider()): Server {
  return createServer(async (request, response) => {
    if (request.method === 'GET' && request.url === '/') {
      sendHtml(response, landingPage);
      return;
    }

    if (request.method === 'GET' && request.url === '/health') {
      sendJson(response, 200, { status: 'ok', service: serviceName, provider: provider.name });
      return;
    }

    if (request.method === 'POST' && request.url === '/api/analyze') {
      try {
        const body = await readJson(request);
        if (
          typeof body !== 'object' ||
          body === null ||
          !('transcript' in body) ||
          typeof body.transcript !== 'string' ||
          body.transcript.trim().length === 0
        ) {
          sendJson(response, 400, { error: 'transcript_required' });
          return;
        }
        sendJson(response, 200, await provider.analyze(body.transcript));
      } catch (error) {
        const tooLarge = error instanceof Error && error.message === 'request_too_large';
        sendJson(response, tooLarge ? 413 : 500, {
          error: tooLarge ? 'request_too_large' : 'analysis_failed',
        });
      }
      return;
    }

    sendJson(response, 404, { error: 'not_found' });
  });
}
