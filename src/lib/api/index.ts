import { authApi } from "./auth.api";
import { productApi } from "./product.api";

export const api = {
  auth: authApi,
  product: productApi,
};

export type { ApiResponse } from "../../infrastructure/http/apiClient";
