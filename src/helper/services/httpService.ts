"use client";
import StorageClass from "@/dal/storage/StorageClass";
import { STORAGE_KEYS } from "@/dal/storage/StorageKeys";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const httpService = axios.create({
  baseURL: BASE_URL,
});

export const unsecureHttpService = axios.create({
  baseURL: BASE_URL,
});

// ✅ NEW: TP HTTP SERVICE
export const tpHttpService = axios.create({
  baseURL: BASE_URL,
});

// ✅ Interceptor for unsecure requests
unsecureHttpService.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: AxiosError<unknown>): Promise<never> =>
    Promise.reject(error?.response?.data)
);

// ✅ Interceptor for secure requests (normal token)
httpService.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = StorageClass.getValue(STORAGE_KEYS.TOKEN, { isJSON: false });

    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
  },
  (error: AxiosError<unknown>): Promise<never> => Promise.reject(error)
);

// ✅ Interceptor for TP requests (TP token only)
tpHttpService.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const tptoken = StorageClass.getValue(STORAGE_KEYS.TP_TOKEN, {
      isJSON: false,
    });

    if (tptoken) {
      config.headers.set("Authorization", `Bearer ${tptoken}`);
    }

    return config;
  },
  (error: AxiosError<unknown>): Promise<never> => Promise.reject(error)
);

// ✅ Shared response interceptor (optional reuse)
const handleResponse = (response: AxiosResponse): AxiosResponse => response;

const handleError = (error: AxiosError<unknown>): Promise<never> =>
  Promise.reject(error?.response?.data);

// Apply response interceptors
httpService.interceptors.response.use(handleResponse, handleError);
tpHttpService.interceptors.response.use(handleResponse, handleError);

export default httpService;