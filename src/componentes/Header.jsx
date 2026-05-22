import logoVelmora from "../imagenes/Logo_velmora_t.png";

function Header() {
  return (
    <header className="header">
      <a href="/" className="header-logo">
        <img src={logoVelmora} alt="Logo Velmora" />
      </a>

      <nav className="header-nav">
        <a href="/">Inicio</a>
        <a href="#descuentos">Descuentos exclusivos</a>
        <a href="#categorias">Categorías</a>
        <a href="#casa">De la casa</a>
      </nav>

      <div className="header-actions">
        <a href="#unete">Únete</a>
        <a href="#login">Iniciar sesión</a>

        <button className="header-cart" aria-label="Carrito de compras">
          🛍️
        </button>
      </div>
    </header>
  );
}

export default Header;