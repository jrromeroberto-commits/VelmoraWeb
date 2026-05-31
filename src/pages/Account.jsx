import { Link } from "react-router-dom";
import { FaHeart, FaShoppingBag, FaStore, FaUser } from "react-icons/fa";

function Account({ currentUser }) {
  const isSeller = currentUser?.role === "vendedor";

  return (
    <main className="account-page">
      <section className="account-panel">
        <div className="account-avatar">
          {isSeller ? <FaStore /> : <FaUser />}
        </div>

        <div className="account-copy">
          <p>Mi cuenta</p>
          <h1>{currentUser?.name || "Invitado Velmora"}</h1>
          <span>
            {isSeller
              ? "Administra tu tienda, catalogo y estadisticas desde el panel."
              : "Revisa tus favoritos, carrito y actividad como comprador."}
          </span>
        </div>

        <div className="account-actions">
          {isSeller ? (
            <Link to="/panel">Ir al panel</Link>
          ) : (
            <>
              <button type="button">
                <FaHeart />
                Favoritos
              </button>
              <button type="button">
                <FaShoppingBag />
                Carrito
              </button>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default Account;
