import { api } from "@/lib/axios";
import { TUserLoginSchema, TUserRegisterSchema } from "@/schemas";

export const userRegister = async (values: TUserRegisterSchema) => {
  try {
    const res = await api.post("/auth/register", values);
    return res.data.data;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const userVerify = async (token: string) => {
  try {
    const res = await api.post(`/auth/email-verify?token=${token}`);
    return res.data.data;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const userLogin = async (values: TUserLoginSchema) => {
  try {
    const res = await api.post("/auth/login", values);
    return res.data.data;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};

export const userRefreshToken = async () => {
  try {
    const res = await api.post(`/auth/refresh-token`);
    return res.data.data;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};

export const userLogout = async () => {
  try {
    const res = await api.post(`/auth/logout`);
    return res.data;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const resendEmailVerification = async (email: string) => {
  try {
    const res = await api.post(`/auth/resend/email-verification/${email}`);
    return res.data;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
