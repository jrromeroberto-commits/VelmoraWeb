import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaClock, FaStore, FaTag, FaTicketAlt } from "react-icons/fa";

import descuento1 from "../imagenes/descuento1.png";
import descuento2 from "../imagenes/descuento2.png";
import descuento3 from "../imagenes/descuento3.png";
import descuento4 from "../imagenes/descuento4.png";
import descuento5 from "../imagenes/descuento5.png";
import descuento6 from "../imagenes/descuento6.png";
import { discountsApi } from "../services/api";

const fallbackImages = [
  descuento1,
  descuento2,
  descuento3,
  descuento4,
  descuento5,
  descuento6,
];

function normalizeDiscount(item, index) {
  return {
    id: item.id,
    store: item.storeName,
    discount: item.title,
    description: item.description,
    category: item.category,
    date: item.validUntil || "Promocion activa",
    image: item.imageUrl || fallbackImages[index % fallbackImages.length],
    storeUrl: item.storeUrl,
  };
}

function Discounts() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [discounts, setDiscounts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let isMounted = true;

    async function loadDiscounts() {
      try {
        setStatus("loading");
        const data = await discountsApi.list();

        if (isMounted) {
          setDiscounts((data.discounts || []).map(normalizeDiscount));
          setStatus("ready");
        }
      } catch (error) {
        console.error("No se pudieron cargar descuentos:", error);

        if (isMounted) {
          setStatus("error");
        }
      }
    }

    loadDiscounts();

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = useMemo(
    () => ["Todos", ...new Set(discounts.map((item) => item.category))],
    [discounts]
  );

  const filteredDiscounts =
    activeCategory === "Todos"
      ? discounts
      : discounts.filter((item) => item.category === activeCategory);

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
            Ofertas cargadas desde el backend para que las promociones no sean
            datos estaticos del frontend.
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
          {categories.map((category) => (
            <button
              type="button"
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
        <div className="discount-grid">
          {status === "loading" ? (
            <p className="categories-empty-message">
              Cargando descuentos desde el backend...
            </p>
          ) : filteredDiscounts.length > 0 ? (
            filteredDiscounts.map((item) => (
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

                  {item.storeUrl ? (
                    <a href={item.storeUrl} className="discount-card-button">
                      Ver tienda
                    </a>
                  ) : (
                    <Link to="/tiendas" className="discount-card-button">
                      Ver tiendas
                    </Link>
                  )}
                </div>
              </article>
            ))
          ) : (
            <p className="categories-empty-message">
              {status === "error"
                ? "No se pudieron cargar descuentos desde el backend."
                : "Aun no hay descuentos registrados."}
            </p>
          )}
        </div>
      </section>

      <section className="coupon-section">
        <div className="discount-section-title">
          <span></span>
          <h2>Cupones exclusivos</h2>
          <span></span>
        </div>

        <div className="coupon-grid">
          {discounts.slice(0, 3).map((item) => (
            <article className="coupon-card" key={`coupon-${item.id}`}>
              <FaTicketAlt className="coupon-icon" />
              <h3>{item.discount.replace(/\s+/g, "").toUpperCase()}</h3>
              <p>{item.description}</p>
              <button type="button">Copiar cupon</button>
            </article>
          ))}
        </div>
      </section>

      <section className="seller-discount-banner">
        <div>
          <p>Para tiendas</p>
          <h2>Publica tus descuentos en Velmora</h2>
          <span>
            Llega a mas clientes mostrando promociones dentro de la plataforma.
          </span>
        </div>

        <Link to="/registro">Unirme como vendedor</Link>
      </section>
    </main>
  );
}

export default Discounts;
