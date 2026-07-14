import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCategories } from "../hooks/useCategories";
import { useFavorites } from "../hooks/useFavorites";
import { useTrendingProducts } from "../hooks/useTrendingProducts";

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

const categoryImages = {
  categoriaUrbana,
  categoriaDeportiva,
  categoriaCalzado,
  categoriaAccesorios,
  categoriaElegante,
};

const productImages = {
  producto1,
  producto2,
  producto3,
  producto4,
};

const fallbackCategories = [
  {
    id: 1,
    name: "Ropa urbana",
    imageKey: "categoriaUrbana",
    description: "Looks casuales, modernos y cómodos para el día a día.",
    productsCount: 1,
  },
  {
    id: 2,
    name: "Ropa deportiva",
    imageKey: "categoriaDeportiva",
    description: "Prendas cómodas para entrenar o vestir con estilo sport.",
    productsCount: 0,
  },
  {
    id: 3,
    name: "Calzado",
    imageKey: "categoriaCalzado",
    description: "Zapatos, sandalias y zapatillas para cada ocasión.",
    productsCount: 0,
  },
  {
    id: 4,
    name: "Accesorios",
    imageKey: "categoriaAccesorios",
    description: "Bolsos, joyería, lentes y detalles para completar tu outfit.",
    productsCount: 1,
  },
  {
    id: 5,
    name: "Moda elegante",
    imageKey: "categoriaElegante",
    description: "Prendas sofisticadas para eventos, reuniones y ocasiones especiales.",
    productsCount: 2,
  },
];

const fallbackTrends = [
  {
    id: 1,
    name: "Chaleco de lino",
    price: "S/ 149.90",
    tag: "Nuevo",
    category: "Moda elegante",
    categoryId: 5,
    imageKey: "producto1",
    rawPrice: 149.9,
  },
  {
    id: 2,
    name: "Camisa satinada",
    price: "S/ 119.90",
    tag: "Top",
    category: "Moda elegante",
    categoryId: 5,
    imageKey: "producto2",
    rawPrice: 119.9,
  },
  {
    id: 3,
    name: "Bolso bucket",
    price: "S/ 169.90",
    tag: "Trend",
    category: "Accesorios",
    categoryId: 4,
    imageKey: "producto3",
    rawPrice: 169.9,
  },
  {
    id: 4,
    name: "Zapatillas urban style",
    price: "S/ 209.90",
    tag: "Sale",
    category: "Ropa urbana",
    categoryId: 1,
    imageKey: "producto4",
    rawPrice: 209.9,
  },
];

function Categories({ onAddToCart }) {
  const [activeCategoryId, setActiveCategoryId] = useState("Todas");
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("newest");
  const { categories, loading: categoriesLoading } = useCategories(fallbackCategories);
  const { favoriteIds, toggleFavorite } = useFavorites();
  const selectedCategoryId =
    activeCategoryId === "Todas" ? undefined : Number(activeCategoryId);
  const productFilters = useMemo(
    () => ({
      categoryId: selectedCategoryId,
      search,
      minPrice,
      maxPrice,
      sort,
    }),
    [selectedCategoryId, search, minPrice, maxPrice, sort]
  );
  const { products: trends, loading: trendsLoading } = useTrendingProducts(
    productFilters,
    fallbackTrends
  );

  const filterButtons = ["Todas", ...categories.map((category) => category.name)];

  const filteredCategories =
    activeCategoryId === "Todas"
      ? categories
      : categories.filter((category) => category.id === selectedCategoryId);

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
              className={
                (button === "Todas" && activeCategoryId === "Todas") ||
                categories.find(
                  (category) =>
                    category.name === button && String(category.id) === String(activeCategoryId)
                )
                  ? "active"
                  : ""
              }
              onClick={() => {
                const category = categories.find((item) => item.name === button);
                setActiveCategoryId(category ? String(category.id) : "Todas");
              }}
            >
              {button}
            </button>
          ))}
        </div>

        <div className="categories-search-panel">
          <label>
            Buscar
            <input
              type="search"
              placeholder="Camisa, bolso, zapatillas..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <label>
            Precio mínimo
            <input
              type="number"
              min="0"
              placeholder="S/ 0"
              value={minPrice}
              onChange={(event) => setMinPrice(event.target.value)}
            />
          </label>

          <label>
            Precio máximo
            <input
              type="number"
              min="0"
              placeholder="S/ 250"
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
            />
          </label>

          <label>
            Ordenar
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="newest">Más recientes</option>
              <option value="price_asc">Menor precio</option>
              <option value="price_desc">Mayor precio</option>
              <option value="name_asc">Nombre A-Z</option>
            </select>
          </label>
        </div>
      </section>

      <section className="categories-grid-section">
        <div className="categories-grid">
          {filteredCategories.map((category) => (
            <article className="category-card" key={category.id}>
              <img
                src={categoryImages[category.imageKey] || categoriaHero}
                alt={category.name}
              />

              <div className="category-label">
                <img src={logoVelmora} alt="Velmora" />
                <div>
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                  <strong>{category.productsCount || 0} productos disponibles</strong>
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
          {trends.length > 0 ? (
            trends.map((product) => (
              <article className="category-product-card" key={product.id}>
                <div className="category-product-image">
                  <img
                    src={productImages[product.imageKey] || producto1}
                    alt={product.name}
                  />

                  <span>{product.tag}</span>

                  <button
                    type="button"
                    className={`category-heart ${
                      favoriteIds.includes(product.id) ? "active" : ""
                    }`}
                    aria-label={
                      favoriteIds.includes(product.id)
                        ? "Quitar de favoritos"
                        : "Agregar a favoritos"
                    }
                    onClick={() => toggleFavorite(product.id)}
                  >
                    {favoriteIds.includes(product.id) ? "♥" : "♡"}
                  </button>
                </div>

                <div className="category-product-info">
                  <h3>{product.name}</h3>
                  <p>{product.price}</p>
                  <button
                    type="button"
                    className="category-cart-button"
                    onClick={() =>
                      onAddToCart({
                        ...product,
                        image: productImages[product.imageKey] || producto1,
                      })
                    }
                  >
                    Agregar al carrito
                  </button>
                </div>
              </article>
            ))
          ) : (
            <p className="categories-empty-message">
              {categoriesLoading || trendsLoading
                ? "Cargando categorias y tendencias..."
                : "Aún no hay tendencias registradas para esta categoría."}
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
