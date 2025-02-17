import fastify from "./server";

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log("Server is running on http://localhost:3000/api/v1/health");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
