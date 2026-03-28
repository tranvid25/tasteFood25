import { apiClient } from "../../infrastructure/http/apiClient";
import type { registerSchema } from "../../validator/auth.validator";
import * as z from "zod";

type RegisterInput = z.infer<typeof registerSchema>;

export const authApi = {
  /**
   * Đăng ký tài khoản mới
   * Gọi /api/auth/register (Next.js Route) → NestJS /api/auth/register
   */
  register: async (data: Omit<RegisterInput, "confirmPassword">) => {
    return apiClient("/api/auth/register", {
      method: "POST",
      body: data,
    });
  },

  /**
   * Đăng nhập
   */
  login: async (data: { email: string; password: string }) => {
    return apiClient("/api/auth/login", {
      method: "POST",
      body: data,
    });
  },
};
