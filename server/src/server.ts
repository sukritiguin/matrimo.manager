import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifySensible from "fastify-sensible";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import fastifyJWT from "@fastify/jwt";
import cors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import fastifyOAuth2 from "@fastify/oauth2";
import prismaPlugin from "./plugins/prisma";
import userRoutes from "./routes/user.router";
import authRoutes from "./routes/auth.router";
import testRoutes from "./routes/test.router";
import profileRoutes from "./routes/profile.router";

import { ApiError } from "./libs/response";
import { env } from "./config/env";

env.check();

declare module "fastify" {
  interface FastifyInstance {
    googleOAuth2: any;
    authenticate: (req: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

export const fastify = Fastify({
  //   logger: true,
});

fastify.register(cors, {
  origin: env.get("CLIENT_URL"),
  credentials: true,
});

// Register plugins
fastify.register(prismaPlugin);
fastify.register(fastifySensible);
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
fastify.register(fastifyOAuth2 as any, {
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
});

fastify.decorate(
  "authenticate",
  async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const access_token = req.cookies?.access_token;
      if (!access_token) {
        throw new ApiError(401, "Access token not provided");
      }
      const decodedToken: any = fastify.jwt.verify(access_token);
      if (!decodedToken) {
        throw new ApiError(401, "Invalid access token");
      }
      const user = await fastify.prisma.user.findUnique({
        where: { id: decodedToken.id },
        select: {
          id: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          verified: true,
        },
      });

      if (!user) {
        throw new ApiError(401, "User not found");
      }
      req.user = user;
    } catch (err: any) {
      if (err instanceof ApiError) {
        reply.status(err.statusCode).send(err);
        return;
      }
      reply
        .status(401)
        .send(new ApiError(err.statusCode || 401, "Access denied"));
    }
  }
);

// Routes
import { v1Routers } from "./modules/v1";
fastify.register(v1Routers, { prefix: "/api/v1/" });

fastify.register(userRoutes, { prefix: "/api/users" });
fastify.register(authRoutes);
fastify.register(testRoutes, { prefix: "/api/test" });
fastify.register(profileRoutes, { prefix: "/api/profile" });

export default fastify;
