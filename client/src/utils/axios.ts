// axiosInstance.ts
import axios, { AxiosResponse, AxiosError } from "axios";
import { toast } from "sonner"

export const baseURL = "http://localhost:8080/api";

const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use(
  async (config) => {
    // Get token from localStorage instead of SecureStore
    const token = localStorage.getItem("token");
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    config.headers["Content-Type"] = "application/json";
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
  (error: AxiosError) => {
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
  // Try to extract error message safely
  let errorMessage: string | undefined;
  if (typeof data === "object" && data !== null && "error" in data) {
    errorMessage = (data as { error?: string }).error;
  }

  switch (status) {
    case 401:
      toast.error(`Authentication Error: ${errorMessage || "Unauthorized"}`,);
      break;
    case 403:
      toast.error(`Permission Denied: ${errorMessage || "Forbidden"}`, );
      break;
    case 404:
      toast(
        `Resource Not Found: ${
          errorMessage || "The requested resource was not found."
        }`,
        
      );
      break;
    case 400:
      toast.error(
        `An error occurred: ${errorMessage || "Invalid request data."}`,
       
      );
      break;
    case 500:
      toast.error(
        `Server Error: ${
          errorMessage || "Something went wrong on the server."
        }`,
        
      );
      break;
    default:
      toast.error(`Error: ${errorMessage || "An unexpected error occurred."}`, );
  }
};
export default instance;