import { createServer, type Server, type ServerResponse } from 'node:http';

const serviceName = 'aifrontier';

function sendJson(response: ServerResponse, status: number, body: object) {
  response.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'x-content-type-options': 'nosniff',
  });
  response.end(JSON.stringify(body));
}

export function createApp(): Server {
  return createServer((request, response) => {
    if (request.method === 'GET' && request.url === '/health') {
      sendJson(response, 200, { status: 'ok', service: serviceName });
      return;
    }

    sendJson(response, 404, { error: 'not_found' });
  });
}
