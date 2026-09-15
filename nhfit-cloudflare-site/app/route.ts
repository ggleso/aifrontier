import { landingPage } from '../../src/landing-page';

export const dynamic = 'force-dynamic';

export function GET() {
  const page = landingPage.replace(
    '<span class="status">● Cloud Runtime 정상</span>',
    '<span class="status">● Cloud Runtime 정상</span><a class="ghost" href="/catalog" style="text-decoration:none">상품 목록 18개</a>',
  );
  return new Response(page, {
    headers: {
      'cache-control': 'no-store',
      'content-type': 'text/html; charset=utf-8',
      'content-security-policy':
        "default-src 'none'; connect-src 'self'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
      'referrer-policy': 'no-referrer',
      'x-content-type-options': 'nosniff',
      'x-frame-options': 'DENY',
    },
  });
}
