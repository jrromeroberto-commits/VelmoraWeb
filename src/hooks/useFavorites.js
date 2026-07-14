import { useEffect, useMemo, useState } from "react";
import {
  addFavoriteProduct,
  getFavoriteProducts,
  getFavoritesUserKey,
  removeFavoriteProduct,
} from "../services/favoritesService";

const LOCAL_FAVORITES_KEY = "velmoraFavoriteProductIds";

const getLocalFavoriteIds = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_FAVORITES_KEY)) || [];
  } catch {
    return [];
  }
};

const saveLocalFavoriteIds = (favoriteIds) => {
  localStorage.setItem(LOCAL_FAVORITES_KEY, JSON.stringify(favoriteIds));
};

export function useFavorites() {
  const userKey = useMemo(() => getFavoritesUserKey(), []);
  const [favoriteIds, setFavoriteIds] = useState(getLocalFavoriteIds);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadFavorites() {
      try {
        const favorites = await getFavoriteProducts(userKey);
        const ids = favorites.map((product) => product.id);

        if (active) {
          setFavoriteIds(ids);
          saveLocalFavoriteIds(ids);
          setError("");
        }
      } catch (requestError) {
        if (active) {
          setError(requestError.message);
        }
      }
    }

    loadFavorites();

    return () => {
      active = false;
    };
  }, [userKey]);

  const toggleFavorite = async (productId) => {
    const isFavorite = favoriteIds.includes(productId);
    const nextFavorites = isFavorite
      ? favoriteIds.filter((id) => id !== productId)
      : [...favoriteIds, productId];

    setFavoriteIds(nextFavorites);
    saveLocalFavoriteIds(nextFavorites);

    try {
      if (isFavorite) {
        await removeFavoriteProduct(userKey, productId);
      } else {
        await addFavoriteProduct(userKey, productId);
      }

      setError("");
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  return { favoriteIds, toggleFavorite, error };
}
