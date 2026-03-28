import { env } from "../config/env";
import { getAccessToken } from "../auth/token";

type Options = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  headers?: Record<string, string>;
  baseUrl?: string;
  cache?: RequestCache;
};

export type ApiErrorPayload = {
  code: string;
  details: Record<string, string[]> | null;
};

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
  errors?: unknown;
  error?: ApiErrorPayload;
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

    let data: Record<string, unknown>;
    try {
      data = (await res.json()) as Record<string, unknown>;
    } catch {
      data = {};
    }

    if (!res.ok) {
      const err = data.error as Partial<ApiErrorPayload> | undefined;
      if (err && typeof err === "object" && typeof err.code === "string") {
        return {
          success: false,
          error: {
            code: err.code,
            details:
              "details" in err && err.details !== undefined
                ? err.details
                : null,
          },
        };
      }

      return {
        success: false,
        message:
          (typeof data.message === "string" && data.message) ||
          "Đã xảy ra lỗi",
        errors: data.errors,
      };
    }

    return {
      success: true,
      data: data as T,
    };
  } catch (error: unknown) {
    const msg =
      error instanceof Error ? error.message : "Không thể kết nối đến máy chủ";
    return {
      success: false,
      message: msg,
      error: {
        code: "NETWORK_ERROR",
        details: null,
      },
    };
  }
}
