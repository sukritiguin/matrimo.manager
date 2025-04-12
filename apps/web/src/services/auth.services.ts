import axios from "axios";
import { TApiResponse } from "@/types";
import { SignInSchema, SignUpSchema } from "@/schemas/auth.schema";
import { getSession } from "@/lib/getSession";

type TAuthResponse = TApiResponse<{ accessToken: string }>;

const authApi = axios.create({
  baseURL: "/api/v1/auth",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

authApi.interceptors.request.use((config) => {
  const { accessToken } = getSession();
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

authApi.interceptors.response.use(
  (response) => {
    const { setAccessToken } = getSession();
    const { accessToken } = response.data.data;
    if (accessToken) {
      setAccessToken(accessToken);
    }
    return response.data.data;
  },
  (error) => {
    if (error instanceof axios.AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw new Error(error.message);
  }
);

const userSignin = (credential: SignInSchema): Promise<TAuthResponse["data"]> => {
  return authApi.post(`/login`, credential);
};
const userSignup = (credential: SignUpSchema): Promise<TAuthResponse["data"]> => {
  return authApi.post(`/register`, credential);
};

const refreshToken = (): Promise<TAuthResponse["data"]> => {
  return authApi.post(`/refresh`);
};

const userSignout = async (): Promise<void> => {
  try {
    await authApi.post(`/logout`);
  } catch (error) {
    console.log("Error signing out", error);
  }
};

const userGoogleLogin = (): Promise<TAuthResponse["data"]> => {
  return authApi.get(`/google/callback` + window.location.search);
};

export { userSignin, userSignup, userSignout, refreshToken, userGoogleLogin };
