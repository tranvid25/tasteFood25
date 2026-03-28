import { apiClient } from "../../infrastructure/http/apiClient";

export const productApi = {
  /**
   * Lấy danh sách sản phẩm
   */
  getProducts: async (params?: { page?: number; limit?: number }) => {
    return apiClient("/api/products", {
      method: "GET",
      // Thêm query params nếu cần
    });
  },

  /**
   * Lấy chi tiết sản phẩm
   */
  getProductDetail: async (id: string) => {
    return apiClient(`/api/products/${id}`, {
      method: "GET",
    });
  },
};
