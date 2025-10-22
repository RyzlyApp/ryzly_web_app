export interface GeneralResponse<T> {
  data: T;
  success: boolean;
  message: string;
}
