// utils/extractAxiosMessage.ts
import { AxiosError } from "axios";

export const extractAxiosMessage = (error: AxiosError): string => {
  const data = error?.response?.data;

  if (!data) return "Something went wrong";

  // Case 1: { message: "..." }
  if (typeof data === "object" && "message" in data) {
    return (data as Record<string, unknown>).message as string;
  }

  // Case 2: plain string
  if (typeof data === "string") {
    return data;
  }

  // Case 3: nested backend format: error.details.message
  if (
    typeof data === "object" &&
    "error" in data &&
    typeof (data as Record<string, unknown>).error === "object"
  ) {
    const errorObj = (data as { error: { details?: { message?: string } } }).error;

    if (errorObj?.details?.message) {
      return errorObj.details.message;
    }
  }

  return "Something went wrong";
};
