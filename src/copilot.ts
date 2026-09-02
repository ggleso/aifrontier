export type SignalState = 'POSSIBLE' | 'SUPPORTED';

export interface Signal {
  code: string;
  label: string;
  state: SignalState;
  confidence: number;
  evidence: string;
}

export interface CopilotAnalysis {
  provider: string;
  signals: Signal[];
  clarification: string;
  opportunities: { code: string; label: string; reason: string }[];
  handoff: { intent: string; facts: string; verify: string; nextStep: string };
}

export interface CopilotProvider {
  readonly name: string;
  analyze(transcript: string): Promise<CopilotAnalysis>;
}

const cashflowTerms = ['생활비', '급여', '빠듯', '잔액', '며칠이 비', '병원비'];
const paymentTerms = ['자동이체', '카드대금', '통신비', '납부', '연체'];

function includesAny(text: string, terms: string[]) {
  return terms.some((term) => text.includes(term));
}

export class LocalRulesProvider implements CopilotProvider {
  readonly name = 'local-rules';

  analyze(transcript: string): Promise<CopilotAnalysis> {
    const clean = transcript.trim().slice(0, 8_000);
    const cashflow = includesAny(clean, cashflowTerms);
    const payment = includesAny(clean, paymentTerms);
    const signals: Signal[] = [];

    if (cashflow) {
      signals.push({
        code: 'CASHFLOW_GAP',
        label: '단기 현금흐름 공백',
        state: clean.includes('급여') ? 'SUPPORTED' : 'POSSIBLE',
        confidence: clean.includes('급여') ? 0.86 : 0.55,
        evidence: '생활비 또는 급여일 전 자금 공백에 관한 고객 발화',
      });
    }
    if (payment) {
      signals.push({
        code: 'PAYMENT_BURDEN',
        label: '반복 납부 부담',
        state: clean.includes('지난달') ? 'SUPPORTED' : 'POSSIBLE',
        confidence: clean.includes('지난달') ? 0.78 : 0.58,
        evidence: '자동이체·카드대금·통신비 또는 납부에 관한 고객 발화',
      });
    }

    return Promise.resolve({
      provider: this.name,
      signals,
      clarification: payment
        ? '예정된 납부일과 급여일을 각각 확인해도 될까요?'
        : '가장 부담되는 일정이나 지출이 무엇인지 확인해도 될까요?',
      opportunities: payment
        ? [
            {
              code: 'BURDEN_RELIEF',
              label: '납부 부담 완화 검토',
              reason: '납부 일정과 자금 유입일 사이의 공백을 확인합니다.',
            },
          ]
        : [],
      handoff: {
        intent: payment ? '납부 누락 예방' : '상담 내용 추가 확인',
        facts: signals.length > 0 ? `${String(signals.length)}개 신호 감지` : '확인된 신호 없음',
        verify: payment ? '납부일·급여일' : '고객이 원하는 지원 방향',
        nextStep: '직원 확인 후 가능한 지원 절차 검토',
      },
    });
  }
}

export interface ExternalProviderOptions {
  endpoint: string;
  model: string;
  apiKey: string;
}

export class OpenAiCompatibleProvider implements CopilotProvider {
  readonly name = 'external-openai-compatible';

  constructor(private readonly options: ExternalProviderOptions) {}

  async analyze(transcript: string): Promise<CopilotAnalysis> {
    const response = await fetch(this.options.endpoint, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${this.options.apiKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: this.options.model,
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content:
              'Return JSON matching CopilotAnalysis. Use only transcript evidence. Never recommend a product, approve credit, or infer protected traits.',
          },
          { role: 'user', content: transcript.slice(0, 8_000) },
        ],
      }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok)
      throw new Error(`External provider failed with status ${String(response.status)}`);
    const body = (await response.json()) as { choices?: { message?: { content?: string } }[] };
    const content = body.choices?.[0]?.message?.content;
    if (!content) throw new Error('External provider returned no content');
    return { ...(JSON.parse(content) as CopilotAnalysis), provider: this.name };
  }
}

export function createProvider(environment: NodeJS.ProcessEnv = process.env): CopilotProvider {
  if (environment.NH_FIT_LLM_PROVIDER !== 'external') return new LocalRulesProvider();
  const endpoint = environment.NH_FIT_LLM_ENDPOINT;
  const model = environment.NH_FIT_LLM_MODEL;
  const apiKey = environment.NH_FIT_LLM_API_KEY;
  if (!endpoint || !model || !apiKey) {
    throw new Error(
      'External provider requires endpoint, model, and API key environment configuration',
    );
  }
  const url = new URL(endpoint);
  if (url.protocol !== 'https:') throw new Error('External provider endpoint must use HTTPS');
  return new OpenAiCompatibleProvider({ endpoint: url.toString(), model, apiKey });
}
