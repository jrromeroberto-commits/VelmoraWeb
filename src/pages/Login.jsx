import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaApple,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import logoVelmora from "../imagenes/Logo_velmora_t.png";
import slide1 from "../imagenes/login_slide1.png";
import slide2 from "../imagenes/login_slide2.png";
import slide3 from "../imagenes/login_slide3.png";

function Login({ onLogin }) {
  const navigate = useNavigate();
  const slides = [
    {
      image: slide1,
      title: "Descubre tiendas y marcas exclusivas",
      text: "Explora colecciones seleccionadas, piezas unicas y las ultimas tendencias en un solo lugar.",
    },
    {
      image: slide2,
      title: "Aprovecha descuentos exclusivos",
      text: "Encuentra ofertas limitadas, cupones y promociones en tus tiendas favoritas dentro de Velmora.",
    },
    {
      image: slide3,
      title: "Afiliate y haz crecer tu tienda",
      text: "Publica tu catalogo, conecta con nuevos clientes y destaca tu marca dentro de Velmora.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4500);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMessage("");

    setIsSubmitting(true);
    const result = await onLogin({
      email: formData.email.trim(),
      password: formData.password,
    });
    setIsSubmitting(false);

    if (!result.success) {
      setFormMessage(result.message);
      return;
    }

    navigate(result.user.role === "vendedor" ? "/panel" : "/");
  };

  return (
    <main className="login-page">
      <section className="login-container">
        <div className="login-carousel">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`login-slide ${index === currentSlide ? "active" : ""}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            ></div>
          ))}

          <div className="login-carousel-overlay"></div>

          <div className="login-carousel-content">
            <span className="login-small-text">Moda que te define</span>

            <h2>{slides[currentSlide].title}</h2>

            <p>{slides[currentSlide].text}</p>

            <div className="login-dots">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={index === currentSlide ? "active" : ""}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Ir al slide ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>

        <div className="login-form-side">
          <div className="login-logo-box">
            <img src={logoVelmora} alt="Logo Velmora" />
            <p>Fashion marketplace</p>
          </div>

          <div className="login-heading">
            <h1>Hola de nuevo</h1>
            <p>Inicia sesion para continuar descubriendo lo mejor de la moda.</p>
          </div>

          <form className="login-form-new" onSubmit={handleSubmit}>
            <label>
              Correo
              <div className="login-input-box">
                <FaEnvelope />
                <input
                  type="email"
                  name="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </label>

            <label>
              Contrasena
              <div className="login-input-box">
                <FaLock />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="**********"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  className="toggle-password login-eye"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar contrasena" : "Mostrar contrasena"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </label>

            <div className="login-options">
              <label className="remember-check">
                <input type="checkbox" />
                <span>Recordarme</span>
              </label>

              <a href="#">Olvidaste tu contrasena?</a>
            </div>

            <button type="submit" className="login-submit" disabled={isSubmitting}>
              {isSubmitting ? "Ingresando..." : "Iniciar sesion"}
            </button>

            {formMessage && <p className="auth-message error">{formMessage}</p>}

            <div className="login-separator">
              <span></span>
              <p>o</p>
              <span></span>
            </div>

            <div className="login-social-buttons">
              <button type="button" className="google-button">
                <FaGoogle />
                Google
              </button>

              <button type="button" className="apple-button">
                <FaApple />
                Apple
              </button>
            </div>

            <p className="login-register-text">
              No tienes cuenta? <Link to="/registro">Registrate</Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Login;
