import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import httpService, {
  unsecureHttpService,
} from "@/helper/services/httpService";

/**
 * Base Repository class that provides common CRUD operations
 * All specific repositories should extend this class
 */
export abstract class BaseRepository {
  protected httpClient: AxiosInstance;
  protected unsecureHttpClient: AxiosInstance;

  constructor() {
    this.httpClient = httpService;
    this.unsecureHttpClient = unsecureHttpService;
  }

  /**
   * Generic GET request
   */
  protected async get<T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<{ data: T }> = await this.httpClient.get(
      endpoint,
      config
    );
    return response.data.data;
  }

  /**
   * Generic unsecure GET request (no auth token)
   */
  protected async getUnsecure<T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<{ data: T }> =
      await this.unsecureHttpClient.get(endpoint, config);
    return response.data.data;
  }

  /**
   * Generic POST request
   */
  protected async post<T, D = unknown>(
    endpoint: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<{ data: T; message: string }>> {
    return await this.httpClient.post(endpoint, data, config);
  }

  /**
   * Generic unsecure POST request (no auth token)
   */
  protected async postUnsecure<T, D = unknown>(
    endpoint: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<{ data: T; message: string }>> {
    return await this.unsecureHttpClient.post(endpoint, data, config);
  }

  /**
   * Generic PUT request
   */
  protected async put<T, D = unknown>(
    endpoint: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<{ data: T; message: string }>> {
    return await this.httpClient.put(endpoint, data, config);
  }

  /**
   * Generic PATCH request
   */
  protected async patch<T, D = unknown>(
    endpoint: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<{ data: T; message: string }>> {
    return await this.httpClient.patch(endpoint, data, config);
  }

  /**
   * Generic DELETE request
   */
  protected async delete<T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<{ data: T; message: string }>> {
    return await this.httpClient.delete(endpoint, config);
  }

  /**
   * Upload file with multipart/form-data
   */
  protected async uploadFile<T>(
    endpoint: string,
    formData: FormData
  ): Promise<AxiosResponse<{ data: T; message: string }>> {
    return await this.httpClient.post(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}
