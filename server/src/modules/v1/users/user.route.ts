import { FastifyInstance } from "fastify/types/instance";
import * as userService from "./user.service";
import fastify from "../../../server";

export const userRoutes = (route: FastifyInstance) => {
  route.get("/me", { preHandler: [fastify.authenticate] }, userService.getMe);
};
