/**
 * Axios instance with automatic auth header injection.
 *
 * Auth token is read from expo-secure-store on each request via a
 * request interceptor so that token refreshes are picked up automatically.
 */
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ??
  Constants.expoConfig?.extra?.apiUrl ??
  "http://localhost:8000";

export const ACCESS_TOKEN_KEY = "sandpitt_access_token";
export const REFRESH_TOKEN_KEY = "sandpitt_refresh_token";

const apiClient: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15_000,
});

// Inject the access token before every request
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Basic 401 handler — clear tokens and redirect to login
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
      await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
      // Navigation to login is handled by the auth hook / protected layout
    }
    return Promise.reject(error);
  }
);

export default apiClient;
