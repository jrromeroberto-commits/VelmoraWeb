import { useState } from "react";

function CreateEvent() {
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [imagenes, setImagenes] = useState([]);


    return <main
        className="w-full flex justify-center"
        style={{ margin: "10px" }}
    >
        <div
            className="border rounded-xl"
            style={{
                width: "1200px",
                padding: "30px"
            }}
        >

            <h1
                className="text-4xl font-bold"
                style={{ marginTop: "20px" }}
            >
                PUBLICAR EVENTO
            </h1>

            <div
                className="flex items-center gap-2"
                style={{ marginTop: "10px", marginBottom: "30px" }}
            >
                <div className="w-20 h-[2px] bg-[#C9A86A]"></div>
                <div className="w-2 h-2 rounded-full bg-[#C9A86A]"></div>
                <div className="w-20 h-[2px] bg-[#C9A86A]"></div>
            </div>

            <div className="grid grid-cols-2 gap-10">

                {/* Columna izquierda */}
                <div>

                    <label className="font-medium">
                        Título del evento
                    </label>

                    <input
                        type="text"
                        placeholder="Escribe el título de tu evento"
                        className="w-full border rounded-lg"
                        style={{ padding: "12px", marginTop: "8px" }}
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />

                    <div style={{ marginTop: "25px" }}>
                        <label className="font-medium">
                            Descripción del evento
                        </label>

                        <textarea
                            placeholder="Describe tu evento..."
                            className="w-full border rounded-lg"
                            style={{
                                padding: "12px",
                                marginTop: "8px",
                                height: "140px"
                            }}
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </div>

                    <div
                        className="grid grid-cols-2 gap-4"
                        style={{ marginTop: "25px" }}
                    >
                        <div>
                            <label>Fecha de inicio</label>

                            <input
                                type="date"
                                className="w-full border rounded-lg"
                                style={{
                                    padding: "12px",
                                    marginTop: "8px"
                                }}
                                value={fechaInicio}
                                onChange={(e) => setFechaInicio(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>Fecha de finalización</label>

                            <input
                                type="date"
                                className="w-full border rounded-lg"
                                style={{
                                    padding: "12px",
                                    marginTop: "8px"
                                }}
                                value={fechaFin}
                                onChange={(e) => setFechaFin(e.target.value)}
                            />
                        </div>
                    </div>

                </div>

                {/* Columna derecha */}
                <div>

                    <label className="font-medium">
                        Imágenes del evento
                    </label>

                    <div
                        className="border rounded-lg text-center"
                        style={{
                            padding: "60px",
                            marginTop: "8px"
                        }}
                    >
                        ☁️

                        <p style={{ marginTop: "10px" }}>
                            Sube imágenes de tu evento
                        </p>

                        <input
                            type="file"
                            id="imagenes"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => setImagenes([...e.target.files])}
                        />

                        <label
                            htmlFor="imagenes"
                            className="border rounded-lg cursor-pointer inline-block"
                            style={{
                                padding: "10px 20px",
                                marginTop: "15px"
                            }}
                        >
                            SELECCIONAR IMÁGENES
                        </label>

                        {imagenes.map((img, index) => (
                            <p key={index}>{img.name}</p>
                        ))}
                    </div>

                </div>

            </div>

            <div
                className="flex justify-end gap-4"
                style={{ marginTop: "30px" }}
            >
                <button
                    className="border rounded-lg"
                    style={{ padding: "10px 25px" }}
                >
                    CANCELAR
                </button>

                <button
                    className="bg-black text-white rounded-lg"
                    style={{ padding: "10px 25px" }}
                    onClick={() => {
                        console.log(titulo);
                        console.log(descripcion);
                        console.log(fechaInicio);
                        console.log(fechaFin);
                        console.log(imagenes);
                    }}
                >
                    PUBLICAR EVENTO ✨
                </button>
            </div>

        </div>

    </main>
}

export default CreateEvent