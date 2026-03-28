import { toast } from "sonner";
import type { ApiErrorPayload } from "@/src/infrastructure/http/apiClient";

export type { ApiErrorPayload };

/** Body từ Nest / BFF chuẩn hóa */
export function isStandardApiError(
  value: unknown,
): value is { success: false; error: ApiErrorPayload } {
  if (!value || typeof value !== "object") return false;
  const v = value as { success?: boolean; error?: unknown };
  if (v.success !== false || !v.error || typeof v.error !== "object")
    return false;
  const e = v.error as { code?: unknown; details?: unknown };
  return typeof e.code === "string";
}

type TranslateErrors = (key: string) => string;

function translateCode(tErrors: TranslateErrors, code: string): string {
  try {
    return tErrors(code);
  } catch {
    return code;
  }
}

/**
 * Hiển thị lỗi API: ưu tiên `error.details` (mã theo field), sau đó `error.code`.
 * `tErrors` = useTranslations("Errors").
 */
export function handleApiError(input: unknown, tErrors: TranslateErrors) {
  if (isStandardApiError(input)) {
    const { code, details } = input.error;
    if (details && Object.keys(details).length > 0) {
      for (const codes of Object.values(details)) {
        if (!Array.isArray(codes)) continue;
        for (const c of codes) {
          toast.error(translateCode(tErrors, String(c)));
        }
      }
      return;
    }
    toast.error(translateCode(tErrors, code));
    return;
  }

  if (input && typeof input === "object") {
    const r = input as {
      error?: Partial<ApiErrorPayload>;
      message?: string;
    };
    if (r.error?.code) {
      handleApiError(
        {
          success: false,
          error: {
            code: r.error.code,
            details: r.error.details ?? null,
          },
        },
        tErrors,
      );
      return;
    }
    if (typeof r.message === "string" && r.message) {
      toast.error(r.message);
      return;
    }
  }

  if (input instanceof Error && input.message) {
    toast.error(input.message);
    return;
  }

  toast.error(tErrors("UNKNOWN_ERROR"));
}

/** @deprecated Dùng handleApiError(input, tErrors) */
export function handleError(input: unknown, tErrors?: TranslateErrors) {
  if (tErrors) {
    handleApiError(input, tErrors);
    return;
  }
  toast.error("Unknown error");
}
