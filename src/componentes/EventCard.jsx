function EventCard({ imagen, tipo, titular, descripcion, inicio, fin, tienda, onVerMas }) {
    return <div className="border rounded-xl overflow-hidden shadow-sm">

        <div className="relative">

            <img
                src={imagen}
                alt="Portada"
                className="w-full h-52 object-cover"
            />

            <div
                className="absolute top-2 right-2 bg-black text-white rounded-md text-xs"
                style={{ padding: "6px 12px" }}
            >
                {tienda}
            </div>

        </div>

        <div className="w-full" style={{ padding: "8px 8px", margin: "8px"}}>

            <p className="text-[#C9A86A] text-sm font-medium">
                {tipo}
            </p>

            <h3 className="text-xl font-bold mt-2">
                {titular}
            </h3>

            <p className="text-gray-600 mt-3">
                {descripcion}
            </p>

            <div className="flex justify-between items-center">

                <span>
                    📅 {inicio} - {fin}
                </span>

                <button onClick={onVerMas} className="border rounded-lg hover:bg-[#cec7b9]" style={{
                    padding: "6px 12px", marginRight: "5px"
                }}>
                    Ver más →
                </button>

            </div>

        </div>

    </div>
}

export default EventCard