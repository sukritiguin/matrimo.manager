import uuid from "uuid4";

export const generateRefreshToken = () => {
  return uuid();
};
