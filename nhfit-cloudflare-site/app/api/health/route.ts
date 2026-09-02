export function GET() {
  return Response.json({ status: 'ok', service: 'nh-fit-copilot', provider: 'local-rules' });
}
