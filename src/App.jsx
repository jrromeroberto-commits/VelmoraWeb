import { Routes, Route } from "react-router-dom";
import Header from "./componentes/Header";
import PromoBar from "./componentes/PromoBar";
import Hero from "./componentes/Hero";
import Store from "./componentes/Store";
import Login from "./pages/Login";
import Register from "./pages/Register";

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
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;