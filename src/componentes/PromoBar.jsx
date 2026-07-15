import { useEffect, useState } from "react";

import { discountsApi } from "../services/api";

function PromoBar() {
  const fallbackMessages = [
    "APROVECHA DESCUENTOS EXCLUSIVOS DE LAS TIENDAS EN VELMORA",
    "AFILIATE AHORA PARA PUBLICAR TU TIENDA EN VELMORA",
    "DESCUBRE NUEVAS MARCAS Y PROMOCIONES SOLO EN VELMORA",
  ];
  const [messages, setMessages] = useState(fallbackMessages);

  useEffect(() => {
    let isMounted = true;

    async function loadPromos() {
      try {
        const data = await discountsApi.list();
        const backendMessages = (data.discounts || []).map(
          (discount) =>
            `${discount.title} EN ${discount.storeName}: ${discount.description}`
        );

        if (isMounted && backendMessages.length > 0) {
          setMessages(backendMessages);
        }
      } catch (error) {
        console.error("No se pudieron cargar promociones:", error);
      }
    }

    loadPromos();

    return () => {
      isMounted = false;
    };
  }, []);

  const trackMessages = [...messages, ...messages];

  return (
    <div className="promo-bar">
      <div className="promo-track">
        {trackMessages.map((message, index) => (
          <span key={`${message}-${index}`}>{message}</span>
        ))}
      </div>
    </div>
  );
}

export default PromoBar;
