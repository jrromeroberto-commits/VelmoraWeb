import { useCallback, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./componentes/Header";
import PromoBar from "./componentes/PromoBar";
import Hero from "./componentes/hero";
import Store from "./componentes/Store";
import Footer from "./componentes/Footer";
import CartDrawer from "./componentes/CartDrawer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Discounts from "./pages/Discounts";
import SellerOnboarding from "./pages/SellerOnboarding";
import SellerDashboard from "./pages/SellerDashboard";
import Account from "./pages/Account";
import Categories from "./pages/Categories";
import Events from "./pages/Events";
import SellerVerification from "./pages/SellerVerification";
import CreateEvent from "./pages/CreateEvent";
import AllEvents from "./pages/AllEvents";
import Checkout from "./pages/Checkout";
import Stores from "./pages/Stores";
import StoreCatalog from "./pages/StoreCatalog";
import {
  authApi,
  getAuthToken,
  ordersApi,
  saveAuthToken,
  sellerApi,
  storesApi,
} from "./services/api";

function Home() {
  return (
    <>
      <PromoBar />
      <Hero />
      <Store />
    </>
  );
}

const normalizeUser = (user, setupComplete = true) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role === "SELLER" ? "vendedor" : "comprador",
  backendRole: user.role,
  setupComplete: user.role === "SELLER" ? setupComplete : true,
});

const priceToNumber = (price) => {
  if (typeof price === "number") return price;
  return Number(String(price || "0").replace("S/", "").trim()) || 0;
};

const mapDashboardStore = (dashboardData) => ({
  id: dashboardData.store.id,
  storeName: dashboardData.store.name,
  description: dashboardData.store.description,
  category: dashboardData.store.category,
  storeType: dashboardData.store.storeType,
  logoPreview: dashboardData.store.logoUrl,
  products: dashboardData.recentProducts || dashboardData.store.products || [],
  stats: dashboardData.stats,
});

const mapStoreForState = (store) => ({
  id: store.id,
  storeName: store.name,
  description: store.description,
  category: store.category,
  storeType: store.storeType,
  logoPreview: store.logoUrl,
  website: store.website,
  instagram: store.instagram,
  phone: store.phone,
  products: store.products || [],
  stats: store.stats,
});

const normalizeStorePayload = (storeData) => ({
  name: storeData.storeName,
  description: storeData.description,
  category: storeData.category,
  storeType: storeData.storeType,
  logoUrl: storeData.logoPreview,
  website: storeData.website,
  instagram: storeData.instagram,
  phone: storeData.phone,
});

const normalizeProductPayload = (product) => ({
  name: product.name,
  category: product.category,
  price: priceToNumber(product.price),
  stock: Number(product.stock) || 0,
  description: product.description,
  imageUrl: product.imagePreview,
  sizes: Array.isArray(product.sizes) ? product.sizes : [],
  colors: Array.isArray(product.colors) ? product.colors : [],
});

const toApiRole = (role) => (role === "vendedor" ? "SELLER" : "BUYER");

const getMessage = (error) => error?.message || "No se pudo conectar con el servidor.";

const isSellerNotReadyError = (error) =>
  String(error?.message || "").toLowerCase().includes("aun no tiene una tienda");

const savedJson = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
};

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [authToken, setAuthToken] = useState(() => getAuthToken());
  const [currentUser, setCurrentUser] = useState(() => savedJson("velmoraUser"));
  const [sellerStore, setSellerStore] = useState(null);
  const [sellerStores, setSellerStores] = useState([]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("velmoraUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("velmoraUser");
    }
  }, [currentUser]);

  useEffect(() => {
    saveAuthToken(authToken);
  }, [authToken]);

  const loadStores = useCallback(async () => {
    try {
      const data = await storesApi.list();
      setSellerStores(data.stores || []);
    } catch (error) {
      console.error("No se pudieron cargar tiendas:", error);
    }
  }, []);

  const loadSellerDashboard = useCallback(async (token = authToken) => {
    if (!token) return;

    try {
      const dashboard = await sellerApi.dashboard(token);
      setSellerStore(mapDashboardStore(dashboard));
      setCurrentUser((user) =>
        user ? { ...user, setupComplete: true } : user
      );
    } catch (error) {
      if (isSellerNotReadyError(error)) {
        setSellerStore(null);
        setCurrentUser((user) =>
          user?.role === "vendedor" ? { ...user, setupComplete: false } : user
        );
        return;
      }

      console.error("No se pudo cargar dashboard:", error);
    }
  }, [authToken]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadStores();
    }, 0);

    return () => clearTimeout(timer);
  }, [loadStores]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentUser?.role === "vendedor" && authToken) {
        loadSellerDashboard(authToken);
      } else {
        setSellerStore(null);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [authToken, currentUser?.role, loadSellerDashboard]);

  const handleRegister = async (userData) => {
    try {
      const result = await authApi.register({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: toApiRole(userData.role),
      });
      const user = normalizeUser(result.user, result.user.role !== "SELLER");

      setAuthToken(result.token);
      setCurrentUser(user);

      return { success: true, user };
    } catch (error) {
      return {
        success: false,
        message: getMessage(error),
      };
    }
  };

  const handleLogin = async ({ email, password }) => {
    try {
      const result = await authApi.login({ email, password });
      const user = normalizeUser(result.user);

      setAuthToken(result.token);
      setCurrentUser(user);

      if (user.role === "vendedor") {
        await loadSellerDashboard(result.token);
      }

      return { success: true, user };
    } catch (error) {
      return {
        success: false,
        message: getMessage(error),
      };
    }
  };

  const handleStoreCreated = async (storeData) => {
    if (!authToken) {
      return {
        success: false,
        message: "Debes iniciar sesion como vendedor.",
      };
    }

    try {
      const created = await storesApi.create(normalizeStorePayload(storeData), authToken);

      for (const product of storeData.products || []) {
        await storesApi.createProduct(
          created.store.id,
          normalizeProductPayload(product),
          authToken
        );
      }

      const fullStore = await storesApi.get(created.store.id);
      const stateStore = mapStoreForState(fullStore.store);

      setSellerStore(stateStore);
      setCurrentUser((user) =>
        user
          ? {
              ...user,
              name: created.store.name || user.name,
              role: "vendedor",
              setupComplete: true,
            }
          : user
      );
      await loadStores();
      await loadSellerDashboard(authToken);

      return { success: true, store: stateStore };
    } catch (error) {
      return {
        success: false,
        message: getMessage(error),
      };
    }
  };

  const handleLogout = () => {
    setAuthToken(null);
    setCurrentUser(null);
    setSellerStore(null);
  };

  const handleAddToCart = (product) => {
    const cartKey = [
      product.id,
      product.selectedSize || "",
      product.selectedColor || "",
      product.storeId || "",
    ].join("-");

    setCartItems((items) => {
      const productInCart = items.find((item) => item.cartKey === cartKey);

      if (productInCart) {
        return items.map((item) =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...items, { ...product, cartKey, quantity: 1 }];
    });

    setCartOpen(true);
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((items) => items.filter((item) => item.cartKey !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleCheckout = async () => {
    if (!authToken) {
      return {
        success: false,
        message: "Debes iniciar sesion para confirmar la compra.",
      };
    }

    try {
      await ordersApi.create(
        {
          items: cartItems.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            selectedSize: item.selectedSize,
            selectedColor: item.selectedColor,
          })),
        },
        authToken
      );
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: getMessage(error),
      };
    }
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <Header
        currentUser={currentUser}
        onLogout={handleLogout}
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
      />

      <CartDrawer
        cartItems={cartItems}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onClearCart={handleClearCart}
        onRemoveFromCart={handleRemoveFromCart}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/registro" element={<Register onRegister={handleRegister} />} />
        <Route path="/mi-cuenta" element={<Account currentUser={currentUser} />} />
        <Route path="/descuentos" element={<Discounts />} />
        <Route path="/tiendas" element={<Stores sellerStores={sellerStores} />} />
        <Route
          path="/tiendas/:storeId"
          element={
            <StoreCatalog
              sellerStores={sellerStores}
              onAddToCart={handleAddToCart}
            />
          }
        />
        <Route
          path="/categorias"
          element={<Categories onAddToCart={handleAddToCart} />}
        />
        <Route
          path="/checkout"
          element={
            <Checkout
              cartItems={cartItems}
              onClearCart={handleClearCart}
              onCreateOrder={handleCheckout}
            />
          }
        />
        <Route
          path="/crear-tienda"
          element={<SellerOnboarding onStoreCreated={handleStoreCreated} />}
        />
        <Route
          path="/panel"
          element={<SellerDashboard store={sellerStore} />}
        />
        <Route path="/eventos" element={<Events/>}/>
        <Route path="/eventos/verificar-tienda" element={<SellerVerification/>}/>
        <Route path="/eventos/verificar-tienda/crear-evento" element={<CreateEvent/>}/>
        <Route path="/eventos/all-events" element={<AllEvents/>}/>
      </Routes>

      <Footer />
    </>
  );
}

export default App;
