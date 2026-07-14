import { useEffect, useState } from "react";
import { getCategories } from "../services/categoriesService";

export function useCategories(fallbackCategories = []) {
  const [categories, setCategories] = useState(fallbackCategories);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadCategories() {
      try {
        setLoading(true);
        const data = await getCategories();

        if (active) {
          setCategories(data);
          setError("");
        }
      } catch (requestError) {
        if (active) {
          setCategories(fallbackCategories);
          setError(requestError.message);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadCategories();

    return () => {
      active = false;
    };
  }, [fallbackCategories]);

  return { categories, loading, error };
}
