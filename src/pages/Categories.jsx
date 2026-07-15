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
import {
  categoriesApi,
  favoritesApi,
  getAuthToken,
  productsApi,
} from "../services/api";

const fallbackImages = [producto1, producto2, producto3, producto4];

const baseCategories = [
  {
    id: "ropa-urbana",
    name: "Ropa urbana",
    image: categoriaUrbana,
    description: "Looks casuales, modernos y comodos para el dia a dia.",
  },
  {
    id: "ropa-deportiva",
    name: "Ropa deportiva",
    image: categoriaDeportiva,
    description: "Prendas comodas para entrenar o vestir con estilo sport.",
  },
  {
    id: "calzado",
    name: "Calzado",
    image: categoriaCalzado,
    description: "Zapatos, sandalias y zapatillas para cada ocasion.",
  },
  {
    id: "accesorios",
    name: "Accesorios",
    image: categoriaAccesorios,
    description: "Bolsos, joyeria, lentes y detalles para completar tu outfit.",
  },
  {
    id: "moda-elegante",
    name: "Moda elegante",
    image: categoriaElegante,
    description: "Prendas sofisticadas para reuniones y ocasiones especiales.",
  },
];

const formatPrice = (price) => `S/ ${Number(price || 0).toFixed(2)}`;

const normalizeProduct = (product, index) => ({
  id: product.id,
  name: product.name,
  price: formatPrice(product.price),
  priceValue: Number(product.price || 0),
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
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [trends, setTrends] = useState([]);
  const [categoryStats, setCategoryStats] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  const priceParams = useMemo(() => {
    const params = {};

    if (minPrice !== "") params.minPrice = minPrice;
    if (maxPrice !== "") params.maxPrice = maxPrice;

    return params;
  }, [maxPrice, minPrice]);

  const isPriceRangeInvalid =
    minPrice !== "" &&
    maxPrice !== "" &&
    Number(minPrice) > Number(maxPrice);

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      if (isPriceRangeInvalid) {
        setTrends([]);
        setStatus("error");
        setMessage("El precio minimo no puede ser mayor que el maximo.");
        return;
      }

      try {
        setStatus("loading");
        setMessage("");

        const params = {
          ...priceParams,
          ...(activeCategory !== "Todas" ? { category: activeCategory } : {}),
        };
        const data = await productsApi.list(params);

        if (isMounted) {
          setTrends((data.products || []).map(normalizeProduct));
          setStatus("ready");
        }
      } catch (error) {
        console.error("No se pudieron cargar productos:", error);

        if (isMounted) {
          setStatus("error");
          setMessage(error.message || "No se pudieron cargar productos.");
        }
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, [activeCategory, isPriceRangeInvalid, priceParams]);

  useEffect(() => {
    let isMounted = true;

    async function loadCategories() {
      if (isPriceRangeInvalid) return;

      try {
        const data = await categoriesApi.list(priceParams);

        if (isMounted) {
          setCategoryStats(data.categories || []);
          setTotalProducts(data.totalProducts || 0);
        }
      } catch (error) {
        console.error("No se pudieron cargar categorias:", error);
      }
    }

    loadCategories();

    return () => {
      isMounted = false;
    };
  }, [isPriceRangeInvalid, priceParams]);

  useEffect(() => {
    let isMounted = true;

    async function loadFavorites() {
      if (!getAuthToken()) {
        setFavoriteIds([]);
        return;
      }

      try {
        const data = await favoritesApi.list();

        if (isMounted) {
          setFavoriteIds((data.favorites || []).map((favorite) => favorite.productId));
        }
      } catch (error) {
        console.error("No se pudieron cargar favoritos:", error);
      }
    }

    loadFavorites();

    return () => {
      isMounted = false;
    };
  }, []);

  const categoryCountByName = useMemo(() => {
    const counts = new Map();

    for (const category of categoryStats) {
      counts.set(category.name, category.productCount);
    }

    return counts;
  }, [categoryStats]);

  const categoryFilters = useMemo(() => {
    const baseNames = baseCategories.map((category) => category.name);
    const backendNames = categoryStats.map((category) => category.name);

    return ["Todas", ...new Set([...baseNames, ...backendNames])];
  }, [categoryStats]);

  const displayCategories = useMemo(() => {
    const metadata = new Map(baseCategories.map((category) => [category.name, category]));

    for (const category of categoryStats) {
      if (!metadata.has(category.name)) {
        metadata.set(category.name, {
          id: category.name,
          name: category.name,
          image: fallbackImages[metadata.size % fallbackImages.length],
          description: "Categoria creada a partir de productos registrados.",
        });
      }
    }

    const categories = [...metadata.values()];

    return activeCategory === "Todas"
      ? categories
      : categories.filter((category) => category.name === activeCategory);
  }, [activeCategory, categoryStats]);

  const clearPriceFilter = () => {
    setMinPrice("");
    setMaxPrice("");
  };

  const toggleFavorite = async (productId) => {
    setMessage("");

    if (!getAuthToken()) {
      setMessage("Inicia sesion para guardar favoritos.");
      return;
    }

    const isFavorite = favoriteIds.includes(productId);

    try {
      if (isFavorite) {
        await favoritesApi.remove(productId);
        setFavoriteIds((ids) => ids.filter((id) => id !== productId));
      } else {
        await favoritesApi.add(productId);
        setFavoriteIds((ids) => [...new Set([...ids, productId])]);
      }
    } catch (error) {
      setMessage(error.message || "No se pudo actualizar favoritos.");
    }
  };

  const getCategoryCount = (category) =>
    category === "Todas" ? totalProducts : categoryCountByName.get(category) || 0;

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
          {categoryFilters.map((button) => (
            <button
              type="button"
              key={button}
              className={activeCategory === button ? "active" : ""}
              onClick={() => setActiveCategory(button)}
            >
              <span>{button}</span>
              <small>{getCategoryCount(button)}</small>
            </button>
          ))}
        </div>

        <div className="categories-price-filter">
          <label>
            Precio minimo
            <input
              type="number"
              min="0"
              placeholder="S/ 0"
              value={minPrice}
              onChange={(event) => setMinPrice(event.target.value)}
            />
          </label>

          <label>
            Precio maximo
            <input
              type="number"
              min="0"
              placeholder="S/ 250"
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
            />
          </label>

          <button type="button" onClick={clearPriceFilter}>
            Limpiar
          </button>
        </div>

        {message && <p className="categories-feedback">{message}</p>}
      </section>

      <section className="categories-grid-section">
        <div className="categories-grid">
          {displayCategories.map((category) => (
            <article className="category-card" key={category.id}>
              <img src={category.image} alt={category.name} />

              <div className="category-label">
                <img src={logoVelmora} alt="Velmora" />
                <div>
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                  <span className="category-count">
                    {getCategoryCount(category.name)} productos
                  </span>
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
          ) : trends.length > 0 ? (
            trends.map((product) => {
              const isFavorite = favoriteIds.includes(product.id);

              return (
                <article className="category-product-card" key={product.id}>
                  <div className="category-product-image">
                    <img src={product.image} alt={product.name} />

                    <span>{product.tag}</span>

                    <button
                      type="button"
                      className={`category-heart ${isFavorite ? "active" : ""}`}
                      aria-label={
                        isFavorite
                          ? "Quitar producto de favoritos"
                          : "Agregar producto a favoritos"
                      }
                      onClick={() => toggleFavorite(product.id)}
                    >
                      {isFavorite ? "\u2665" : "\u2661"}
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
              );
            })
          ) : (
            <p className="categories-empty-message">
              {status === "error"
                ? message || "No se pudieron cargar productos desde el backend."
                : "Aun no hay productos registrados para esta categoria o rango de precio."}
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
