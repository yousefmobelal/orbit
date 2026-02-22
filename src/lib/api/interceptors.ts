import type { AxiosError, AxiosResponse } from "axios";
import { HttpError } from "../utils/app-error";

type ApiSuccessResponse<T = unknown> = {
  data: T;
  message?: string;
  statusCode?: number;
};

type ApiErrorResponse = {
  message?: string;
  statusCode?: number;
};

export const logResponse = (response: AxiosResponse) => {
  console.groupCollapsed(
    `%c${response.config.method?.toUpperCase()} ${response.config.url}`,
    "color: green",
  );
  console.log("Status:", response.status);
  console.log("Response:", response.data);
  console.groupEnd();

  return response;
};

export const unwrapData = <T>(
  response: AxiosResponse<ApiSuccessResponse<T>>,
) => {
  return response.data.data;
};

export const logError = (error: AxiosError) => {
  console.groupCollapsed(`%cERROR ${error.config?.url}`, "color: red");
  console.log("Message:", error.message);
  console.log("Response:", error.response?.data);
  console.groupEnd();

  return Promise.reject(error);
};

export const handleError = (error: AxiosError<ApiErrorResponse>) => {
  const message =
    error.response?.data?.message || error.message || "Something went wrong";

  const statusCode =
    error.response?.data?.statusCode || error.response?.status || 500;

  return Promise.reject(new HttpError(message, statusCode));
};
