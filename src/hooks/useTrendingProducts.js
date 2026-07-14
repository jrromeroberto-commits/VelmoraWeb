import { useEffect, useState } from "react";
import { getTrendingProducts } from "../services/productsService";

export function useTrendingProducts(categoryId, fallbackProducts = []) {
  const [products, setProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        setLoading(true);
        const data = await getTrendingProducts(categoryId);

        if (active) {
          setProducts(data);
          setError("");
        }
      } catch (requestError) {
        if (active) {
          const filteredFallback = categoryId
            ? fallbackProducts.filter((product) => product.categoryId === categoryId)
            : fallbackProducts;

          setProducts(filteredFallback);
          setError(requestError.message);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, [categoryId, fallbackProducts]);

  return { products, loading, error };
}
