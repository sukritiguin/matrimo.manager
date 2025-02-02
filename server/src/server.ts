import Fastify from 'fastify';
import prismaPlugin from './plugins/prisma';
import userRoutes from './routes/users';

const fastify = Fastify({
  logger: true,
});

fastify.register(prismaPlugin);
fastify.register(userRoutes, { prefix: '/api' });

fastify.get('/', async (request, reply) => {
  return { message: 'Hello, Fastify with TypeScript! Write code with Sukriti.' };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('Server is running on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();