import { Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaFacebookF,
  FaApple,
} from "react-icons/fa";
import { useState } from "react";

function Register() {
  const [userType, setUserType] = useState("comprador");

  return (
    <main className="register-page">
      <section className="register-card">
        <h1>Crear cuenta</h1>

        <form className="register-form">
          <div className="register-row">
            <FaUser className="register-icon" />

            <input
              type="text"
              placeholder="Nombre completo"
              className="register-input"
            />
          </div>

          <div className="register-row">
            <FaEnvelope className="register-icon" />

            <input
              type="email"
              placeholder="Correo electrónico"
              className="register-input"
            />
          </div>

          <div className="register-row">
            <FaUser className="register-icon" />

            <input
              type="text"
              placeholder="Usuario (opcional)"
              className="register-input"
            />
          </div>

          <div className="register-row">
            <FaLock className="register-icon" />

            <input
              type="password"
              placeholder="Contraseña"
              className="register-input"
            />
          </div>

          <div className="register-row">
            <FaLock className="register-icon" />

            <input
              type="password"
              placeholder="Confirmar contraseña"
              className="register-input"
            />
          </div>

          <div className="register-type">
            <button
              type="button"
              className={userType === "comprador" ? "active" : ""}
              onClick={() => setUserType("comprador")}
            >
              Comprador
            </button>

            <button
              type="button"
              className={userType === "vendedor" ? "active" : ""}
              onClick={() => setUserType("vendedor")}
            >
              Vendedor
            </button>
          </div>

          <div className="register-socials">
            <FaGoogle />
            <FaFacebookF />
            <FaApple />
          </div>

          <div className="register-divider">
            <span></span>
            <div>✦</div>
            <span></span>
          </div>

          <button type="submit" className="register-button">
            Registrarme
          </button>

          <p className="register-login">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión.</Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Register;