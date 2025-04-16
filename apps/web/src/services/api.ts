import { getSession } from "@/lib/getSession";
import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const { accessToken } = getSession();
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

api.interceptors.response.use(
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

export default api;
