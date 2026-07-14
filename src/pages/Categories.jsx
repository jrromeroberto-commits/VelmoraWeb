import { useState } from "react";
import { Link } from "react-router-dom";

import categoriaHero from "../imagenes/categorias-hero.png";
import categoriaUrbana from "../imagenes/categoria-urbana.png";
import categoriaDeportiva from "../imagenes/categoria-deportiva.png";
import categoriaCalzado from "../imagenes/categoria-calzado.png";
import categoriaAccesorios from "../imagenes/categoria-accesorios.png";
import categoriaElegante from "../imagenes/categoria-elegante.png";

import producto1 from "../imagenes/producto-1.png";
import producto2 from "../imagenes/producto-2.png";
import producto3 from "../imagenes/producto-3.png";
import producto4 from "../imagenes/producto-4.png";

import logoVelmora from "../imagenes/Logo_velmora_t.png";

function Categories({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState("Todas");

  const filterButtons = [
    "Todas",
    "Ropa urbana",
    "Ropa deportiva",
    "Calzado",
    "Accesorios",
    "Moda elegante",
  ];

  const categories = [
    {
      id: 1,
      name: "Ropa urbana",
      image: categoriaUrbana,
      description: "Looks casuales, modernos y cómodos para el día a día.",
    },
    {
      id: 2,
      name: "Ropa deportiva",
      image: categoriaDeportiva,
      description: "Prendas cómodas para entrenar o vestir con estilo sport.",
    },
    {
      id: 3,
      name: "Calzado",
      image: categoriaCalzado,
      description: "Zapatos, sandalias y zapatillas para cada ocasión.",
    },
    {
      id: 4,
      name: "Accesorios",
      image: categoriaAccesorios,
      description: "Bolsos, joyería, lentes y detalles para completar tu outfit.",
    },
    {
      id: 5,
      name: "Moda elegante",
      image: categoriaElegante,
      description: "Prendas sofisticadas para eventos, reuniones y ocasiones especiales.",
    },
  ];

  const trends = [
    {
      id: 1,
      name: "Chaleco de lino",
      price: "S/ 149.90",
      tag: "Nuevo",
      category: "Moda elegante",
      storeId: "avanto",
      storeName: "Avanto",
      image: producto1,
    },
    {
      id: 2,
      name: "Camisa satinada",
      price: "S/ 119.90",
      tag: "Top",
      category: "Moda elegante",
      storeId: "avanto",
      storeName: "Avanto",
      image: producto2,
    },
    {
      id: 3,
      name: "Bolso bucket",
      price: "S/ 169.90",
      tag: "Trend",
      category: "Accesorios",
      storeId: "norda",
      storeName: "Norda",
      image: producto3,
    },
    {
      id: 4,
      name: "Zapatillas urban style",
      price: "S/ 209.90",
      tag: "Sale",
      category: "Ropa urbana",
      storeId: "urban-flow",
      storeName: "Urban Flow",
      image: producto4,
    },
  ];

  const filteredCategories =
    activeCategory === "Todas"
      ? categories
      : categories.filter((category) => category.name === activeCategory);

  const filteredTrends =
    activeCategory === "Todas"
      ? trends
      : trends.filter((product) => product.category === activeCategory);

  return (
    <main className="categories-page">
      <section
        className="categories-hero"
        style={{ backgroundImage: `url(${categoriaHero})` }}
      >
        <div className="categories-hero-card">
          <h1>Compra por categorías</h1>

          <div className="categories-title-line">
            <span></span>
            <img src={logoVelmora} alt="Velmora" />
            <span></span>
          </div>

          <p>
            Explora nuestras categorías y encuentra prendas, accesorios y estilos
            pensados para cada ocasión.
          </p>

          <a href="#categorias" className="categories-main-button">
            <img src={logoVelmora} alt="Velmora" />
            Ver categorías
          </a>
        </div>
      </section>

      <section className="categories-filter-section" id="categorias">
        <div className="categories-filter-buttons">
          {filterButtons.map((button) => (
            <button
              key={button}
              className={activeCategory === button ? "active" : ""}
              onClick={() => setActiveCategory(button)}
            >
              {button}
            </button>
          ))}
        </div>
      </section>

      <section className="categories-grid-section">
        <div className="categories-grid">
          {filteredCategories.map((category) => (
            <article className="category-card" key={category.id}>
              <img src={category.image} alt={category.name} />

              <div className="category-label">
                <img src={logoVelmora} alt="Velmora" />
                <div>
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="categories-trends-section">
        <div className="categories-section-title">
          <span></span>
          <h2>Tendencias de la semana</h2>
          <span></span>
        </div>

        <div className="categories-products-grid">
          {filteredTrends.length > 0 ? (
            filteredTrends.map((product) => (
              <article className="category-product-card" key={product.id}>
                <div className="category-product-image">
                  <img src={product.image} alt={product.name} />

                  <span>{product.tag}</span>

                  <button type="button" className="category-heart">
                    ♡
                  </button>
                </div>

                <div className="category-product-info">
                  <h3>{product.name}</h3>
                  <p>{product.price}</p>
                  <button
                    type="button"
                    className="category-cart-button"
                    onClick={() => onAddToCart(product)}
                  >
                    Agregar al carrito
                  </button>
                </div>
              </article>
            ))
          ) : (
            <p className="categories-empty-message">
              Aún no hay tendencias registradas para esta categoría.
            </p>
          )}
        </div>

        <div className="categories-more-button-box">
          <Link to="/descuentos" className="categories-more-button">
            <img src={logoVelmora} alt="Velmora" />
            Ver más tendencias
          </Link>
        </div>
      </section>

      <section className="categories-final-banner">
        <div className="categories-final-logo">
          <img src={logoVelmora} alt="Velmora" />
        </div>

        <div>
          <h2>Tu estilo, tu esencia</h2>
          <p>Descubre piezas únicas que realzan tu belleza natural.</p>
        </div>

        <Link to="/tiendas">
          <img src={logoVelmora} alt="Velmora" />
          Descubrir nueva colección
        </Link>
      </section>
    </main>
  );
}

export default Categories;
