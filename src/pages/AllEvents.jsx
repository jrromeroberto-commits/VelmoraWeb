import { useEffect, useState } from "react";
import EventCard from "../componentes/EventCard";
import EventCardLocal from "../componentes/EventCardLocal";

function AllEvents() {

    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        const datos =
            JSON.parse(localStorage.getItem("eventos")) || [];

        setEventos(datos);
    }, []);

    return <div>
        <h1 className="text-3xl" style={{ margin: "10px" }}>Todos los eventos</h1>
        <div className="flex items-center gap-2" style={{marginLeft:"10px", marginBottom:"10px"}}>
            <div className="w-26 h-0.5 bg-[#C9A86A]"></div>
            <div className="w-2 h-2 rounded-full bg-[#C9A86A]"></div>
            <div className="w-26 h-0.5 bg-[#C9A86A]"></div>
        </div>

        <div className="grid grid-cols-3 gap-8" style={{ marginRight: "8px", marginLeft: "8px" }}>
            {eventos.map((evento) => (
                <EventCardLocal
                    key={evento.id}
                    titulo={evento.titulo}
                    descripcion={evento.descripcion}
                    fechaInicio={evento.fechaInicio}
                    fechaFin={evento.fechaFin}
                    imagen={evento.imagen}
                />
            ))}
        </div>
    </div>


}

export default AllEvents;