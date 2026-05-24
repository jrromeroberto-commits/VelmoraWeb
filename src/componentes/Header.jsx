import { useState } from "react";
import logoVelmora from "../imagenes/Logo_velmora_t.png";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <a href="/" className="header-logo">
        <img src={logoVelmora} alt="Logo Velmora" />
      </a>

      <nav className={`header-nav ${menuOpen ? "active" : ""}`}>
        <a href="/" onClick={closeMenu}>Inicio</a>
        <a href="#descuentos" onClick={closeMenu}>Descuentos exclusivos</a>
        <a href="#categorias" onClick={closeMenu}>Categorías</a>
        <a href="#casa" onClick={closeMenu}>De la casa</a>
      </nav>

      <div className="header-actions">
        <a href="#unete">Únete</a>
        <a href="#login">Iniciar sesión</a>

        <button className="header-cart" aria-label="Carrito de compras">
          🛍️
        </button>

        <button 
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
          >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}

export default Header;