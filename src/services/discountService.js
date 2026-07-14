import descuento1 from "../imagenes/descuento1.png";
import descuento2 from "../imagenes/descuento2.png";
import descuento3 from "../imagenes/descuento3.png";
import descuento4 from "../imagenes/descuento4.png";
import descuento5 from "../imagenes/descuento5.png";
import descuento6 from "../imagenes/descuento6.png";
import { getCartSubtotal, parsePrice } from "./pricingService";

export const discountCategories = [
  "Todos",
  "Polos",
  "Pantalones",
  "Vestidos",
  "Calzado",
  "Accesorios",
  "Deportivas",
];

const discounts = [
  {
    id: 1,
    storeId: "urban-flow",
    store: "Urban Flow",
    discount: "50% OFF",
    description: "Ropa urbana seleccionada",
    category: "Polos",
    date: "Valido hasta el 30 de junio",
    image: descuento1,
    type: "PERCENTAGE",
    value: 50,
    active: true,
  },
  {
    id: 2,
    storeId: "nova-fit",
    store: "Nova Fit",
    discount: "35% OFF",
    description: "Prendas deportivas para entrenamiento",
    category: "Deportivas",
    date: "Oferta por tiempo limitado",
    image: descuento2,
    type: "PERCENTAGE",
    value: 35,
    active: true,
  },
  {
    id: 3,
    storeId: "luna-wear",
    store: "Luna Wear",
    discount: "40% OFF",
    description: "Outfits diarios y modernos",
    category: "Vestidos",
    date: "Valido hasta agotar stock",
    image: descuento3,
    type: "PERCENTAGE",
    value: 40,
    active: true,
  },
  {
    id: 4,
    storeId: "maisone",
    store: "Maisone",
    discount: "25% OFF",
    description: "Calzado elegante de temporada",
    category: "Calzado",
    date: "Solo esta semana",
    image: descuento4,
    type: "PERCENTAGE",
    value: 25,
    active: true,
  },
  {
    id: 5,
    storeId: "norda",
    store: "Norda",
    discount: "2x1",
    description: "Accesorios seleccionados",
    category: "Accesorios",
    date: "Promocion exclusiva online",
    image: descuento5,
    type: "TWO_FOR_ONE",
    value: 0,
    active: true,
  },
  {
    id: 6,
    storeId: "avanto",
    store: "Avanto",
    discount: "30% OFF",
    description: "Pantalones de nueva coleccion",
    category: "Pantalones",
    date: "Valido hasta el domingo",
    image: descuento6,
    type: "PERCENTAGE",
    value: 30,
    active: true,
  },
];

const coupons = [
  {
    id: 1,
    code: "VELMORA50",
    title: "50% de descuento en tiendas seleccionadas.",
    type: "PERCENTAGE",
    value: 50,
    active: true,
    storeNames: ["Urban Flow", "Avanto"],
    categories: [],
    minPurchaseAmount: 0,
  },
  {
    id: 2,
    code: "NUEVATIENDA",
    title: "Primer mes gratuito para nuevas tiendas afiliadas.",
    type: "SELLER_BENEFIT",
    value: 0,
    active: true,
    storeNames: [],
    categories: [],
    minPurchaseAmount: 0,
  },
  {
    id: 3,
    code: "MODA10",
    title: "Descuento adicional en ropa y accesorios destacados.",
    type: "PERCENTAGE",
    value: 10,
    active: true,
    storeNames: [],
    categories: ["Moda elegante", "Accesorios", "Ropa urbana"],
    minPurchaseAmount: 80,
  },
];

const normalize = (value) => String(value || "").trim().toLowerCase();

const isCouponEligibleForItem = (coupon, item) => {
  const hasStoreRules = coupon.storeNames.length > 0;
  const hasCategoryRules = coupon.categories.length > 0;

  const storeMatches =
    !hasStoreRules ||
    coupon.storeNames.some((storeName) => normalize(storeName) === normalize(item.storeName));

  const categoryMatches =
    !hasCategoryRules ||
    coupon.categories.some((category) => normalize(category) === normalize(item.category));

  return storeMatches && categoryMatches;
};

const getCouponDiscountAmount = (coupon, eligibleItems) => {
  const eligibleSubtotal = getCartSubtotal(eligibleItems);

  if (coupon.type === "PERCENTAGE") {
    return eligibleSubtotal * (coupon.value / 100);
  }

  if (coupon.type === "FIXED_AMOUNT") {
    return Math.min(coupon.value, eligibleSubtotal);
  }

  return 0;
};

export const getDiscounts = async ({ category = "Todos" } = {}) => {
  const activeDiscounts = discounts.filter((discount) => discount.active);

  if (category === "Todos") {
    return activeDiscounts;
  }

  return activeDiscounts.filter((discount) => discount.category === category);
};

export const getCoupons = async () => coupons.filter((coupon) => coupon.active);

export const validateCoupon = async ({ code, items }) => {
  const couponCode = normalize(code).toUpperCase();
  const subtotal = getCartSubtotal(items);
  const coupon = coupons.find((item) => item.code === couponCode);

  if (!coupon || !coupon.active) {
    return {
      valid: false,
      message: "El cupon no existe o ya no esta activo.",
      subtotal,
      discountAmount: 0,
      total: subtotal,
    };
  }

  if (coupon.type === "SELLER_BENEFIT") {
    return {
      valid: false,
      message: "Este cupon es para tiendas afiliadas y no aplica al checkout.",
      subtotal,
      discountAmount: 0,
      total: subtotal,
    };
  }

  if (subtotal < coupon.minPurchaseAmount) {
    return {
      valid: false,
      message: `Este cupon requiere una compra minima de S/ ${coupon.minPurchaseAmount.toFixed(2)}.`,
      subtotal,
      discountAmount: 0,
      total: subtotal,
    };
  }

  const eligibleItems = items.filter((item) => isCouponEligibleForItem(coupon, item));

  if (eligibleItems.length === 0) {
    return {
      valid: false,
      message: "La tienda o categoria de tus prendas no participa en este cupon.",
      subtotal,
      discountAmount: 0,
      total: subtotal,
    };
  }

  const discountAmount = getCouponDiscountAmount(coupon, eligibleItems);
  const total = Math.max(subtotal - discountAmount, 0);

  return {
    valid: true,
    message: "Cupon aplicado correctamente.",
    coupon,
    eligibleItems,
    subtotal,
    discountAmount,
    total,
  };
};

export const getAutomaticDiscountForItem = (item) => {
  const matchingDiscount = discounts.find(
    (discount) =>
      discount.active &&
      normalize(discount.store) === normalize(item.storeName) &&
      normalize(discount.category) === normalize(item.category)
  );

  if (!matchingDiscount || matchingDiscount.type !== "PERCENTAGE") {
    return 0;
  }

  return parsePrice(item.price) * (matchingDiscount.value / 100) * item.quantity;
};
