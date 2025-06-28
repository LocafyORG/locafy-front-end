export interface ErrorResponse {
  status: number;
  message: string;
  timestamp: string;
  errors?: Record<string, string>;
}
