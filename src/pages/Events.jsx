import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EventCard from "../componentes/EventCard"

function Events() {

    const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
    const navigate = useNavigate();

    return <main className="mt-40 pt-40">
        <div className="flex gap-12 w-full m-10 px-6 py-8 items-center justify-center ">
            <div>
                <img src="/src/imagenes/Eventos.png" alt="Eventos" className="w-130 rounded-2xl mt-4" style={{
                    margin: "10px"
                }} />
            </div>
            <div>
                <h1 className="text-5xl font-bold m-4">Eventos</h1>
                <div className="flex items-center gap-2 my-4">
                    <div className="w-22 h-[2px] bg-[#C9A86A]"></div>
                    <div className="w-2 h-2 rounded-full bg-[#C9A86A]"></div>
                    <div className="w-22 h-[2px] bg-[#C9A86A]"></div>
                </div>
                <p style={{ margin: "10pt" }}>
                    Descubre los eventos y promociones exclusivas
                    de nuestras tiendas aliadas.
                </p>

                <div className="flex gap-4">
                    <button onClick={() => navigate("/eventos/verificar-tienda")} className="bg-[#C9A86A] text-white rounded-lg hover:bg-[#966f27]" style={{
                        padding: "10px",
                        fontSize: "15px"
                    }}>
                        🧾 PUBLICAR EVENTO
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
                        <div className="w-29 h-[2px] bg-[#C9A86A]"></div>
                        <div className="w-2 h-2 rounded-full bg-[#C9A86A]"></div>
                        <div className="w-29 h-[2px] bg-[#C9A86A]"></div>
                    </div>

                </div>

                <button className="text-[#C9A86A]" style={{ marginRight: "10px" }}>
                    Ver todos →
                </button>

            </div>
            <div className="grid grid-cols-3 gap-8" style={{ margin: "7pt" }}>
                <EventCard
                    imagen="/src/imagenes/EventoDestacado1.png"
                    tipo="PROMOCIÓN"
                    titular="30% OFF en ropa deportiva"
                    descripcion="Aprovecha 30% de descuento en toda nuestra línea deportiva."
                    inicio="10 Jun"
                    fin="16 Jun"
                    tienda="NOVA"

                    onVerMas={() =>
                        setEventoSeleccionado({
                            titular: "30% OFF en ropa deportiva",
                            descripcion: "Aprovecha 30% de descuento ahora o nunca en nuestra ropa deportiva solo hasta la fecha límite o acabar stock. Inclye marcas seleccionadas como Nike y Adiddas.",
                            inicio: "10 Jun",
                            fin: "16 Jun"
                        })}
                />
                <EventCard
                    imagen="/src/imagenes/EventoDestacado2.png"
                    tipo="LANZAMIENTO"
                    titular="Lanzamiento Verano 2027"
                    descripcion="Descubre nuestra nueva colección Verano 2027."
                    inicio="15 Jun"
                    fin="22 Jun"
                    tienda="URBAN FLOW"

                    onVerMas={() =>
                        setEventoSeleccionado({
                            titular: "Lanzamiento Verano 2027",
                            descripcion: "Preparate para el calor y descubre nuestra nueva colección Verano 2027, con cientos de marcars importadas, tales como Vineyard Vines, Polo, TH, y muchas más.",
                            inicio: "15 Jun",
                            fin: "16 Jun"
                        })}
                />
                <EventCard
                    imagen="/src/imagenes/EventoDestacado3.png"
                    tipo="EVENTO"
                    titular="Open House Maisoné"
                    descripcion="Te invitamos a nuestro evento especial con sorpresas."
                    inicio="20 Jun"
                    fin="20 Jun"
                    tienda="MAISONÉ"

                    onVerMas={() =>
                        setEventoSeleccionado({
                            titular: "Open House Maisoné",
                            descripcion: "Acompañanos en nuestra gran inaguariación, donde contaremos con diversas actividades, invitados especiales y premios. Pasale la voz a todos los que conozcas para tener más chances de ganar.",
                            inicio: "20 Jun",
                            fin: "20 Jun"
                        })}
                />

            </div>

        </section>
        {eventoSeleccionado && (

            <div
                className="fixed inset-0 flex items-center justify-center border-black"
                style={{
                    backgroundColor: "rgba(0,0,0,0.5)"
                }}
            >

                <div
                    className="bg-white rounded-xl"
                    style={{
                        padding: "20px",
                        width: "500px"
                    }}
                >

                    <h2 className="text-2xl font-bold">
                        {eventoSeleccionado.titular}
                    </h2>

                    <p>
                        {eventoSeleccionado.descripcion}
                    </p>

                    <p>
                        📅 {eventoSeleccionado.inicio} - {eventoSeleccionado.fin}
                    </p>


                    <button
                        onClick={() => setEventoSeleccionado(null)}
                        className="border rounded-lg"
                        style={{
                            padding: "8px 16px",
                            marginTop: "10px"
                        }}
                    >
                        Cerrar
                    </button>

                </div>

            </div>

        )}

    </main>

}

export default Events