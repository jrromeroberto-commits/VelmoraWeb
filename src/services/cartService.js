const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const buildCartPayload = (cartItems, extraData = {}) => ({
  ...extraData,
  items: cartItems.map((item) => ({
    productId: Number(item.id),
    quantity: item.quantity,
  })),
});

const requestJson = async (path, options) => {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || data.message || "No se pudo procesar la solicitud");
  }

  return data;
};

export const getCheckoutSummary = (cartItems) =>
  requestJson("/checkout/summary", {
    method: "POST",
    body: JSON.stringify(buildCartPayload(cartItems)),
  });

export const createOrder = (cartItems, orderData) =>
  requestJson("/orders", {
    method: "POST",
    body: JSON.stringify(buildCartPayload(cartItems, orderData)),
  });
