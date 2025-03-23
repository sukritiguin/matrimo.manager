import fastifyOAuth2 from "@fastify/oauth2";

export const oauth2PluginOptions = {
  name: "googleOAuth2",
  scope: ["email", "profile"],
  credentials: {
    client: {
      id: process.env.GOOGLE_OAUTH_CLIENT_ID!,
      secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
    },
    auth: fastifyOAuth2.GOOGLE_CONFIGURATION,
  },
  startRedirectPath: "/login/google",
  callbackUri: "http://localhost:3000/login/google/callback",
};
