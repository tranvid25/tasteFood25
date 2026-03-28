import { env } from "../config/env";
import { getAccessToken } from "../auth/token";

type Options = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  headers?: Record<string, string>;
  baseUrl?: string;
  cache?: RequestCache;
};

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
  errors?: any;
};

export async function apiClient<T>(
  url: string,
  options: Options = {},
): Promise<ApiResponse<T>> {
  const {
    method = "GET",
    body,
    headers = {},
    baseUrl = env.API_URL || "",
    cache = "no-store",
  } = options;

  const fullUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;
  const token = getAccessToken();

  const reqHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (token) {
    reqHeaders["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(fullUrl, {
      method,
      headers: reqHeaders,
      body: body ? JSON.stringify(body) : undefined,
      cache,
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Đã xảy ra lỗi",
        errors: data.errors,
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Không thể kết nối đến máy chủ",
    };
  }
}
