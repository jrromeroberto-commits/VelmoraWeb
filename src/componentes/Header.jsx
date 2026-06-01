import { useState } from "react";
import { Link } from "react-router-dom";
import logoVelmora from "../imagenes/Logo_velmora_t.png";

function Header({ currentUser, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isBuyer = currentUser?.role === "comprador";
  const isSeller = currentUser?.role === "vendedor";
  const sellerPanelPath = currentUser?.setupComplete ? "/panel" : "/crear-tienda";

  return (
    <header className="header">
      <Link to="/" className="header-logo" onClick={closeMenu}>
        <img src={logoVelmora} alt="Logo Velmora" />
      </Link>

      <nav className={`header-nav ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={closeMenu}>Inicio</Link>
        <Link to="/descuentos" onClick={closeMenu}>
          Descuentos exclusivos
        </Link>
        <Link to="/categorias">Categorías</Link>
        <a href="#anuncios" onClick={closeMenu}>Anuncios</a>

        {isSeller && (
          <Link to={sellerPanelPath} onClick={closeMenu}>
            Panel
          </Link>
        )}

        {currentUser ? (
          <Link to="/mi-cuenta" onClick={closeMenu} className="mobile-only">
            Mi cuenta
          </Link>
        ) : (
          <>
            <Link to="/registro" onClick={closeMenu} className="mobile-only">
              Unete
            </Link>
            <Link to="/login" onClick={closeMenu} className="mobile-only">
              Iniciar sesion
            </Link>
          </>
        )}
      </nav>

      <div className="header-actions">
        {currentUser ? (
          <>
            {isSeller && <Link to={sellerPanelPath}>Panel</Link>}
            <Link to="/mi-cuenta">Mi cuenta</Link>
            <button type="button" className="header-logout" onClick={onLogout}>
              Salir
            </button>
          </>
        ) : (
          <>
            <Link to="/registro">Unete</Link>
            <Link to="/login">Iniciar sesion</Link>
          </>
        )}

        {(!currentUser || isBuyer) && (
          <button className="header-cart" aria-label="Carrito de compras">
            🛍️
          </button>
        )}

        <button
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menu"
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
