import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import EventCard from "../componentes/EventCard";
import eventosHero from "../imagenes/Eventos.png";
import evento1 from "../imagenes/EventoDestacado1.png";
import evento2 from "../imagenes/EventoDestacado2.png";
import evento3 from "../imagenes/EventoDestacado3.png";
import { eventsApi } from "../services/api";

const fallbackImages = [evento1, evento2, evento3];

function formatDate(value) {
  return new Intl.DateTimeFormat("es-PE", {
    day: "2-digit",
    month: "short",
  }).format(new Date(value));
}

function normalizeEvent(event, index) {
  return {
    id: event.id,
    imagen: event.imageUrl || fallbackImages[index % fallbackImages.length],
    tipo: event.type || "EVENTO",
    titular: event.title,
    descripcion: event.description,
    inicio: formatDate(event.startsAt),
    fin: formatDate(event.endsAt),
    tienda: event.storeName || "Velmora",
  };
}

function Events() {
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    async function loadEvents() {
      try {
        setStatus("loading");
        const data = await eventsApi.list({ featured: true });

        if (isMounted) {
          setEvents((data.events || []).map(normalizeEvent));
          setStatus("ready");
        }
      } catch (error) {
        console.error("No se pudieron cargar eventos:", error);

        if (isMounted) {
          setStatus("error");
        }
      }
    }

    loadEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="mt-40 pt-40">
      <div className="flex gap-12 w-full m-10 px-6 py-8 items-center justify-center ">
        <div>
          <img
            src={eventosHero}
            alt="Eventos"
            className="w-130 rounded-2xl mt-4"
            style={{ margin: "10px" }}
          />
        </div>
        <div>
          <h1 className="text-5xl font-bold m-4">Eventos</h1>
          <div className="flex items-center gap-2">
            <div className="w-22 h-0.5 bg-[#C9A86A]"></div>
            <div className="w-2 h-2 rounded-full bg-[#C9A86A]"></div>
            <div className="w-22 h-0.5 bg-[#C9A86A]"></div>
          </div>
          <p style={{ margin: "10pt" }}>
            Descubre eventos y promociones cargados desde el backend.
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/eventos/verificar-tienda")}
              className="bg-[#C9A86A] text-white rounded-lg hover:bg-[#966f27]"
              style={{ padding: "10px", fontSize: "15px" }}
            >
              PUBLICAR EVENTO
            </button>
          </div>
        </div>
      </div>

      <section className="w-full" style={{ margin: "10px", marginRight: "10px" }}>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold" style={{ marginLeft: "10px" }}>
              EVENTOS DESTACADOS
            </h2>

            <div className="flex items-center gap-2" style={{ marginLeft: "10px" }}>
              <div className="w-29 h-0.5 bg-[#C9A86A]"></div>
              <div className="w-2 h-2 rounded-full bg-[#C9A86A]"></div>
              <div className="w-29 h-0.5 bg-[#C9A86A]"></div>
            </div>
          </div>

          <button
            className="text-[#C9A86A] hover:text-amber-300"
            style={{ marginRight: "10px" }}
            onClick={() => navigate("/eventos/all-events")}
          >
            Ver todos →
          </button>
        </div>

        <div className="grid grid-cols-3 gap-8" style={{ margin: "7pt" }}>
          {status === "loading" ? (
            <p>Cargando eventos desde el backend...</p>
          ) : events.length > 0 ? (
            events.map((event) => (
              <EventCard
                key={event.id}
                {...event}
                onVerMas={() => setEventoSeleccionado(event)}
              />
            ))
          ) : (
            <p>
              {status === "error"
                ? "No se pudieron cargar eventos."
                : "No hay eventos destacados registrados."}
            </p>
          )}
        </div>
      </section>

      {eventoSeleccionado && (
        <div
          className="fixed inset-0 flex items-center justify-center border-black"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="bg-white rounded-xl" style={{ padding: "20px", width: "500px" }}>
            <h2 className="text-2xl font-bold">{eventoSeleccionado.titular}</h2>
            <p>{eventoSeleccionado.descripcion}</p>
            <p>
              Fecha: {eventoSeleccionado.inicio} - {eventoSeleccionado.fin}
            </p>

            <button
              onClick={() => setEventoSeleccionado(null)}
              className="border rounded-lg"
              style={{ padding: "8px 16px", marginTop: "10px" }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Events;
