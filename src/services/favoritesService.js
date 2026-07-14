import { apiRequest } from "./api";

const FAVORITES_USER_KEY = "velmoraFavoritesUserKey";

export function getFavoritesUserKey() {
  const savedKey = localStorage.getItem(FAVORITES_USER_KEY);

  if (savedKey) {
    return savedKey;
  }

  const newKey = `guest-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  localStorage.setItem(FAVORITES_USER_KEY, newKey);
  return newKey;
}

export function getFavoriteProducts(userKey) {
  return apiRequest(`/favorites?userKey=${encodeURIComponent(userKey)}`);
}

export function addFavoriteProduct(userKey, productId) {
  return apiRequest("/favorites", {
    method: "POST",
    body: JSON.stringify({ userKey, productId }),
  });
}

export function removeFavoriteProduct(userKey, productId) {
  return apiRequest(
    `/favorites/${productId}?userKey=${encodeURIComponent(userKey)}`,
    {
      method: "DELETE",
    }
  );
}
