import { apiRequest } from "./api";

export function getTrendingProducts(filters = {}) {
  const params = new URLSearchParams();

  if (filters.categoryId) params.set("categoryId", filters.categoryId);
  if (filters.search) params.set("search", filters.search);
  if (filters.minPrice) params.set("minPrice", filters.minPrice);
  if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
  if (filters.sort) params.set("sort", filters.sort);

  const query = params.toString() ? `?${params.toString()}` : "";
  return apiRequest(`/products/trending${query}`);
}
