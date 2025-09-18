import { OpenAiClient } from './openai'
import { LoveableClient } from './loveable'
import type { AiClient } from './types'

export const createAi = (): AiClient => {
  switch (process.env.AI_PROVIDER) {
    case 'openai':
      return new OpenAiClient()
    default:
      return new LoveableClient()
  }
}
export * from './types'
