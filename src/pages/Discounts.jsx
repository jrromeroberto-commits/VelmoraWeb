import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTag,
  FaClock,
  FaStore,
  FaTicketAlt,
} from "react-icons/fa";

import Footer from "../components/Footer";

import descuento1 from "../imagenes/descuento1.jpg";
import descuento2 from "../imagenes/descuento2.jpg";
import descuento3 from "../imagenes/descuento3.jpg";
import descuento4 from "../imagenes/descuento4.jpg";
import descuento5 from "../imagenes/descuento5.jpg";
import descuento6 from "../imagenes/descuento6.jpg";

function Discounts() {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const categories = [
    "Todos",
    "Polos",
    "Pantalones",
    "Vestidos",
    "Calzado",
    "Accesorios",
    "Deportivas",
  ];

  const discounts = [
    {
      id: 1,
      store: "Urban Flow",
      discount: "50% OFF",
      description: "Ropa urbana seleccionada",
      category: "Polos",
      date: "Válido hasta el 30 de junio",
      image: descuento1,
    },
    {
      id: 2,
      store: "Nova Fit",
      discount: "35% OFF",
      description: "Prendas deportivas para entrenamiento",
      category: "Deportivas",
      date: "Oferta por tiempo limitado",
      image: descuento2,
    },
    {
      id: 3,
      store: "Luna Wear",
      discount: "40% OFF",
      description: "Outfits diarios y modernos",
      category: "Vestidos",
      date: "Válido hasta agotar stock",
      image: descuento3,
    },
    {
      id: 4,
      store: "Maisoné",
      discount: "25% OFF",
      description: "Calzado elegante de temporada",
      category: "Calzado",
      date: "Solo esta semana",
      image: descuento4,
    },
    {
      id: 5,
      store: "Norda",
      discount: "2x1",
      description: "Accesorios seleccionados",
      category: "Accesorios",
      date: "Promoción exclusiva online",
      image: descuento5,
    },
    {
      id: 6,
      store: "Avanto",
      discount: "30% OFF",
      description: "Pantalones de nueva colección",
      category: "Pantalones",
      date: "Válido hasta el domingo",
      image: descuento6,
    },
  ];

  const filteredDiscounts =
    activeCategory === "Todos"
      ? discounts
      : discounts.filter((item) => item.category === activeCategory);

  return (
    <>
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
            {categories.map((category) => (
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
          <div className="discount-grid">
            {filteredDiscounts.map((item) => (
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

                  <a href="#" className="discount-card-button">
                    Ver tienda
                  </a>
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
            <article className="coupon-card">
              <FaTicketAlt className="coupon-icon" />
              <h3>VELMORA50</h3>
              <p>Obtén 50% de descuento en tiendas seleccionadas.</p>
              <button>Copiar cupón</button>
            </article>

            <article className="coupon-card">
              <FaTicketAlt className="coupon-icon" />
              <h3>NUEVATIENDA</h3>
              <p>Primer mes gratuito para nuevas tiendas afiliadas.</p>
              <button>Copiar cupón</button>
            </article>

            <article className="coupon-card">
              <FaTicketAlt className="coupon-icon" />
              <h3>MODA10</h3>
              <p>Descuento adicional en ropa y accesorios destacados.</p>
              <button>Copiar cupón</button>
            </article>
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

      <Footer />
    </>
  );
}

export default Discounts;