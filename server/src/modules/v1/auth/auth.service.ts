import * as argon from "argon2";
import { FastifyRequest, FastifyReply } from "fastify";
import { CookieSerializeOptions } from "@fastify/cookie";

import { AccessToken, RefreshToken } from "./jwt";
import { UserLoginSchema, UserRegisterSchema } from "./auth.schema";

import fastify from "../../../server";
import { env } from "../../../config/env";
import { apiHandler } from "../../../libs/api-handler";
import { ApiError, ApiResponseMessage } from "../../../libs/response";
import { sendVerificationEmail } from "../../../services/email.services";

const cookieOptions: CookieSerializeOptions = {
  httpOnly: true,
  secure: env.get("NODE_ENV") === "production",
  sameSite: "strict",
  path: "/",
};

export const register = apiHandler(
  async (req: FastifyRequest, reply: FastifyReply) => {
    const validateData = UserRegisterSchema.safeParse(req.body);
    if (!validateData.success) {
      throw new ApiError(
        400,
        "Validation failed",
        validateData.error.errors.map((e) => e.message)
      );
    }

    const hashedPassword = await argon.hash(validateData.data.password);
    try {
      const user = await fastify.prisma.user.create({
        data: {
          email: validateData.data.email,
          password: hashedPassword,
        },
      });

      await sendVerificationEmail(user.email);

      const playload = {
        id: user.id,
        email: user.email,
      };
      const refreshToken = RefreshToken.generate(playload);
      return reply
        .cookie("refresh_token", refreshToken, {
          ...cookieOptions,
          expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000),
        })
        .code(201)
        .send(new ApiResponseMessage(200, "Logged in successfully"));
    } catch (error: any) {
      if (error.code === "P2002") {
        return reply
          .status(403)
          .send(new ApiError(403, "Email already exists"));
      }
      throw error;
    }
  }
);

export const login = apiHandler(
  async (req: FastifyRequest, reply: FastifyReply) => {
    const validateData = UserLoginSchema.safeParse(req.body);
    if (!validateData.success) {
      return reply.status(400).send({
        statusCode: 400,
        message: "Validation failed",
        errors: validateData.error.errors,
      });
    }

    const user = await fastify.prisma.user.findUnique({
      where: { email: validateData.data.email },
    });
    if (!user) {
      throw new ApiError(401, "User not found");
    }

    const isValidPassword = await argon.verify(
      user.password!,
      validateData.data.password
    );
    if (!isValidPassword) {
      throw new ApiError(401, "Invalid credentials");
    }

    if (!user.verified) {
      throw new ApiError(403, "User is not verified");
    }

    const playload = {
      id: user.id,
      email: user.email,
    };
    const refreshToken = RefreshToken.generate(playload);
    const accessToken = AccessToken.generate(playload);
    return reply
      .cookie("access_token", accessToken, {
        ...cookieOptions,
      })
      .cookie("refresh_token", refreshToken, {
        ...cookieOptions,
        expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000),
      })
      .code(200)
      .send(new ApiResponseMessage(200, "Logged in successfully"));
  }
);

export const logout = apiHandler(
  async (req: FastifyRequest, reply: FastifyReply) => {
    reply
      .clearCookie("access_token", { path: "/" })
      .clearCookie("refresh_token", { path: "/" });
    return reply
      .status(200)
      .send(new ApiResponseMessage(200, "Logged out successfully"));
  }
);

export const refreshToken = apiHandler(
  async (req: FastifyRequest, reply: FastifyReply) => {
    const token = req.cookies.refresh_token;
    if (!token) {
      throw new ApiError(401, "Unauthorized: No refresh token provided");
    }
    const decodedToken = RefreshToken.decode(token);
    if (!decodedToken) {
      throw new ApiError(401, "Unauthorized: Invalid refresh token");
    }

    const user = await fastify.prisma.user.findUnique({
      where: { id: decodedToken.id },
    });
    if (!user) {
      throw new ApiError(401, "Unauthorized: User not found");
    }

    if (!user.verified) {
      throw new ApiError(403, "User is not verified");
    }

    const playload = {
      id: user.id,
      email: user.email,
    };
    const refreshToken = RefreshToken.generate(playload);
    const accessToken = AccessToken.generate(playload);
    return reply
      .cookie("access_token", accessToken, { ...cookieOptions })
      .cookie("refresh_token", refreshToken, {
        ...cookieOptions,
        expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000),
      })
      .code(200)
      .send(new ApiResponseMessage(200, "Refresh Token successfully"));
  }
);

export const emailVerify = apiHandler(
  async (
    req: FastifyRequest<{ Querystring: { token: string } }>,
    reply: FastifyReply
  ) => {
    const token: string = req.query.token;
    if (!token) {
      throw new ApiError(400, "Invalid verification token");
    }

    const decodedToken: any = fastify.jwt.verify(token);
    if (!decodedToken) {
      throw new ApiError(403, "Invalid or expired verification token");
    }

    const user = await fastify.prisma.user.update({
      where: { email: decodedToken.email },
      data: { verified: true },
    });

    const playload = {
      id: user.id,
      email: user.email,
    };
    const refreshToken = RefreshToken.generate(playload);
    const accessToken = AccessToken.generate(playload);
    return reply
      .cookie("access_token", accessToken, { ...cookieOptions })
      .cookie("refresh_token", refreshToken, {
        ...cookieOptions,
        expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000),
      })
      .code(200)
      .send(new ApiResponseMessage(200, "Email verified successfully"));
  }
);

export const resendVerificationToken = apiHandler(
  async (
    req: FastifyRequest<{ Params: { email: string } }>,
    reply: FastifyReply
  ) => {
    const { email } = req.params;
    if (!email) {
      throw new ApiError(400, "Email is requied");
    }
    const user = await fastify.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (user.verified) {
      throw new ApiError(400, "User is already verified");
    }

    await sendVerificationEmail(user.email);
    return reply
      .status(200)
      .send(
        new ApiResponseMessage(200, "Verification token sent successfully")
      );
  }
);
