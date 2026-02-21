import type { AxiosError, AxiosResponse } from "axios";

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

export const logError = (error: AxiosError) => {
  console.groupCollapsed(`%cERROR ${error.config?.url}`, "color: red");
  console.log("Message:", error.message);
  console.log("Response:", error.response?.data);
  console.groupEnd();

  return Promise.reject(error);
};
