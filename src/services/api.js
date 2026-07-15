export const API_URL =
  import.meta.env.VITE_API_URL || "https://velmora-backend-1-84cm.onrender.com";

const TOKEN_KEY = "velmoraToken";

export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function saveAuthToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

async function request(path, { method = "GET", body, token, auth = false } = {}) {
  const headers = {};

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  const requestToken = token || (auth ? getAuthToken() : null);

  if (requestToken) {
    headers.Authorization = `Bearer ${requestToken}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof data === "object" && data?.message
        ? data.message
        : "No se pudo completar la solicitud.";
    throw new Error(message);
  }

  return data;
}

export const authApi = {
  register: (data) =>
    request("/api/auth/register", {
      method: "POST",
      body: data,
    }),
  login: (data) =>
    request("/api/auth/login", {
      method: "POST",
      body: data,
    }),
  me: (token) => request("/api/auth/me", { token }),
};

export const homeApi = {
  get: () => request("/api/home"),
};

export const productsApi = {
  list: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/api/products${query ? `?${query}` : ""}`);
  },
};

export const storesApi = {
  list: () => request("/api/stores"),
  get: (id) => request(`/api/stores/${id}`),
  create: (data, token) =>
    request("/api/stores", {
      method: "POST",
      body: data,
      token,
    }),
  update: (id, data, token) =>
    request(`/api/stores/${id}`, {
      method: "PUT",
      body: data,
      token,
    }),
  createProduct: (storeId, data, token) =>
    request(`/api/stores/${storeId}/products`, {
      method: "POST",
      body: data,
      token,
    }),
  metric: (storeId, type) =>
    request(`/api/stores/${storeId}/metrics`, {
      method: "POST",
      body: { type },
    }),
};

export const sellerApi = {
  dashboard: (token) => request("/api/seller/dashboard", { token }),
};

export const ordersApi = {
  create: (data, token) =>
    request("/api/orders", {
      method: "POST",
      body: data,
      token,
    }),
  mine: (token) => request("/api/orders/my", { token }),
};

export const eventsApi = {
  list: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/api/events${query ? `?${query}` : ""}`);
  },
  create: (data, token) =>
    request("/api/events", {
      method: "POST",
      body: data,
      token,
    }),
};

export const discountsApi = {
  list: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/api/discounts${query ? `?${query}` : ""}`);
  },
};
