import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaApple,
  FaEye,
  FaEyeSlash,
  FaTimes,
} from "react-icons/fa";

import registerVisual from "../imagenes/login_slide1.png";
import logoVelmora from "../imagenes/Logo_velmora_t.png";

function Register({ onRegister }) {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("comprador");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(userType);
    navigate(userType === "vendedor" ? "/crear-tienda" : "/");
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
            <button
              type="button"
              className="privacy-link"
              onClick={() => setShowPrivacyModal(true)}
            >
              Política de privacidad
            </button>
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

      {showPrivacyModal && (
        <div
          className="privacy-modal-overlay"
          role="presentation"
          onClick={() => setShowPrivacyModal(false)}
        >
          <section
            className="privacy-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="privacy-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="privacy-modal-close"
              aria-label="Cerrar politica de privacidad"
              onClick={() => setShowPrivacyModal(false)}
            >
              <FaTimes />
            </button>

            <p className="privacy-modal-label">Velmora</p>
            <h2 id="privacy-modal-title">Politica y privacidad</h2>

            <div className="privacy-modal-content">
              <p>
                Esta politica describe de forma general como Velmora podria
                recopilar, usar y proteger la informacion proporcionada por sus
                usuarios dentro de la plataforma.
              </p>

              <h3>Informacion que podemos recopilar</h3>
              <p>
                Podemos solicitar datos como nombre, correo electronico,
                preferencias de usuario y datos relacionados con tiendas o
                catalogos cuando el usuario decida registrarse o interactuar
                con la plataforma.
              </p>

              <h3>Uso de la informacion</h3>
              <p>
                La informacion se usaria para crear cuentas, mejorar la
                experiencia, mostrar contenido relevante, gestionar
                comunicaciones y mantener la seguridad del servicio.
              </p>

              <h3>Proteccion y responsabilidad</h3>
              <p>
                Velmora buscaria aplicar medidas razonables para proteger los
                datos personales. El usuario tambien es responsable de mantener
                segura su cuenta y no compartir sus credenciales.
              </p>

              <h3>Terminos generales</h3>
              <p>
                Al usar Velmora, el usuario acepta utilizar la plataforma de
                manera responsable, respetar a otros usuarios y no publicar
                contenido falso, ofensivo o que infrinja derechos de terceros.
              </p>
            </div>

            <button
              type="button"
              className="privacy-modal-button"
              onClick={() => setShowPrivacyModal(false)}
            >
              Entendido
            </button>
          </section>
        </div>
      )}
    </main>
  );
}

export default Register;
