import ms from "ms";
import jwt from "jsonwebtoken";
import config from "../config/env.config.js";

export const generateAccessToken = (id: number) => {
  const payload = { sub: id.toString() };
  return jwt.sign(payload, config.secret.JWT as jwt.Secret, {
    expiresIn: config.secret.JWT_EXPIRATION as ms.StringValue,
  });
};

export const verifyAccessToken = (token: string) => {
  const payload = jwt.verify(token, config.secret.JWT) as jwt.JwtPayload;
  return payload.sub;
};
