import { client } from "@matrimo/db";

export const getUserByEmail = async (email: string) => {
  return await client.user.findUnique({ where: { email } });
};

export const getUserById = async (id: number) => {
  return await client.user.findUnique({ where: { id } });
};
