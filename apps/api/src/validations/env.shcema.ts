import * as z from "zod";

export const envSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.string(),
  APP_NAME: z.string(),
  BASE_URL: z.string(),
  APP_URL: z.string(),

  JWT_SECRET: z.string(),
  JWT_EXPIRATION: z.string().default("1h"),
  JWT_REFRESH_SECRET: z.string(),
  JWT_REFRESH_EXPIRATION: z.string().default("30d"),

  CORS_ORIGIN: z.string().optional(),

  MINIO_ENDPOINT: z.string(),
  MINIO_ACCESS_KEY: z.string(),
  MINIO_SECRET_KEY: z.string(),
  MINIO_BUCKET: z.string(),

  GOOGLE_OAUTH_CLIENT_ID: z.string(),
  GOOGLE_OAUTH_CLIENT_SECRET: z.string(),
  GOOGLE_OAUTH_REDIRECT_URL: z.string(),
});
