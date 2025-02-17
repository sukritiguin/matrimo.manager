import jwt from "jsonwebtoken";
import { env } from "../../../config/env";
import fastify from "../../../server";

type UserPlayload = {
  id: number;
  email: string;
};

const generateRefreshToken = (playload: UserPlayload) => {
  const token = jwt.sign(playload, env.get("REFRESH_TOKEN_SECRET"), {
    expiresIn: "7d",
  });

  return token;
};

const decodeRefreshToken = (token: string): UserPlayload | null => {
  try {
    const decode = jwt.verify(token, env.get("REFRESH_TOKEN_SECRET"));
    return decode as UserPlayload;
  } catch (error) {
    return null;
  }
};

const generateAccessToken = (payload: UserPlayload) => {
  const token = fastify.jwt.sign(payload, {
    sub: payload.id.toString(),
    expiresIn: "15m",
  });
  return token;
};

const decodeAccessToken = (token: string) => {
  try {
    const decoded = fastify.jwt.verify(token);
    return decoded as UserPlayload;
  } catch (error) {
    return null;
  }
};

export const RefreshToken = {
  generate: generateRefreshToken,
  decode: decodeRefreshToken,
};

export const AccessToken = {
  generate: generateAccessToken,
  decode: decodeAccessToken,
};
