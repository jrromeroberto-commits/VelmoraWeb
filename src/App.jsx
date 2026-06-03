import { useEffect, useState } from "react";
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

function Home() {
  return (
    <>
      <PromoBar />
      <Hero />
      <Store />
    </>
  );
}

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("velmoraUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [sellerStore, setSellerStore] = useState(() => {
    const savedStore = localStorage.getItem("velmoraStore");
    return savedStore ? JSON.parse(savedStore) : null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("velmoraUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("velmoraUser");
    }
  }, [currentUser]);

  useEffect(() => {
    if (sellerStore) {
      localStorage.setItem("velmoraStore", JSON.stringify(sellerStore));
    } else {
      localStorage.removeItem("velmoraStore");
    }
  }, [sellerStore]);

  const handleRegister = (role) => {
    setCurrentUser({
      role,
      name: role === "vendedor" ? "Tienda Velmora" : "Cliente Velmora",
      setupComplete: role === "comprador",
    });
  };

  const handleStoreCreated = (storeData) => {
    setSellerStore(storeData);
    setCurrentUser({
      role: "vendedor",
      name: storeData.storeName || "Tienda Velmora",
      setupComplete: true,
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleAddToCart = (product) => {
    setCartItems((items) => {
      const productInCart = items.find((item) => item.id === product.id);

      if (productInCart) {
        return items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...items, { ...product, quantity: 1 }];
    });

    setCartOpen(true);
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((items) => items.filter((item) => item.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
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
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register onRegister={handleRegister} />} />
        <Route path="/mi-cuenta" element={<Account currentUser={currentUser} />} />
        <Route path="/descuentos" element={<Discounts />} />
        <Route path="/tiendas" element={<Stores sellerStore={sellerStore} />} />
        <Route
          path="/categorias"
          element={<Categories onAddToCart={handleAddToCart} />}
        />
        <Route
          path="/checkout"
          element={
            <Checkout cartItems={cartItems} onClearCart={handleClearCart} />
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
