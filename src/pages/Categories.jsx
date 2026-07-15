import { useEffect, useMemo, useState } from "react";
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
import { productsApi } from "../services/api";

const fallbackImages = [producto1, producto2, producto3, producto4];

const formatPrice = (price) => `S/ ${Number(price || 0).toFixed(2)}`;

const normalizeProduct = (product, index) => ({
  id: product.id,
  name: product.name,
  price: formatPrice(product.price),
  tag: product.stock > 0 ? "Disponible" : "Agotado",
  category: product.category || "Catalogo",
  image: product.imageUrl || fallbackImages[index % fallbackImages.length],
  storeId: product.store?.id,
  storeName: product.store?.name,
  selectedSize: Array.isArray(product.sizes) ? product.sizes[0] : undefined,
  selectedColor: Array.isArray(product.colors) ? product.colors[0] : undefined,
});

function Categories({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [trends, setTrends] = useState([]);
  const [status, setStatus] = useState("loading");

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
      description: "Looks casuales, modernos y comodos para el dia a dia.",
    },
    {
      id: 2,
      name: "Ropa deportiva",
      image: categoriaDeportiva,
      description: "Prendas comodas para entrenar o vestir con estilo sport.",
    },
    {
      id: 3,
      name: "Calzado",
      image: categoriaCalzado,
      description: "Zapatos, sandalias y zapatillas para cada ocasion.",
    },
    {
      id: 4,
      name: "Accesorios",
      image: categoriaAccesorios,
      description: "Bolsos, joyeria, lentes y detalles para completar tu outfit.",
    },
    {
      id: 5,
      name: "Moda elegante",
      image: categoriaElegante,
      description: "Prendas sofisticadas para reuniones y ocasiones especiales.",
    },
  ];

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      try {
        setStatus("loading");
        const data = await productsApi.list();

        if (isMounted) {
          setTrends((data.products || []).map(normalizeProduct));
          setStatus("ready");
        }
      } catch (error) {
        console.error("No se pudieron cargar productos:", error);

        if (isMounted) {
          setStatus("error");
        }
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredCategories =
    activeCategory === "Todas"
      ? categories
      : categories.filter((category) => category.name === activeCategory);

  const filteredTrends = useMemo(
    () =>
      activeCategory === "Todas"
        ? trends
        : trends.filter((product) => product.category === activeCategory),
    [activeCategory, trends]
  );

  return (
    <main className="categories-page">
      <section
        className="categories-hero"
        style={{ backgroundImage: `url(${categoriaHero})` }}
      >
        <div className="categories-hero-card">
          <h1>Compra por categorias</h1>

          <div className="categories-title-line">
            <span></span>
            <img src={logoVelmora} alt="Velmora" />
            <span></span>
          </div>

          <p>
            Explora categorias y productos cargados desde el backend de Velmora.
          </p>

          <a href="#categorias" className="categories-main-button">
            <img src={logoVelmora} alt="Velmora" />
            Ver categorias
          </a>
        </div>
      </section>

      <section className="categories-filter-section" id="categorias">
        <div className="categories-filter-buttons">
          {filterButtons.map((button) => (
            <button
              type="button"
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
          <h2>Tendencias desde el backend</h2>
          <span></span>
        </div>

        <div className="categories-products-grid">
          {status === "loading" ? (
            <p className="categories-empty-message">
              Cargando productos desde el backend...
            </p>
          ) : filteredTrends.length > 0 ? (
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
                  {product.storeName && <span>{product.storeName}</span>}
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
              {status === "error"
                ? "No se pudieron cargar productos desde el backend."
                : "Aun no hay productos registrados para esta categoria."}
            </p>
          )}
        </div>

        <div className="categories-more-button-box">
          <Link to="/descuentos" className="categories-more-button">
            <img src={logoVelmora} alt="Velmora" />
            Ver descuentos
          </Link>
        </div>
      </section>

      <section className="categories-final-banner">
        <div className="categories-final-logo">
          <img src={logoVelmora} alt="Velmora" />
        </div>

        <div>
          <h2>Tu estilo, tu esencia</h2>
          <p>Descubre piezas cargadas desde las tiendas registradas.</p>
        </div>

        <Link to="/tiendas">
          <img src={logoVelmora} alt="Velmora" />
          Descubrir tiendas
        </Link>
      </section>
    </main>
  );
}

export default Categories;
