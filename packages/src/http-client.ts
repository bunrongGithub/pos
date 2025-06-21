import axios from "axios";
import { AppMessage, HttpStatus } from "./constants";
import { ApiResHandler } from "./errors/app-error-handler";

const http = axios.create({
  baseURL: "",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

http.interceptors.response.use(
  function (response: any) {
    return response;
  },
  (error: any) => {
    const status = error?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = error.response?.data?.message || error.message || AppMessage.GENERAL.INTERNAL()
    const details = {
            url: error.config?.url,
            method: error.config?.method,
            statusText: error.response?.statusText,
            data: error.response?.data,
        };
    return Promise.reject(new ApiResHandler(message,status,details))
  }
);
export const HttpClient = {
  get: (url: string, config?: any) => {
    return http.get(url, config);
  },
  post: (url: string, data?: any, config?: any) => {
    return http.post(url, data, config);
  },
  put: (url: string, data?: any, config?: any) => {
    return http.put(url, data, config);
  },
  delete: (url: string, config?: any) => {
    return http.delete(url, config);
  },
  patch: (url: string, data?: any, config?: any) => {
    return http.patch(url, data, config);
  },
}