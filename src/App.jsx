import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./componentes/Header";
import PromoBar from "./componentes/PromoBar";
import Hero from "./componentes/Hero";
import Store from "./componentes/Store";
import Footer from "./componentes/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Discounts from "./pages/Discounts";
import SellerOnboarding from "./pages/SellerOnboarding";
import SellerDashboard from "./pages/SellerDashboard";
import Account from "./pages/Account";

function Home() {
  return (
    <>
      <PromoBar />
      <Hero />
      <Store />
      <Footer />
    </>
  );
}

function App() {
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

  return (
    <>
      <Header currentUser={currentUser} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register onRegister={handleRegister} />} />
        <Route path="/mi-cuenta" element={<Account currentUser={currentUser} />} />
        <Route path="/descuentos" element={<Discounts />} />
        <Route
          path="/crear-tienda"
          element={<SellerOnboarding onStoreCreated={handleStoreCreated} />}
        />
        <Route
          path="/panel"
          element={<SellerDashboard store={sellerStore} />}
        />
      </Routes>
    </>
  );
}

export default App;
