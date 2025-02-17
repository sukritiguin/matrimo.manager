import { FastifyInstance } from "fastify";
import { authRoutes } from "./auth/auth.route";

export const v1Routers = (route: FastifyInstance) => {
  route.get("/health", () => {
    return { status: "I am healthy" };
  });

  route.register(authRoutes, { prefix: "/auth" });
};
