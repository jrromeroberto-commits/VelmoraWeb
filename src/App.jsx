import { Routes, Route } from "react-router-dom";
import Header from "./componentes/Header";
import PromoBar from "./componentes/PromoBar";
import Hero from "./componentes/Hero";
import Store from "./componentes/Store";
import Footer from "./componentes/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Discounts from "./pages/Discounts";

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
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/descuentos" element={<Discounts />} />
      </Routes>
    </>
  );
}

export default App;