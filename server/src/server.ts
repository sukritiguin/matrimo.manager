import dotenv from "dotenv";

dotenv.config();
import Fastify from "fastify";
// import fastifySensible from "fastify-sensible";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import fastifyJWT from "@fastify/jwt";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";

import fastifyCookie from "@fastify/cookie";
import fastifyOAuth2 from "@fastify/oauth2";
import prismaPlugin from "./plugins/prisma";
import userRoutes from "./routes/user.router";
import authRoutes from "./routes/auth.router";
import testRoutes from "./routes/test.router";
import profileRoutes from "./routes/profile.router";

import { jwtMiddleware } from "./middlewares/jwt.middleware";
import { oauth2PluginOptions } from "./plugins/oauth";

import { env } from "./config/env";

env.check();

export const fastify = Fastify({
  //   logger: true,
});

fastify.register(cors, {
  origin: env.get("CLIENT_URL"),
  credentials: true,
});

fastify.register(multipart);
// Register plugins
fastify.register(prismaPlugin);
// fastify.register(fastifySensible);
fastify.register(swagger, {
  swagger: {
    info: {
      title: "Matrimo Manager API",
      description: "This is API documentation for Matrimo Manager",
      version: "1.0.0",
    },
    host: "localhost:3000",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
});

// Register Swagger UI with the correct routePrefix
fastify.register(swaggerUI, {
  routePrefix: "/docs", // URL path for Swagger UI
  uiConfig: {
    // Optional configurations for Swagger UI
    docExpansion: "none",
    deepLinking: false,
  },
});

// JWT setup
fastify.register(fastifyJWT, { secret: env.get("JWT_SECRET") });
fastify.register(fastifyCookie, { secret: env.get("JWT_SECRET") });

// Register OAuth2 Plugin
fastify.register(fastifyOAuth2 as any, oauth2PluginOptions);
fastify.decorate("authenticate", jwtMiddleware);

// Routes
import { v1Routers } from "./modules/v1";
fastify.register(v1Routers, { prefix: "/api/v1/" });

fastify.register(userRoutes, { prefix: "/api/users" });
fastify.register(authRoutes);
fastify.register(testRoutes, { prefix: "/api/test" });
fastify.register(profileRoutes, { prefix: "/api/profile" });

export default fastify;
