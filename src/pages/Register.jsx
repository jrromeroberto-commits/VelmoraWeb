import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaApple,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import registerVisual from "../imagenes/login_slide1.png";
import logoVelmora from "../imagenes/Logo_velmora_t.png";

function Register() {
  const [userType, setUserType] = useState("comprador");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main className="register-page-new">
      <section className="register-container-new">
        {/* LADO IZQUIERDO */}
        <div className="register-form-side">
          <div className="register-brand-top">
            <img src={logoVelmora} alt="Logo Velmora" />
            <span>Velmora</span>
          </div>

          <div className="register-heading">
            <h1>Crear una cuenta</h1>
            <p>
              Únete ahora para explorar tiendas, marcas, descuentos y gestionar
              tu experiencia desde el primer día.
            </p>
          </div>

          <form className="register-form-new" onSubmit={handleSubmit}>
            <label>
              Nombre
              <div className="register-input-box">
                <FaUser />
                <input type="text" placeholder="Tu nombre completo" />
              </div>
            </label>

            <label>
              Correo
              <div className="register-input-box">
                <FaEnvelope />
                <input type="email" placeholder="tu@email.com" />
              </div>
            </label>

            <label>
              Contraseña
              <div className="register-input-box">
                <FaLock />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </label>

            <label>
              Confirmar contraseña
              <div className="register-input-box">
                <FaLock />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••••"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </label>

            <div className="register-user-type">
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

            <button type="submit" className="register-submit">
              Registrarme
            </button>

            <div className="register-separator">
              <span></span>
              <p>o regístrate con</p>
              <span></span>
            </div>

            <div className="register-social-buttons">
              <button type="button" className="social-register-btn">
                <FaGoogle />
                Google
              </button>

              <button type="button" className="social-register-btn">
                <FaApple />
                Apple
              </button>
            </div>

            <p className="register-login-text">
              ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
          </form>

          <div className="register-bottom-info">
            <p>Copyright © 2026 Velmora.</p>
            <a href="#">Política de privacidad</a>
          </div>
        </div>

        {/* LADO DERECHO */}
        <div className="register-visual-side">
          <div className="register-visual-overlay"></div>

          <div className="register-visual-content">
            <h2>Haz crecer tu presencia en Velmora</h2>
            <p>
              Crea tu cuenta para descubrir tiendas, acceder a promociones y
              conectar con una experiencia moderna de moda digital.
            </p>

            <img
              src={registerVisual}
              alt="Panel visual de Velmora"
              className="register-visual-image"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Register;