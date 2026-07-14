import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTag,
  FaClock,
  FaStore,
  FaTicketAlt,
} from "react-icons/fa";
import useDiscounts from "../hooks/useDiscounts";
import { discountCategories } from "../services/discountService";

function Discounts() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const { discounts, coupons, loading, error } = useDiscounts(activeCategory);

  return (
    <main className="discounts-page">
        <section className="discount-hero">
          <div className="discount-hero-content">
            <p className="discount-label">Promociones especiales</p>

            <h1>
              Descuentos <br />
              <span>exclusivos</span>
            </h1>

            <p>
              Encuentra ofertas especiales de tus tiendas favoritas. Aprovecha
              promociones por tiempo limitado en ropa, calzado y accesorios.
            </p>

            <a href="#ofertas" className="discount-hero-button">
              Ver ofertas
            </a>
          </div>
        </section>

        <section className="discount-filters" id="ofertas">
          <div className="discount-section-title">
            <span></span>
            <h2>Ofertas destacadas</h2>
            <span></span>
          </div>

          <div className="discount-filter-buttons">
            {discountCategories.map((category) => (
              <button
                key={category}
                className={activeCategory === category ? "active" : ""}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className="discount-grid-section">
          {loading && <p className="categories-empty-message">Cargando ofertas...</p>}
          {error && <p className="categories-empty-message">{error}</p>}

          <div className="discount-grid">
            {discounts.map((item) => (
              <article className="discount-card" key={item.id}>
                <div className="discount-image">
                  <img src={item.image} alt={item.store} />

                  <div className="discount-badge">
                    <FaTag />
                    <span>{item.discount}</span>
                  </div>
                </div>

                <div className="discount-info">
                  <h3>{item.store}</h3>
                  <p>{item.description}</p>

                  <div className="discount-meta">
                    <FaClock />
                    <span>{item.date}</span>
                  </div>

                  <div className="discount-meta">
                    <FaStore />
                    <span>{item.category}</span>
                  </div>

                  <Link to="/tiendas" className="discount-card-button">
                    Ver tienda
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="coupon-section">
          <div className="discount-section-title">
            <span></span>
            <h2>Cupones exclusivos</h2>
            <span></span>
          </div>

          <div className="coupon-grid">
            {coupons.map((coupon) => (
              <article className="coupon-card" key={coupon.id}>
                <FaTicketAlt className="coupon-icon" />
                <h3>{coupon.code}</h3>
                <p>{coupon.title}</p>
                <button
                  type="button"
                  onClick={() => navigator.clipboard?.writeText(coupon.code)}
                >
                  Copiar cupon
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="seller-discount-banner">
          <div>
            <p>Para tiendas</p>
            <h2>Publica tus descuentos en Velmora</h2>
            <span>
              Llega a más clientes mostrando tus promociones dentro de nuestra
              galería virtual de moda.
            </span>
          </div>

          <Link to="/registro">Unirme como vendedor</Link>
        </section>
    </main>
  );
}

export default Discounts;
