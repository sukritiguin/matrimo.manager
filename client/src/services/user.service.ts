import { api } from "@/lib/axios";

export const getMe = async () => {
  try {
    const res = await api.get("/users/me");
    return res.data.data;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
