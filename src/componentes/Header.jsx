import { useState } from "react";
import { Link } from "react-router-dom";
import logoVelmora from "../imagenes/Logo_velmora_t.png";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <Link to="/" className="header-logo" onClick={closeMenu}>
        <img src={logoVelmora} alt="Logo Velmora" />
      </Link>

      <nav className={`header-nav ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={closeMenu}>Inicio</Link>
        <a href="#descuentos" onClick={closeMenu}>Descuentos exclusivos</a>
        <a href="#categorias" onClick={closeMenu}>Categorías</a>
        <a href="#casa" onClick={closeMenu}>De la casa</a>
        <Link to="/registro" onClick={closeMenu}>Únete</Link>
        <Link to="/login" onClick={closeMenu}>Iniciar sesión</Link>
      </nav>

      <div className="header-actions">
        <Link to="/registro">Únete</Link>
        <Link to="/login">Iniciar sesión</Link>

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