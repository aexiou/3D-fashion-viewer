import { z } from 'zod'

export const SummarySchema = z.object({
  title: z.string(),
  bullets: z.array(z.string()).min(3).max(7)
})
export type Summary = z.infer<typeof SummarySchema>
