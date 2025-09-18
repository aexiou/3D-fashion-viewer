export type AiMessage = { role: 'system'|'user'|'assistant'; content: string }
export type AiRequest = {
  messages: AiMessage[]
  jsonSchema?: Record<string, any>
  temperature?: number
  stream?: boolean
  metadata?: Record<string, any>
}
export type AiResponse = {
  text?: string
  json?: any
  model: string
  usage?: { in: number; out: number }
}
export interface AiClient {
  chat(req: AiRequest): Promise<AiResponse>
}
