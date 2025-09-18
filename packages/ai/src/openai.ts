import OpenAI from 'openai'
import type { AiClient, AiRequest, AiResponse } from './types'

export class OpenAiClient implements AiClient {
  private client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })
  private model = process.env.OPENAI_MODEL ?? 'gpt-4.1-mini'

  async chat(req: AiRequest): Promise<AiResponse> {
    const r = await this.client.chat.completions.create({
      model: this.model,
      messages: req.messages,
      response_format: req.jsonSchema ? { type: 'json_schema', json_schema: req.jsonSchema } : undefined,
      temperature: req.temperature
    })
    const choice = r.choices[0]
    const text = choice.message?.content ?? ''
    return {
      text,
      json: tryParse(text),
      model: this.model,
      usage: r.usage ? { in: r.usage.prompt_tokens, out: r.usage.completion_tokens } : undefined
    }
  }
}
const tryParse = (s?: string) => { try { return s ? JSON.parse(s) : undefined } catch { return undefined } }
