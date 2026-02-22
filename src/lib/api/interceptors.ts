import type { AxiosError, AxiosResponse } from "axios";
import { HttpError } from "../utils/app-error";

type ApiSuccessResponse<T = unknown> = {
  data: T;
  message?: string;
  statusCode?: number;
};

type ValidationIssue = {
  path: string;
  message: string;
};

type ApiErrorResponse = {
  message?: string;
  statusCode?: number;
  error?: {
    statusCode?: number;
    details?: {
      issues?: ValidationIssue[];
    };
  };
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
  console.log(`This is the error: ${JSON.stringify(error.response?.data)}`);

  const responseData = error.response?.data;

  // Extract validation issues if they exist
  const validationIssues = responseData?.error?.details?.issues;

  // Use the first validation issue message if available, otherwise use the generic message
  const message =
    validationIssues && validationIssues.length > 0
      ? validationIssues[0].message
      : responseData?.message || error.message || "Something went wrong";

  const statusCode =
    responseData?.error?.statusCode ||
    responseData?.statusCode ||
    error.response?.status ||
    500;

  return Promise.reject(new HttpError(message, statusCode, validationIssues));
};
