import { createServer, type Server, type ServerResponse } from 'node:http';
import { landingPage } from './landing-page.js';

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
      "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
    'referrer-policy': 'no-referrer',
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'DENY',
  });
  response.end(body);
}

export function createApp(): Server {
  return createServer((request, response) => {
    if (request.method === 'GET' && request.url === '/') {
      sendHtml(response, landingPage);
      return;
    }

    if (request.method === 'GET' && request.url === '/health') {
      sendJson(response, 200, { status: 'ok', service: serviceName });
      return;
    }

    sendJson(response, 404, { error: 'not_found' });
  });
}
