// import dotenv from "dotenv";

// dotenv.config({ path: "./.env" });

export const REQUIRED_ENV_VARIABLES = [
  "PORT",
  "DATABASE_URL",
  "NODE_ENV",
  "JWT_SECRET",
  "REFRESH_TOKEN_SECRET",
  "CLIENT_URL",
  "SERVER_URL",
  "GOOGLE_EMAIL_APP_NAME",
  "GOOGLE_EMAIL_APP_PASSWORD",
  "GOOGLE_EMAIL_APP_SENDER_EMAIL",
  "GOOGLE_OAUTH_CLIENT_ID",
  "GOOGLE_OAUTH_CLIENT_SECRET",
] as const;

export type EnvVarKey = (typeof REQUIRED_ENV_VARIABLES)[number];

const checkRequired = () => {
  for (const variable of REQUIRED_ENV_VARIABLES) {
    if (!process.env[variable]) {
      throw new Error(`Missing required environment variable: ${variable}`);
    }
  }

  console.log("🔥 All required environment variables are set.");
};

const getEnv = <T extends EnvVarKey>(key: T): string => {
  return process.env[key]!;
};

export const env = {
  get: (key: EnvVarKey) => getEnv(key),
  check: checkRequired,
};
