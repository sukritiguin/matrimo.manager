import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifySensible from "fastify-sensible";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import fastifyJWT from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import fastifyOAuth2 from "@fastify/oauth2";
import prismaPlugin from "./plugins/prisma";
import userRoutes from "./routes/user.router";
import authRoutes from "./routes/auth.router";
import testRoutes from "./routes/test.router";

declare module "fastify" {
  interface FastifyInstance {
    googleOAuth2: any;
    authenticate: (req: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

export const fastify = Fastify({
  logger: true,
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
fastify.register(fastifyJWT, {
  secret: "your-secret-key", // Use a strong secret key
  cookie: {
    cookieName: "token",
    signed: false,
  },
});

// Cookie setup
fastify.register(fastifyCookie, {
  secret: "your-cookie-secret", // Use a strong secret key
});

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
      await req.jwtVerify(); // Verify JWT
    } catch (err) {
      reply.status(401).send({ message: "Unauthorized" });
    }
  }
);

fastify.register(userRoutes, { prefix: "/api/users" });
fastify.register(authRoutes);
fastify.register(testRoutes, { prefix: "/api/test" });

fastify.get("/", async (request, reply) => {
  return {
    message: "Hello, Fastify with TypeScript! Write code with Sukriti.",
  };
});

// Protected route example
fastify.get(
  "/protected",
  { onRequest: [fastify.authenticate] },
  async (req, reply) => {
    reply.send({ message: "You are authenticated." });
  }
);

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log("Server is running on http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

export default fastify;

start();
