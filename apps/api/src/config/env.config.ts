import { envSchema } from "../validations/env.shcema.js";
import { logger } from "../utils/logger.js";

import dotenv from "dotenv";

dotenv.config();

const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
  logger.error(
    "Enviroments variable check failed :: ",
    parsedEnv.error.format()
  );
  process.exit(1);
}

const env = parsedEnv.data;

const config = {
  NODE_ENV: env.NODE_ENV,
  IS_PRODUCTION_ENV: env.NODE_ENV === "production",
  secret: {
    JWT: env.JWT_SECRET,
    JWT_EXPIRATION: env.JWT_EXPIRATION,
    JWT_REFRESH_SECRET: env.JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRATION: env.JWT_REFRESH_EXPIRATION || "30d",
  },
  app: {
    CORS_ORIGIN: env.CORS_ORIGIN ? env.CORS_ORIGIN.split(",") : "*",
    PORT: env.PORT,
    NAME: env.APP_NAME,
    BASE_URL: env.BASE_URL,
    APP_URL: env.APP_URL,
  },
  minio: {
    MINIO_ENDPOINT: env.MINIO_ENDPOINT,
    MINIO_ACCESS_KEY: env.MINIO_ACCESS_KEY,
    MINIO_SECRET_KEY: env.MINIO_SECRET_KEY,
    MINIO_BUCKET: env.MINIO_BUCKET,
  },
  oauth: {
    GOOGLE_OAUTH_CLIENT_ID: env.GOOGLE_OAUTH_CLIENT_ID,
    GOOGLE_OAUTH_CLIENT_SECRET: env.GOOGLE_OAUTH_CLIENT_SECRET,
    GOOGLE_OAUTH_REDIRECT_URL: env.GOOGLE_OAUTH_REDIRECT_URL,
  },
};

if (!config.IS_PRODUCTION_ENV) {
  logger.debug("✅ Loaded config:", config);
}

export default config;
