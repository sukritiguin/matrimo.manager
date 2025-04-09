import { Request, Response } from "express";
import { ApiError, apiHandler, ApiResponse, zodValidation } from "@matrimo/lib";

import { client } from "@matrimo/db";
import { signInSchema, signUpSchema } from "@matrimo/schemas";

import axios from "axios";
import * as argon2 from "argon2";

import config from "../config/env.config.js";

import { MAX_SESSIONS_LIMIT } from "../constants/index.js";

import { addDate } from "../utils/addDate.js";
import { generateAccessToken } from "../utils/accessToken.js";
import { generateRefreshToken } from "../utils/refreshToken.js";
import { getGoogleOAuthURL, getTokens } from "../utils/google.utils.js";

import {
  deleteSessionById,
  getOldestSessionByUserId,
  noOfActiveSessionOfUser,
} from "../data/sessions.data.js";
import { getUserByEmail } from "../data/users.data.js";

export const register = apiHandler(async (req: Request, res: Response) => {
  const { email, password } = zodValidation(signUpSchema, req.body);
  if (await getUserByEmail(email)) {
    throw new ApiError(400, "Email is already used");
  }
  const user = await client.user.create({
    data: {
      email,
    },
  });

  const hashed = await argon2.hash(password);
  await client.userPassword.create({
    data: {
      hash: hashed,
      userId: user.id,
    },
  });

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken();
  const refreshTokenExpires = addDate(config.secret.JWT_REFRESH_EXPIRATION);

  await client.session.create({
    data: {
      sessionToken: refreshToken,
      expires: refreshTokenExpires,
      userId: user.id,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    },
  });

  return res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: config.IS_PRODUCTION_ENV,
      sameSite: "strict",
      expires: refreshTokenExpires,
    })
    .status(201)
    .json(ApiResponse.success("Sign up successful", { accessToken }));
});

export const login = apiHandler(async (req: Request, res: Response) => {
  const data = zodValidation(signInSchema, req.body);
  const user = await client.user.findUnique({
    where: { email: data.email },
    include: {
      password: true,
    },
  });

  if (!user) throw new ApiError(400, "Email not found");
  if (!user.password) throw new ApiError(400, "Somthing went wrong");

  const isMatched = await argon2.verify(user.password.hash, data.password);
  if (!isMatched) throw new ApiError(400, "Invalid password");

  const noOfSession = await noOfActiveSessionOfUser(user.id);
  const isOverSessionsLimit = noOfSession >= MAX_SESSIONS_LIMIT;
  if (isOverSessionsLimit) {
    const oldestSession = await getOldestSessionByUserId(user.id);

    if (oldestSession) {
      await deleteSessionById(oldestSession.id);
    }
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken();
  const refreshTokenExpires = addDate(config.secret.JWT_REFRESH_EXPIRATION);

  await client.session.create({
    data: {
      sessionToken: refreshToken,
      expires: refreshTokenExpires,
      userId: user.id,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    },
  });

  return res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: config.IS_PRODUCTION_ENV,
      sameSite: "strict",
      expires: refreshTokenExpires,
    })
    .status(200)
    .json(new ApiResponse(true, "Sign in successful", { accessToken }));
});

export const logout = apiHandler(async (req: Request, res: Response) => {
  const currentUser = req.currentUser;
  if (!currentUser) throw new ApiError(401, "Unauthorized user");

  const currentSession = await client.session.findUnique({
    where: {
      sessionToken: req.cookies["refreshToken"],
      userId: currentUser.id,
    },
  });

  if (!currentSession) throw new ApiError(401, "Unauthorized user");

  await client.session.update({
    where: {
      id: currentSession.id,
    },
    data: {
      revoked: true,
    },
  });

  res
    .clearCookie("refreshToken")
    .status(204)
    .json(new ApiResponse(true, "Logout successful"));
});

export const refreshToken = apiHandler(async (req: Request, res: Response) => {
  const token = await req.cookies["refreshToken"];
  if (!token) throw new ApiError(401, "Refresh token not found");
  const currentSession = await client.session.findUnique({
    where: {
      sessionToken: token,
    },
  });
  if (!currentSession) throw new ApiError(401, "Refresh token not valid");
  if (currentSession.revoked || currentSession.expires < new Date(Date.now())) {
    throw new ApiError(400, "Refresh token has expried!");
  }
  await client.session.update({
    where: { id: currentSession.id },
    data: { revoked: true },
  });

  const accessToken = generateAccessToken(currentSession.userId);
  const refreshToken = generateRefreshToken();
  const refreshTokenExpires = addDate(config.secret.JWT_REFRESH_EXPIRATION);

  await client.session.create({
    data: {
      sessionToken: refreshToken,
      expires: refreshTokenExpires,
      userId: currentSession.userId,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    },
  });

  res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: config.IS_PRODUCTION_ENV,
      sameSite: "strict",
      expires: refreshTokenExpires,
    })
    .status(200)
    .json(new ApiResponse(true, "Token refresh successful", { accessToken }));
});

export const googleLogin = apiHandler((req: Request, res: Response) => {
  res.redirect(getGoogleOAuthURL());
});

export const googleCallback = apiHandler(
  async (req: Request, res: Response) => {
    const code = req.query.code as string;
    const { id_token, access_token, refresh_token } = await getTokens(code);
    const userInfoUrl = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`;

    const userInfo = await axios.get(userInfoUrl, {
      headers: {
        Authorization: `Bearer ${id_token}`,
      },
    });
    const { email, name, id: googleId } = userInfo.data;

    let account = await client.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider: "google",
          providerAccountId: googleId,
        },
      },
      include: { user: true },
    });

    let user;
    if (!account) {
      user = await client.user.create({
        data: {
          email,
          name,
          account: {
            create: {
              provider: "google",
              providerAccountId: googleId,
              providerEmail: email,
              access_token,
              refresh_token,
              type: "oauth",
            },
          },
        },
      });
    } else {
      user = account.user;
    }

    if (!user) throw new ApiError(400, "Login failed");

    const noOfActiveSession = await noOfActiveSessionOfUser(user.id);
    const isOverSessionsLimit = noOfActiveSession >= MAX_SESSIONS_LIMIT;
    if (isOverSessionsLimit) {
      const oldestSession = await getOldestSessionByUserId(user.id);

      if (oldestSession) {
        await deleteSessionById(oldestSession.id);
      }
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken();
    const refreshTokenExpires = addDate(config.secret.JWT_REFRESH_EXPIRATION);

    await client.session.create({
      data: {
        sessionToken: refreshToken,
        expires: refreshTokenExpires,
        userId: user.id,
        ip: req.ip,
        userAgent: req.headers["user-agent"],
      },
    });

    return res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: config.IS_PRODUCTION_ENV,
        sameSite: "strict",
        expires: refreshTokenExpires,
      })
      .status(200)
      .json(new ApiResponse(true, "Sign in successful", { accessToken }));
  }
);
