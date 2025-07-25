import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
});

export const ResponseStatus = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
  WARN: "warn",
  BAD: "bad",
  FAILURE: "failure",
  GOOD: "good",
} as const;

export type ResponseStatus = keyof typeof ResponseStatus;

export interface ApiResponse<T = unknown> {
  status: (typeof ResponseStatus)[ResponseStatus];
  message: string;
  data: T;
}
