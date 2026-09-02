import { describe, expect, it } from 'vitest';
import {
  LocalRulesProvider,
  OpenAiCompatibleProvider,
  createProvider,
  parseCopilotAnalysis,
} from '../src/copilot.js';

describe('NH FIT providers', () => {
  it('uses the fully offline provider by default', () => {
    expect(createProvider({})).toBeInstanceOf(LocalRulesProvider);
  });

  it('requires complete secure configuration for an external provider', () => {
    expect(() => createProvider({ NH_FIT_LLM_PROVIDER: 'external' })).toThrow(/requires endpoint/);
    expect(() =>
      createProvider({
        NH_FIT_LLM_PROVIDER: 'external',
        NH_FIT_LLM_ENDPOINT: 'http://example.test/v1/chat/completions',
        NH_FIT_LLM_MODEL: 'demo',
        NH_FIT_LLM_API_KEY: 'masked-test-value',
      }),
    ).toThrow(/HTTPS/);
  });

  it('creates the replaceable external adapter only when explicitly configured', () => {
    expect(
      createProvider({
        NH_FIT_LLM_PROVIDER: 'external',
        NH_FIT_LLM_ENDPOINT: 'https://example.test/v1/chat/completions',
        NH_FIT_LLM_MODEL: 'demo',
        NH_FIT_LLM_API_KEY: 'masked-test-value',
      }),
    ).toBeInstanceOf(OpenAiCompatibleProvider);
  });

  it('does not infer signals without transcript evidence', async () => {
    const result = await new LocalRulesProvider().analyze('오늘 상담을 시작하고 싶어요.');
    expect(result.signals).toEqual([]);
    expect(result.opportunities).toEqual([]);
  });

  it('rejects malformed external provider output', () => {
    expect(() =>
      parseCopilotAnalysis(
        {
          signals: [{ code: 'BAD', label: '잘못된 신호', state: 'SUPPORTED', confidence: 3 }],
          opportunities: [],
          clarification: '확인할까요?',
          handoff: { intent: '확인', facts: '없음', verify: '없음', nextStep: '검토' },
        },
        'external',
      ),
    ).toThrow(/invalid signal/);
  });

  it('accepts a complete external provider analysis', () => {
    const result = parseCopilotAnalysis(
      {
        signals: [
          {
            code: 'CASHFLOW_GAP',
            label: '현금흐름 공백',
            state: 'POSSIBLE',
            confidence: 0.6,
            evidence: '합성 발화 근거',
          },
        ],
        opportunities: [{ code: 'SUPPORT', label: '지원 검토', reason: '추가 확인 필요' }],
        clarification: '일정을 확인할까요?',
        handoff: {
          intent: '일정 확인',
          facts: '합성 정보',
          verify: '납부일',
          nextStep: '직원 검토',
        },
      },
      'external',
    );

    expect(result.provider).toBe('external');
    expect(result.signals[0]?.confidence).toBe(0.6);
  });
});
