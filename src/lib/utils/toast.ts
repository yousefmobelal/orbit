import { toast as toastify, type ToastOptions } from "react-toastify";

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const toast = {
  success: (message: string, options?: ToastOptions) => {
    toastify.success(message, { ...defaultOptions, ...options });
  },

  error: (message: string, options?: ToastOptions) => {
    toastify.error(message, { ...defaultOptions, ...options });
  },

  info: (message: string, options?: ToastOptions) => {
    toastify.info(message, { ...defaultOptions, ...options });
  },

  warning: (message: string, options?: ToastOptions) => {
    toastify.warning(message, { ...defaultOptions, ...options });
  },

  loading: (message: string, options?: ToastOptions) => {
    return toastify.loading(message, { ...defaultOptions, ...options });
  },

  promise: <T>(
    promise: Promise<T>,
    {
      pending,
      success,
      error,
    }: {
      pending: string;
      success: string;
      error: string;
    },
  ) => {
    return toastify.promise(promise, {
      pending,
      success,
      error,
    });
  },

  dismiss: (toastId?: string | number) => {
    toastify.dismiss(toastId);
  },
};
