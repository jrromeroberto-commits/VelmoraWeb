import { Link } from "react-router-dom";
import { useState } from "react";

import vendeImage from "../imagenes/Vende.jpeg";
import logoVelmora from "../imagenes/Logo_velmora_t.png";
import { baseStores } from "../data/storesData";

function Stores({ sellerStores = [] }) {
  const [activeCategory, setActiveCategory] = useState("Todas");

  const registeredStores = sellerStores.map((sellerStore, index) => ({
        id: sellerStore.id || `registered-store-${index}`,
        name: sellerStore.storeName || "Tienda Velmora",
        category: sellerStore.category || "Tienda registrada",
        description:
          sellerStore.description ||
          "Tienda creada dentro de Velmora con catalogo propio.",
        logo: sellerStore.logoPreview || logoVelmora,
        image: vendeImage,
        type:
          sellerStore.storeType === "externa"
            ? "Web externa"
            : "Tienda Velmora",
        products: sellerStore.products?.length || 0,
        link: sellerStore.website || `/tiendas/${sellerStore.id || `registered-store-${index}`}`,
        external: sellerStore.storeType === "externa" && sellerStore.website,
        featured: true,
      }));

  const stores = baseStores.map((store) => ({
    ...store,
    products: store.products.length,
  }));

  const allStores = [...registeredStores, ...stores];
  const categories = ["Todas", ...new Set(allStores.map((store) => store.category))];
  const visibleStores =
    activeCategory === "Todas"
      ? allStores
      : allStores.filter((store) => store.category === activeCategory);

  return (
    <main className="stores-page">
      <section className="stores-hero">
        <div>
          <p>Galeria de tiendas</p>
          <h1>Tiendas registradas en Velmora</h1>
          <span>
            Explora marcas afiliadas, tiendas destacadas y espacios creados
            dentro de la plataforma.
          </span>
        </div>

        <div className="stores-hero-summary">
          <strong>{allStores.length}</strong>
          <span>Tiendas activas</span>
        </div>
      </section>

      <section className="stores-filter-bar" aria-label="Categorias de tiendas">
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
      </section>

      <section className="stores-grid-section">
        <div className="stores-grid">
          {visibleStores.map((store) => (
            <article className="store-list-card" key={store.id}>
              <div className="store-list-cover">
                <img src={store.image} alt={store.name} />
                {store.featured && <span>Destacada</span>}
              </div>

              <div className="store-list-info">
                <div className="store-list-heading">
                  <img src={store.logo} alt={`Logo de ${store.name}`} />
                  <div>
                    <h2>{store.name}</h2>
                    <p>{store.category}</p>
                  </div>
                </div>

                <p className="store-list-description">{store.description}</p>

                <div className="store-list-meta">
                  <span>{store.type}</span>
                  <span>{store.products} productos</span>
                </div>

                {store.external ? (
                  <a href={store.link} target="_blank" rel="noreferrer">
                    Visitar tienda
                  </a>
                ) : (
                  <Link to={store.link}>Ver catalogo</Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Stores;
