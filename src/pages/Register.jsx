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
import { isBlank, isValidEmail } from "../utils/formValidation";

function Register({ onRegister }) {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("comprador");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMessage("");

    if (isBlank(formData.name)) {
      setFormMessage("Ingresa tu nombre.");
      return;
    }

    if (isBlank(formData.email)) {
      setFormMessage("Ingresa tu correo.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setFormMessage("Ingresa un correo valido.");
      return;
    }

    if (isBlank(formData.password)) {
      setFormMessage("Ingresa una contrasena.");
      return;
    }

    if (isBlank(formData.confirmPassword)) {
      setFormMessage("Confirma tu contrasena.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormMessage("Las contrasenas no coinciden.");
      return;
    }

    setIsSubmitting(true);
    const result = await onRegister({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: userType,
      });
    setIsSubmitting(false);

    if (!result.success) {
      setFormMessage(result.message);
      return;
    }

    navigate(userType === "vendedor" ? "/crear-tienda" : "/");
  };

  return (
    <main className="register-page-new">
      <section className="register-container-new">
        <div className="register-form-side">
          <div className="register-brand-top">
            <img src={logoVelmora} alt="Logo Velmora" />
            <span>Velmora</span>
          </div>

          <div className="register-heading">
            <h1>Crear una cuenta</h1>
            <p>
              Unete ahora para explorar tiendas, marcas, descuentos y gestionar
              tu experiencia desde el primer dia.
            </p>
          </div>

          <form className="register-form-new" onSubmit={handleSubmit} noValidate>
            <label>
              Nombre
              <div className="register-input-box">
                <FaUser />
                <input
                  type="text"
                  name="name"
                  placeholder="Tu nombre completo"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
            </label>

            <label>
              Correo
              <div className="register-input-box">
                <FaEnvelope />
                <input
                  type="email"
                  name="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </label>

            <label>
              Contrasena
              <div className="register-input-box">
                <FaLock />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="**********"
                  value={formData.password}
                  onChange={handleInputChange}
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
              Confirmar contrasena
              <div className="register-input-box">
                <FaLock />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="**********"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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

            <button type="submit" className="register-submit" disabled={isSubmitting}>
              {isSubmitting ? "Registrando..." : "Registrarme"}
            </button>

            {formMessage && <p className="auth-message error">{formMessage}</p>}

            <div className="register-separator">
              <span></span>
              <p>o registrate con</p>
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
              Ya tienes cuenta? <Link to="/login">Inicia sesion</Link>
            </p>
          </form>

          <div className="register-bottom-info">
            <p>Copyright 2026 Velmora.</p>
            <button
              type="button"
              className="privacy-link"
              onClick={() => setShowPrivacyModal(true)}
            >
              Politica de privacidad
            </button>
          </div>
        </div>

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
