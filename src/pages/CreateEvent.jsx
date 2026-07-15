import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { eventsApi, getAuthToken } from "../services/api";

function CreateEvent() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [imagen, setImagen] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setMessage("");

    const token = getAuthToken();

    if (!token) {
      setMessage("Debes iniciar sesion como vendedor para publicar eventos.");
      return;
    }

    try {
      setIsSubmitting(true);
      await eventsApi.create(
        {
          title: titulo,
          description: descripcion,
          startsAt: fechaInicio,
          endsAt: fechaFin,
          imageUrl: imagen,
          type: "EVENTO",
          storeName: "Velmora",
        },
        token
      );
      setIsSubmitting(false);
      navigate("/eventos/all-events");
    } catch (error) {
      setIsSubmitting(false);
      setMessage(error.message || "No se pudo publicar el evento.");
    }
  };

  return (
    <main className="w-full flex justify-center" style={{ margin: "10px" }}>
      <div className="border rounded-xl" style={{ width: "1200px", padding: "30px" }}>
        <h1 className="text-4xl font-bold" style={{ marginTop: "20px" }}>
          PUBLICAR EVENTO
        </h1>

        <div
          className="flex items-center gap-2"
          style={{ marginTop: "10px", marginBottom: "30px" }}
        >
          <div className="w-20 h-0.5 bg-[#C9A86A]"></div>
          <div className="w-2 h-2 rounded-full bg-[#C9A86A]"></div>
          <div className="w-20 h-0.5 bg-[#C9A86A]"></div>
        </div>

        <div className="grid grid-cols-2 gap-10">
          <div>
            <label className="font-medium">Titulo del evento</label>

            <input
              type="text"
              placeholder="Escribe el titulo de tu evento"
              className="w-full border rounded-lg"
              style={{ padding: "12px", marginTop: "8px" }}
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />

            <div style={{ marginTop: "25px" }}>
              <label className="font-medium">Descripcion del evento</label>

              <textarea
                placeholder="Describe tu evento..."
                className="w-full border rounded-lg"
                style={{ padding: "12px", marginTop: "8px", height: "140px" }}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4" style={{ marginTop: "25px" }}>
              <div>
                <label>Fecha de inicio</label>

                <input
                  type="date"
                  className="w-full border rounded-lg"
                  style={{ padding: "12px", marginTop: "8px" }}
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                />
              </div>

              <div>
                <label>Fecha de finalizacion</label>

                <input
                  type="date"
                  className="w-full border rounded-lg"
                  style={{ padding: "12px", marginTop: "8px" }}
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="font-medium">Imagen del evento</label>

            <div
              className="border rounded-lg text-center"
              style={{ padding: "60px", marginTop: "8px" }}
            >
              <p className="text-6xl">📸</p>

              <p style={{ marginTop: "10px" }}>Sube una imagen de tu evento</p>

              <input
                type="file"
                id="imagenes"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const archivo = e.target.files[0];
                  if (!archivo) return;
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setImagen(reader.result);
                  };
                  reader.readAsDataURL(archivo);
                }}
              />

              <label
                htmlFor="imagenes"
                className="border rounded-lg cursor-pointer inline-block"
                style={{ padding: "10px 20px", marginTop: "15px" }}
              >
                SELECCIONAR IMAGEN
              </label>
            </div>
          </div>
        </div>

        {message && <p className="auth-message error">{message}</p>}

        <div className="flex justify-end gap-4" style={{ marginTop: "30px" }}>
          <button
            className="border rounded-lg"
            style={{ padding: "10px 25px" }}
            onClick={() => navigate("/eventos")}
          >
            CANCELAR
          </button>

          <button
            className="bg-black text-white rounded-lg"
            style={{ padding: "10px 25px" }}
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? "PUBLICANDO..." : "PUBLICAR EVENTO"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default CreateEvent;
