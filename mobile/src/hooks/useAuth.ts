/**
 * Auth hook — manages access/refresh tokens in expo-secure-store.
 *
 * In a real app this would exchange the Keycloak authorization code for tokens
 * via the PKCE flow (e.g. with expo-auth-session).  Here we provide the
 * storage layer and helpers that the rest of the app relies on.
 */
import { useCallback, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../api/client";

export interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface UseAuthReturn extends AuthState {
  login: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [state, setState] = useState<AuthState>({
    accessToken: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // On mount, check if we have a stored token
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
        if (!cancelled) {
          setState({
            accessToken: token,
            isAuthenticated: !!token,
            isLoading: false,
          });
        }
      } catch {
        if (!cancelled) {
          setState({ accessToken: null, isAuthenticated: false, isLoading: false });
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (accessToken: string, refreshToken: string) => {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
    setState({ accessToken, isAuthenticated: true, isLoading: false });
  }, []);

  const logout = useCallback(async () => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
    setState({ accessToken: null, isAuthenticated: false, isLoading: false });
  }, []);

  return { ...state, login, logout };
}
