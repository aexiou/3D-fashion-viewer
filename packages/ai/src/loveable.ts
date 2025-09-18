// Placeholder adapter. Loveable will replace with the SDK/endpoints it generates.
import type { AiClient, AiRequest, AiResponse } from './types'

export class LoveableClient implements AiClient {
  async chat(req: AiRequest): Promise<AiResponse> {
    // Echo back as a stub so development doesn't break before Loveable wiring.
    const text = `[loveable-stub] ${req.messages.map(m => m.content).join(' ')}`
    return { text, json: undefined, model: 'loveable-stub' }
  }
}
