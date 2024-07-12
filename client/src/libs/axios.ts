import axios from "axios";
import { useAuthStore } from "../store/auth";

const authApi = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

authApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    // Asegúrate de usar AxiosHeaders para las cabeceras
    if (!config.headers) {
      config.headers = new axios.AxiosHeaders();
    }
    config.headers.set('Authorization', `Bearer ${token}`);
  }

  return config;
});

export default authApi;
