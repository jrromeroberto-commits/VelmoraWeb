import { useEffect, useState } from "react";
import { getCoupons, getDiscounts } from "../services/discountService";

function useDiscounts(category) {
  const [discounts, setDiscounts] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadDiscounts = async () => {
      try {
        setLoading(true);
        setError("");

        const [discountList, couponList] = await Promise.all([
          getDiscounts({ category }),
          getCoupons(),
        ]);

        if (isMounted) {
          setDiscounts(discountList);
          setCoupons(couponList);
        }
      } catch {
        if (isMounted) {
          setError("No se pudieron cargar los descuentos.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadDiscounts();

    return () => {
      isMounted = false;
    };
  }, [category]);

  return {
    discounts,
    coupons,
    loading,
    error,
  };
}

export default useDiscounts;
