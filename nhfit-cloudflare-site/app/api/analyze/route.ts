import { LocalRulesProvider } from '../../../../src/copilot';

const provider = new LocalRulesProvider();

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { transcript?: unknown };
    if (typeof body.transcript !== 'string' || body.transcript.trim().length === 0) {
      return Response.json({ error: 'transcript_required' }, { status: 400 });
    }
    return Response.json(await provider.analyze(body.transcript));
  } catch {
    return Response.json({ error: 'analysis_failed' }, { status: 500 });
  }
}
