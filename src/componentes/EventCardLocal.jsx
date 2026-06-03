function EventCardLocal({ titulo, descripcion, fechaInicio, fechaFin, imagen }) {
    return <div className="flex border rounded-xl overflow-hidden shadow-sm items-center" style={{padding:"8px"}}>
            
            <img
                src={imagen}
                alt={titulo}
                className="w-60 h-48 object-cover"
            />

            <div className="" style={{padding:"10px"}}>
                <p className="text-[#C9A86A]">EVENTO</p>

                <h3 className="font-bold text-xl">
                    {titulo}
                </h3>

                <p>{descripcion}</p>

                <p>
                    {"Inicio: "}{fechaInicio}
                </p>
                <p>
                    {"Fin: "}{fechaFin}
                </p>
            </div>

        </div>
    
}

export default EventCardLocal