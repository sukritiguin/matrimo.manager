import { getSession } from "@/lib/getSession";
import { TApiResponse, TUser } from "@/types";
import axios from "axios";

const userApi = axios.create({
  baseURL: "api/v1/users",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

userApi.interceptors.request.use((config) => {
  const { accessToken } = getSession();
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

userApi.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error instanceof axios.AxiosError) {
      throw new Error(error.response?.data.message);
    }
    throw new Error(error.message);
  }
);

interface IUserServicesResponse {
  getMe: TApiResponse<{ user: TUser }>;
}

const getMe = (): Promise<IUserServicesResponse["getMe"]> => userApi.get("/me");

export { getMe };
