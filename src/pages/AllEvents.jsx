import { useEffect, useState } from "react";

import EventCardLocal from "../componentes/EventCardLocal";
import evento1 from "../imagenes/EventoDestacado1.png";
import evento2 from "../imagenes/EventoDestacado2.png";
import evento3 from "../imagenes/EventoDestacado3.png";
import { eventsApi } from "../services/api";

const fallbackImages = [evento1, evento2, evento3];

function AllEvents() {
  const [eventos, setEventos] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let isMounted = true;

    async function loadEvents() {
      try {
        setStatus("loading");
        const data = await eventsApi.list();

        if (isMounted) {
          setEventos(
            (data.events || []).map((event, index) => ({
              id: event.id,
              titulo: event.title,
              descripcion: event.description,
              fechaInicio: event.startsAt?.slice(0, 10),
              fechaFin: event.endsAt?.slice(0, 10),
              imagen: event.imageUrl || fallbackImages[index % fallbackImages.length],
            }))
          );
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
    <div>
      <h1 className="text-3xl" style={{ margin: "10px" }}>
        Todos los eventos
      </h1>
      <div
        className="flex items-center gap-2"
        style={{ marginLeft: "10px", marginBottom: "10px" }}
      >
        <div className="w-26 h-0.5 bg-[#C9A86A]"></div>
        <div className="w-2 h-2 rounded-full bg-[#C9A86A]"></div>
        <div className="w-26 h-0.5 bg-[#C9A86A]"></div>
      </div>

      <div
        className="grid grid-cols-3 gap-8"
        style={{ marginRight: "8px", marginLeft: "8px" }}
      >
        {status === "loading" ? (
          <p>Cargando eventos desde el backend...</p>
        ) : eventos.length > 0 ? (
          eventos.map((evento) => (
            <EventCardLocal
              key={evento.id}
              titulo={evento.titulo}
              descripcion={evento.descripcion}
              fechaInicio={evento.fechaInicio}
              fechaFin={evento.fechaFin}
              imagen={evento.imagen}
            />
          ))
        ) : (
          <p>
            {status === "error"
              ? "No se pudieron cargar eventos."
              : "No hay eventos publicados."}
          </p>
        )}
      </div>
    </div>
  );
}

export default AllEvents;
