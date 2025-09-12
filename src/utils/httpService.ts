import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Types for our HTTP service
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  status: number;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

class HttpService {
  private axiosInstance: AxiosInstance;
  private baseURL: string;

  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api') {
    this.baseURL = baseURL;
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      timeout: 10000, // 10 seconds
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Add request timestamp for logging
        config.metadata = { startTime: new Date() };
        
        // Log request in development
        if (process.env.NODE_ENV === 'development') {
          console.log(`🚀 [${config.method?.toUpperCase()}] ${config.url}`, {
            data: config.data,
            params: config.params,
          });
        }

        return config;
      },
      (error: AxiosError) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        // Calculate request duration
        const duration = response.config.metadata?.startTime 
          ? new Date().getTime() - response.config.metadata.startTime.getTime()
          : 0;
        
        // Log response in development
        if (process.env.NODE_ENV === 'development') {
          console.log(`✅ [${response.config.method?.toUpperCase()}] ${response.config.url} (${duration}ms)`, {
            status: response.status,
            data: response.data,
          });
        }

        return response;
      },
      (error: AxiosError) => {
        const duration = error.config?.metadata?.startTime 
          ? new Date().getTime() - error.config.metadata.startTime.getTime()
          : 0;

        // Log error in development
        if (process.env.NODE_ENV === 'development') {
          console.error(`❌ [${error.config?.method?.toUpperCase()}] ${error.config?.url} (${duration}ms)`, {
            status: error.response?.status,
            message: error.message,
            data: error.response?.data,
          });
        }

        // Handle specific error cases
        if (error.response?.status === 401) {
          this.handleUnauthorized();
        }

        if (error.response?.status === 403) {
          this.handleForbidden();
        }

        if (error.response?.status && error.response.status >= 500) {
          this.handleServerError(error);
        }

        return Promise.reject(this.normalizeError(error));
      }
    );
  }

  private getAuthToken(): string | null {
    // Get token from localStorage, cookies, or your preferred storage
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
    }
    return null;
  }

  private handleUnauthorized(): void {
    // Clear auth token and redirect to login
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      sessionStorage.removeItem('auth_token');
      // You can dispatch a logout action or redirect to login page
      window.location.href = '/login';
    }
  }

  private handleForbidden(): void {
    // Handle forbidden access
    console.warn('Access forbidden - insufficient permissions');
    // You can show a toast notification or redirect to appropriate page
  }

  private handleServerError(error: AxiosError): void {
    // Handle server errors
    console.error('Server error occurred:', error.response?.data);
    // You can show a global error notification
  }

  private normalizeError(error: AxiosError): ApiError {
    const normalizedError: ApiError = {
      message: 'An unexpected error occurred',
      status: 500,
    };

    if (error.response) {
      // Server responded with error status
      normalizedError.status = error.response.status;
      const responseData = error.response.data as any;
      normalizedError.message = responseData?.message || error.message;
      normalizedError.code = responseData?.code;
    } else if (error.request) {
      // Request was made but no response received
      normalizedError.message = 'Network error - please check your connection';
      normalizedError.status = 0;
    } else {
      // Something else happened
      normalizedError.message = error.message;
    }

    return normalizedError;
  }

  // HTTP Methods
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.get<T>(url, config);
    return this.formatResponse(response);
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return this.formatResponse(response);
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return this.formatResponse(response);
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.patch<T>(url, data, config);
    return this.formatResponse(response);
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return this.formatResponse(response);
  }

  // File upload method
  async uploadFile<T = any>(
    url: string, 
    file: File, 
    onUploadProgress?: (progressEvent: any) => void
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.axiosInstance.post<T>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });

    return this.formatResponse(response);
  }

  // Download file method
  async downloadFile(url: string, filename?: string): Promise<void> {
    const response = await this.axiosInstance.get(url, {
      responseType: 'blob',
    });

    // Create blob link to download
    const blob = new Blob([response.data]);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename || 'download';
    link.click();
    window.URL.revokeObjectURL(link.href);
  }

  private formatResponse<T>(response: AxiosResponse<T>): ApiResponse<T> {
    return {
      data: response.data,
      success: response.status >= 200 && response.status < 300,
      status: response.status,
      message: response.statusText,
    };
  }

  // Utility methods
  setAuthToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  clearAuthToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      sessionStorage.removeItem('auth_token');
    }
  }

  setBaseURL(baseURL: string): void {
    this.baseURL = baseURL;
    this.axiosInstance.defaults.baseURL = baseURL;
  }

  getBaseURL(): string {
    return this.baseURL;
  }
}

// Create and export a singleton instance
const httpService = new HttpService();
export default httpService;

// Export the class for creating custom instances if needed
export { HttpService };

// Extend AxiosRequestConfig to include metadata
declare module 'axios' {
  interface AxiosRequestConfig {
    metadata?: {
      startTime: Date;
    };
  }
}