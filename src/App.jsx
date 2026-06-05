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
import StoreCatalog from "./pages/StoreCatalog";

function Home() {
  return (
    <>
      <PromoBar />
      <Hero />
      <Store />
    </>
  );
}

const getSavedUsers = () => JSON.parse(localStorage.getItem("velmoraUsers")) || [];

const getSessionUser = (user) => {
  const sessionUser = { ...user };
  delete sessionUser.password;
  return sessionUser;
};

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

  const [sellerStores, setSellerStores] = useState(() => {
    const savedStores = localStorage.getItem("velmoraStores");

    if (savedStores) {
      return JSON.parse(savedStores);
    }

    const savedStore = localStorage.getItem("velmoraStore");
    return savedStore ? [JSON.parse(savedStore)] : [];
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

  useEffect(() => {
    localStorage.setItem("velmoraStores", JSON.stringify(sellerStores));
  }, [sellerStores]);

  const handleRegister = (userData) => {
    const savedUsers = getSavedUsers();
    const emailExists = savedUsers.some(
      (user) => user.email.toLowerCase() === userData.email.toLowerCase()
    );

    if (emailExists) {
      return {
        success: false,
        message: "Ya existe una cuenta registrada con ese correo.",
      };
    }

    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role,
      setupComplete: userData.role === "comprador",
    };

    localStorage.setItem("velmoraUsers", JSON.stringify([...savedUsers, newUser]));
    setCurrentUser(getSessionUser(newUser));

    return { success: true };
  };

  const handleLogin = ({ email, password }) => {
    const savedUsers = getSavedUsers();
    const foundUser = savedUsers.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password
    );

    if (!foundUser) {
      return {
        success: false,
        message: "Correo o contrasena incorrectos.",
      };
    }

    setCurrentUser(getSessionUser(foundUser));
    return { success: true, user: foundUser };
  };

  const handleStoreCreated = (storeData) => {
    const newStore = {
      ...storeData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };

    setSellerStore(newStore);
    setSellerStores((stores) => [newStore, ...stores]);
    setCurrentUser((user) => ({
      ...user,
      name: newStore.storeName || "Tienda Velmora",
      role: "vendedor",
      setupComplete: true,
    }));

    if (currentUser?.email) {
      const savedUsers = getSavedUsers();
      const updatedUsers = savedUsers.map((user) =>
        user.email === currentUser.email
          ? {
              ...user,
              name: newStore.storeName || user.name,
              setupComplete: true,
            }
          : user
      );

      localStorage.setItem("velmoraUsers", JSON.stringify(updatedUsers));
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
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
