export const parsePrice = (price) => {
  if (typeof price === "number") {
    return price;
  }

  if (typeof price !== "string") {
    return 0;
  }

  const normalized = price.replace("S/", "").replace(",", ".").trim();
  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : 0;
};

export const formatSoles = (amount) => `S/ ${amount.toFixed(2)}`;

export const getCartSubtotal = (items) =>
  items.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0);
