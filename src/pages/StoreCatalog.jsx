import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaShoppingBag, FaStore } from "react-icons/fa";

import { storesApi } from "../services/api";
import vendeImage from "../imagenes/Vende.jpeg";
import logoVelmora from "../imagenes/Logo_velmora_t.png";

function formatPrice(price) {
  return `S/ ${Number(price || 0).toFixed(2)}`;
}

function normalizeStore(store) {
  return {
    id: store.id,
    name: store.name || "Tienda Velmora",
    category: store.category || "Tienda registrada",
    description:
      store.description ||
      "Tienda creada dentro de Velmora con catalogo propio.",
    logo: store.logoUrl || logoVelmora,
    image: store.bannerUrl || vendeImage,
    products: (store.products || []).map((product) => ({
      id: product.id,
      name: product.name || "Prenda sin nombre",
      category: product.category || "Catalogo",
      price: formatPrice(product.price),
      stock: product.stock || 0,
      image: product.imageUrl || vendeImage,
      description: product.description || "Producto registrado por la tienda.",
      sizes: Array.isArray(product.sizes) && product.sizes.length > 0 ? product.sizes : ["Unica"],
      colors:
        Array.isArray(product.colors) && product.colors.length > 0
          ? product.colors
          : ["Disponible"],
    })),
  };
}

function StoreCatalog({ onAddToCart }) {
  const { storeId } = useParams();
  const [selectedOptions, setSelectedOptions] = useState({});
  const [store, setStore] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let isMounted = true;

    async function loadStore() {
      try {
        setStatus("loading");
        const data = await storesApi.get(storeId);

        if (!isMounted) return;

        setStore(normalizeStore(data.store));
        setStatus("ready");
        storesApi.metric(storeId, "STORE_VIEW").catch(() => {});
      } catch (error) {
        console.error("No se pudo cargar la tienda:", error);

        if (isMounted) {
          setStatus("error");
        }
      }
    }

    loadStore();

    return () => {
      isMounted = false;
    };
  }, [storeId]);

  const handleOptionChange = (productId, field, value) => {
    setSelectedOptions((options) => ({
      ...options,
      [productId]: {
        ...options[productId],
        [field]: value,
      },
    }));
  };

  const handleAddProduct = (product) => {
    const options = selectedOptions[product.id] || {};
    const selectedSize = options.size || product.sizes[0];
    const selectedColor = options.color || product.colors[0];

    onAddToCart({
      ...product,
      storeId: store.id,
      storeName: store.name,
      selectedSize,
      selectedColor,
    });
  };

  if (status === "loading") {
    return (
      <main className="catalog-page">
        <section className="catalog-empty">
          <FaStore />
          <h1>Cargando tienda</h1>
          <p>Estamos consultando el catalogo desde el backend.</p>
        </section>
      </main>
    );
  }

  if (status === "error" || !store) {
    return (
      <main className="catalog-page">
        <section className="catalog-empty">
          <FaStore />
          <h1>Tienda no encontrada</h1>
          <p>La tienda que buscas no existe o ya no esta disponible.</p>
          <Link to="/tiendas">Volver a tiendas</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="catalog-page">
      <section
        className="catalog-hero"
        style={{ backgroundImage: `url(${store.image})` }}
      >
        <div className="catalog-hero-content">
          <img src={store.logo} alt={`Logo de ${store.name}`} />
          <p>{store.category}</p>
          <h1>{store.name}</h1>
          <span>{store.description}</span>
        </div>
      </section>

      <section className="catalog-products-section">
        <div className="catalog-section-title">
          <span></span>
          <h2>Catalogo de prendas</h2>
          <span></span>
        </div>

        {store.products.length === 0 ? (
          <div className="catalog-empty">
            <FaStore />
            <h1>Catalogo en preparacion</h1>
            <p>Esta tienda aun no ha registrado prendas disponibles.</p>
            <Link to="/tiendas">Ver otras tiendas</Link>
          </div>
        ) : (
          <div className="catalog-products-grid">
            {store.products.map((product) => (
              <article className="catalog-product-card" key={product.id}>
                <div className="catalog-product-image">
                  <img src={product.image} alt={product.name} />
                  <span>{product.category}</span>
                </div>

                <div className="catalog-product-info">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <strong>{product.price}</strong>

                  <div className="catalog-product-options">
                    <label>
                      Talla
                      <select
                        value={
                          selectedOptions[product.id]?.size || product.sizes[0]
                        }
                        onChange={(event) =>
                          handleOptionChange(
                            product.id,
                            "size",
                            event.target.value
                          )
                        }
                      >
                        {product.sizes.map((size) => (
                          <option key={size}>{size}</option>
                        ))}
                      </select>
                    </label>

                    <label>
                      Color
                      <select
                        value={
                          selectedOptions[product.id]?.color || product.colors[0]
                        }
                        onChange={(event) =>
                          handleOptionChange(
                            product.id,
                            "color",
                            event.target.value
                          )
                        }
                      >
                        {product.colors.map((color) => (
                          <option key={color}>{color}</option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <button type="button" onClick={() => handleAddProduct(product)}>
                    <FaShoppingBag />
                    Agregar a la cesta
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default StoreCatalog;
