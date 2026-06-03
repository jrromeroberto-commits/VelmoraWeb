import { Link } from "react-router-dom";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import logoVelmora from "../imagenes/Logo_velmora_t.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <section className="footer-brand">
          <img src={logoVelmora} alt="Logo Velmora" className="footer-logo" />

          <div className="footer-divider">
            <span></span>
            <div>✦</div>
            <span></span>
          </div>

          <p>
            Galería virtual de todo tipo de ropa. Explora tiendas, marcas,
            catálogos y promociones en un solo lugar
          </p>

          <div className="footer-socials">
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>

            <a href="#" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>

            <a href="#" aria-label="Email">
              <MdOutlineMailOutline />
            </a>
          </div>
        </section>

        <section className="footer-column">
          <h3>Explorar</h3>
          <Link to="/">Inicio</Link>
          <Link to="/tiendas">Tiendas</Link>
          <a href="#categorias">Categorías</a>
          <Link to="/descuentos">Descuentos</Link>
        </section>

        <section className="footer-column">
          <h3>Para tiendas</h3>
          <Link to="/registro">Únete</Link>
          <Link to="/descuentos">Descuentos</Link>
        </section>

        <section className="footer-column">
          <h3>Contactos</h3>
          <a href="#">WhatsApp</a>
          <a href="#">Email</a>
          <a href="#">Instagram</a>
          <a href="#">Soporte</a>
        </section>
      </div>

      <div className="footer-bottom-line"></div>

      <p className="footer-copy">
        © 2026 Velmora. Todos los derechos reservados
      </p>
    </footer>
  );
}

export default Footer;
