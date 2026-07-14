import { useEffect, useState } from "react";
import { getTrendingProducts } from "../services/productsService";

const getNumericPrice = (price) => Number(String(price).replace("S/ ", ""));

const filterFallbackProducts = (products, filters) => {
  const search = filters.search.trim().toLowerCase();

  return products
    .filter((product) => {
      const matchesCategory = filters.categoryId
        ? product.categoryId === filters.categoryId
        : true;
      const matchesSearch = search
        ? product.name.toLowerCase().includes(search)
        : true;
      const price = getNumericPrice(product.price);
      const matchesMinPrice = filters.minPrice ? price >= Number(filters.minPrice) : true;
      const matchesMaxPrice = filters.maxPrice ? price <= Number(filters.maxPrice) : true;

      return matchesCategory && matchesSearch && matchesMinPrice && matchesMaxPrice;
    })
    .sort((firstProduct, secondProduct) => {
      if (filters.sort === "price_asc") {
        return getNumericPrice(firstProduct.price) - getNumericPrice(secondProduct.price);
      }

      if (filters.sort === "price_desc") {
        return getNumericPrice(secondProduct.price) - getNumericPrice(firstProduct.price);
      }

      if (filters.sort === "name_asc") {
        return firstProduct.name.localeCompare(secondProduct.name);
      }

      return firstProduct.id - secondProduct.id;
    });
};

export function useTrendingProducts(filters, fallbackProducts = []) {
  const [products, setProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        setLoading(true);
        const data = await getTrendingProducts(filters);

        if (active) {
          setProducts(data);
          setError("");
        }
      } catch (requestError) {
        if (active) {
          setProducts(filterFallbackProducts(fallbackProducts, filters));
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
  }, [filters, fallbackProducts]);

  return { products, loading, error };
}
