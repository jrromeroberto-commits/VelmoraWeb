import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import avantoLogo from "../imagenes/Logo_Avanto.png";
import nordaLogo from "../imagenes/Logo_nor.png";
import maisoneLogo from "../imagenes/Logo_M.png";
import logoVelmora from "../imagenes/Logo_velmora_t.png";
import { homeApi } from "../services/api";

function Store() {
  const fallbackStores = [
    {
      id: "avanto",
      logo: avantoLogo,
      name: "AVANTO",
      description: "La mas destacada",
    },
    {
      id: "norda",
      logo: nordaLogo,
      name: "NORDA",
      description: "Mejores precios",
    },
    {
      id: "maisone",
      logo: maisoneLogo,
      name: "MAISONE",
      description: "Mejores descuentos",
    },
  ];
  const [stores, setStores] = useState(fallbackStores);

  useEffect(() => {
    let isMounted = true;

    async function loadFeaturedStores() {
      try {
        const data = await homeApi.get();
        const featuredStores = (data.featuredStores || []).slice(0, 3);

        if (isMounted && featuredStores.length > 0) {
          setStores(
            featuredStores.map((store) => ({
              id: store.id,
              logo: store.logoUrl || logoVelmora,
              name: store.name,
              description: store.category || "Tienda destacada",
            }))
          );
        }
      } catch (error) {
        console.error("No se pudieron cargar tiendas destacadas:", error);
      }
    }

    loadFeaturedStores();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="store-section" id="tiendas">
      <div className="store-title">
        <span></span>
        <h2>Tiendas del momento</h2>
        <span></span>
      </div>

      <p className="store-subtitle">
        Descubre las tiendas mas destacadas por calidad y precio.
      </p>

      <div className="store-grid">
        {stores.map((store) => (
          <article className="store-card-featured" key={store.id}>
            <img
              src={store.logo}
              alt={`Logo de ${store.name}`}
              className="store-logo-img"
            />
            <h3>{store.name}</h3>
            <div className="store-line"></div>
            <p>{store.description}</p>
            <Link to={`/tiendas/${store.id}`} className="store-button">
              Mira aqui
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Store;
