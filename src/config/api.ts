// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    PROFILE: "/auth/profile",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
  },

  // Users
  USERS: {
    LIST: "/users",
    CREATE: "/users",
    GET: (id: string) => `/users/${id}`,
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
  },

  // Files
  FILES: {
    LIST: "/files",
    UPLOAD: "/files/upload",
    DOWNLOAD: (id: string) => `/files/${id}/download`,
    DELETE: (id: string) => `/files/${id}`,
    GET_INFO: (id: string) => `/files/${id}`,
    SEARCH: "/files/search",
  },

  // Health Check
  HEALTH: "/health",
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error - please check your connection",
  UNAUTHORIZED: "You are not authorized to perform this action",
  FORBIDDEN: "Access forbidden - insufficient permissions",
  NOT_FOUND: "The requested resource was not found",
  SERVER_ERROR: "An internal server error occurred",
  VALIDATION_ERROR: "Please check your input and try again",
  UNKNOWN_ERROR: "An unexpected error occurred",
} as const;

// Request Headers
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
} as const;

// File Upload Configuration
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_FILE_TYPES: [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "application/pdf",
    "text/plain",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],
  CHUNK_SIZE: 1024 * 1024, // 1MB chunks for large file uploads
};

// Cache Configuration
export const CACHE_CONFIG = {
  DEFAULT_STALE_TIME: 5 * 60 * 1000, // 5 minutes
  DEFAULT_CACHE_TIME: 10 * 60 * 1000, // 10 minutes
  LONG_CACHE_TIME: 60 * 60 * 1000, // 1 hour
};
