// axiosInstance.ts
import axios, { AxiosResponse, AxiosError } from "axios";
import { toast } from "sonner"

export const baseURL = "http://localhost:8080/api";

const instance = axios.create({
  baseURL,
  withCredentials: true, // So cookies (refreshToken) are sent
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      `${baseURL}/auth/refresh-token`,
      {},
      { withCredentials: true }
    );
    const { accessToken } = response.data;
    localStorage.setItem("token", accessToken);
    return accessToken;
  } catch (error) {
    return null;
  }
};

instance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    // Only set application/json if not FormData
    if (
      config.data &&
      typeof config.data === "object" &&
      !(config.data instanceof FormData)
    ) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (err: AxiosError) => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        // Queue requests while refreshing
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return instance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const newToken = await refreshAccessToken();
      if (newToken) {
        instance.defaults.headers.common["Authorization"] = "Bearer " + newToken;
        processQueue(null, newToken);
        originalRequest.headers["Authorization"] = "Bearer " + newToken;
        isRefreshing = false;
        return instance(originalRequest);
      } else {
        processQueue(error, null);
        isRefreshing = false;
        // Optionally: log out user here
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        // window.location.href = "/signin"; // Uncomment if you want to redirect
        return Promise.reject(error);
      }
    }

    if (error.response && error.response.status) {
      handleErrorResponse(error.response.status, error.response.data);
    } else {
      toast.error(
        "Network Error: There was a problem connecting to the server.",
      );
    }
    return Promise.reject(error);
  }
);

const handleErrorResponse = (status: number, data: unknown) => {
  let errorMessage: string | undefined;
  if (typeof data === "object" && data !== null && "error" in data) {
    errorMessage = (data as { error?: string }).error;
  }

  switch (status) {
    case 401:
      toast.error(`Authentication Error: ${errorMessage || "Unauthorized"}`);
      break;
    case 403:
      toast.error(`Permission Denied: ${errorMessage || "Forbidden"}`);
      break;
    case 404:
      toast(
        `Resource Not Found: ${
          errorMessage || "The requested resource was not found."
        }`
      );
      break;
    case 400:
      toast.error(
        `An error occurred: ${errorMessage || "Invalid request data."}`
      );
      break;
    case 500:
      toast.error(
        `Server Error: ${
          errorMessage || "Something went wrong on the server."
        }`
      );
      break;
    default:
      toast.error(`Error: ${errorMessage || "An unexpected error occurred."}`);
  }
};

export default instance;