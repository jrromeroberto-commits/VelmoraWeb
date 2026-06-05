import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaShoppingBag, FaStore } from "react-icons/fa";

import { baseStores } from "../data/storesData";
import vendeImage from "../imagenes/Vende.jpeg";
import logoVelmora from "../imagenes/Logo_velmora_t.png";

function normalizeRegisteredStore(sellerStore, index) {
  const id = String(sellerStore.id || `registered-store-${index}`);

  return {
    id,
    name: sellerStore.storeName || "Tienda Velmora",
    category: sellerStore.category || "Tienda registrada",
    description:
      sellerStore.description ||
      "Tienda creada dentro de Velmora con catalogo propio.",
    logo: sellerStore.logoPreview || logoVelmora,
    image: vendeImage,
    products: (sellerStore.products || []).map((product, productIndex) => ({
      id: `${id}-product-${product.id || productIndex}`,
      name: product.name || "Prenda sin nombre",
      category: product.category || "Catalogo",
      price: product.price || "S/ 0.00",
      stock: product.stock || "0",
      image: product.imagePreview || vendeImage,
      description: product.description || "Producto registrado por la tienda.",
      sizes: Array.isArray(product.sizes) ? product.sizes : ["Unica"],
      colors: Array.isArray(product.colors) ? product.colors : ["Disponible"],
    })),
  };
}

function StoreCatalog({ sellerStores = [], onAddToCart }) {
  const { storeId } = useParams();
  const [selectedOptions, setSelectedOptions] = useState({});

  const stores = useMemo(
    () => [
      ...sellerStores.map((store, index) => normalizeRegisteredStore(store, index)),
      ...baseStores,
    ],
    [sellerStores]
  );

  const store = stores.find((item) => String(item.id) === String(storeId));

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

  if (!store) {
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
