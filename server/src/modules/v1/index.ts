import { FastifyInstance } from "fastify";
import { authRoutes } from "./auth/auth.route";
import { userRoutes } from "./users/user.route";
import { editorRoutes } from "./editor/editor.route";

export const v1Routers = (route: FastifyInstance) => {
  route.get("/health", () => {
    return { status: "I am healthy" };
  });

  route.register(authRoutes, { prefix: "/auth" });
  route.register(userRoutes, { prefix: "/users" });

  route.register(editorRoutes, { prefix: "/editors" });
};
