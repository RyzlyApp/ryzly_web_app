"use client";
import StorageClass from "@/dal/storage/StorageClass";
import { STORAGE_KEYS } from "@/dal/storage/StorageKeys";
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const httpService = axios.create({
  baseURL: BASE_URL,
});

export const unsecureHttpService = axios.create({
  baseURL: BASE_URL,
});

// ✅ Interceptor for unsecure requests
unsecureHttpService.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: AxiosError<unknown>): Promise<never> => Promise.reject(error)
);

// ✅ Interceptor for secure requests (adds token)
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

export default httpService;
