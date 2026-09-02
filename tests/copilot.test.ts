import { describe, expect, it } from 'vitest';
import { LocalRulesProvider, OpenAiCompatibleProvider, createProvider } from '../src/copilot.js';

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
});
