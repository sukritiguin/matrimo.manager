import { client } from "@matrimo/db";

export const noOfActiveSessionOfUser = async (userId: number) => {
  return await client.session.count({
    where: {
      userId: userId,
      revoked: false,
    },
  });
};

export const getOldestSessionByUserId = async (userId: number) => {
  return await client.session.findFirst({
    where: { userId: userId, revoked: false },
    orderBy: { createdAt: "asc" },
  });
};

export const deleteSessionById = async (id: string) => {
  return await client.session.delete({
    where: { id },
  });
};
