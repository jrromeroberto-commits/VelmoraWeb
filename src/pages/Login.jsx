import { Link } from "react-router-dom";
import { FaUser, FaLock, FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";

function Login() {
  return (
    <main className="login-page">
      <section className="login-card">
        <h1>Usuario</h1>

        <form className="login-form">
          <div className="login-row">
            <FaUser className="login-icon" />

            <input
              type="text"
              placeholder="Usuario o correo"
              className="login-input"
            />
          </div>

          <div className="login-row">
            <FaLock className="login-icon" />

            <input
              type="password"
              placeholder="Contraseña"
              className="login-input"
            />
          </div>

          <div className="login-socials">
            <FaGoogle />
            <FaFacebookF />
            <FaApple />
          </div>

          <div className="login-divider">
            <span></span>
            <div>✦</div>
            <span></span>
          </div>

          <button type="submit" className="login-button">
            Iniciar sesión
          </button>

          <p className="login-register">
            ¿No tienes cuenta?{" "}
            <Link to="/registro">Regístrate.</Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Login;