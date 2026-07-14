import { apiRequest } from "./api";

export function getTrendingProducts(categoryId) {
  const query = categoryId ? `?categoryId=${categoryId}` : "";
  return apiRequest(`/products/trending${query}`);
}
