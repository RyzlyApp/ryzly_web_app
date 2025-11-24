// api.ts 
import httpService, { unsecureHttpService } from "./httpService";

// Generic type for API response
export type ApiResponse<T> = {
  data: T;
  success: boolean;
};

export const fetchUnsecureData = async <T>(
  endpoint: string,
  params?: Record<string, unknown> 
): Promise<T> => {
  const response = await httpService.get<ApiResponse<T>>(endpoint, { params });
  return response.data.data; // extract only the `data` field
};

export const fetchSecureData = async <T>(
  endpoint: string,
  params?: Record<string, unknown>, // more specific than `any`
  pagination?: boolean
): Promise<T> => {
  const response = await httpService.get<ApiResponse<T>>(endpoint, { params });
  if (pagination) {
    // When pagination is true, return the entire response.data (ApiResponse<T>)
    return response.data as unknown as T;
  } else {
    // Otherwise, return only the unwrapped data
    return response.data.data;
  }
};
