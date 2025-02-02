import Fastify from "fastify";
import fastifySensible from "fastify-sensible";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import prismaPlugin from "./plugins/prisma";
import userRoutes from "./routes/users";

const fastify = Fastify({
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

fastify.register(userRoutes, { prefix: "/api" });

fastify.get("/", async (request, reply) => {
  return {
    message: "Hello, Fastify with TypeScript! Write code with Sukriti.",
  };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log("Server is running on http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
