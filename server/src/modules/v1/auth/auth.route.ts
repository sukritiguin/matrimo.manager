import { FastifyInstance } from "fastify/types/instance";
import * as authService from "./auth.service";
import fastify from "../../../server";

export const authRoutes = (route: FastifyInstance) => {
  route.post("/register", {}, authService.register);
  route.post("/login", {}, authService.login);
  route.post("/email-verify", {}, authService.emailVerify);
  route.post("/refresh-token", {}, authService.refreshToken);
  route.post(
    "/resend/email-verification/:email",
    {},
    authService.resendVerificationToken
  );
  route.post(
    "/logout",
    { preHandler: [fastify.authenticate] },
    authService.logout
  );

  route.post("/login/google", {}, authService.googleLogin);
};
