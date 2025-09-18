export const env = {
  NEXTAUTH_URL: process.env.NEXTAUTH_URL!,
  DATABASE_URL: process.env.DATABASE_URL!,
  S3_ENDPOINT: process.env.S3_ENDPOINT!,
  S3_BUCKET: process.env.S3_BUCKET!,
  S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID!,
  S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY!,
  AI_PROVIDER: process.env.AI_PROVIDER ?? "loveable",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  OPENAI_MODEL: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
}
