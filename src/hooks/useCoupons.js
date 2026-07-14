import { useState } from "react";
import { validateCoupon } from "../services/discountService";

function useCoupons() {
  const [couponCode, setCouponCode] = useState("");
  const [couponResult, setCouponResult] = useState(null);
  const [couponLoading, setCouponLoading] = useState(false);

  const applyCoupon = async (items) => {
    if (!couponCode.trim()) {
      setCouponResult({
        valid: false,
        message: "Ingresa un cupon para aplicarlo.",
      });
      return null;
    }

    setCouponLoading(true);

    try {
      const result = await validateCoupon({
        code: couponCode,
        items,
      });

      setCouponResult(result);
      return result;
    } finally {
      setCouponLoading(false);
    }
  };

  const clearCoupon = () => {
    setCouponCode("");
    setCouponResult(null);
  };

  return {
    couponCode,
    setCouponCode,
    couponResult,
    couponLoading,
    applyCoupon,
    clearCoupon,
  };
}

export default useCoupons;
