import { useNavigate } from "react-router-dom";

function SellerVerification() {

    const navigate = useNavigate();

    return <main
        className="flex justify-center"
        style={{
            marginTop: "60px"
        }}
    >
        <div
            className="border rounded-xl text-center"
            style={{
                width: "900px",
                padding: "40px"
            }}
        >
            <img src="/src/imagenes/LogoEventos1.png"
                alt="Logo"
                style={{
                    width: "180px",
                    margin: "0 auto"
                }} />


            <h1
                className="font-bold"
                style={{
                    fontSize: "36px",
                    marginBottom: "15px"
                }}
            >
                ¿Eres dueño de una tienda?
            </h1>

            <p
                className="text-gray-600"
                style={{
                    marginBottom: "30px"
                }}
            >
                Para publicar eventos, primero debemos verificar
                que tienes una tienda registrada en Velmora.
            </p>

            <button
                onClick={() => navigate("/eventos/verificar-tienda/crear-evento")}
                className="bg-black text-white rounded-lg hover:bg-gray-800"
                style={{
                    padding: "12px 32px"
                }}
            >
                VERIFICAR TIENDA
            </button>

            <div
                className="bg-[#F8F4ED] rounded-lg"
                style={{
                    marginTop: "40px",
                    padding: "12px"
                }}
            >
                ℹ️ Solo los propietarios de tiendas pueden publicar
                eventos y promociones.
            </div>

        </div>
    </main>
}

export default SellerVerification