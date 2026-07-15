import { useState } from "react";
import { Link } from "react-router-dom";

function getPriceNumber(price) {
  if (typeof price === "number") return price;
  return Number(String(price || "0").replace("S/ ", "")) || 0;
}

function Checkout({ cartItems, onClearCart, onCreateOrder }) {
  const [paymentMethod, setPaymentMethod] = useState("Tarjeta");
  const [orderSent, setOrderSent] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = cartItems.reduce((sum, item) => {
    const price = getPriceNumber(item.price);
    return sum + price * item.quantity;
  }, 0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormMessage("");
    setIsSubmitting(true);

    const result = await onCreateOrder();
    setIsSubmitting(false);

    if (!result.success) {
      setFormMessage(result.message);
      return;
    }

    setOrderSent(true);
    onClearCart();
  };

  if (orderSent) {
    return (
      <main className="checkout-page">
        <section className="checkout-success">
          <p>Compra simulada</p>
          <h1>Pedido registrado</h1>
          <span>
            Tu pedido fue confirmado en la interfaz. Para pagos reales se
            necesita conectar una pasarela segura.
          </span>
          <Link to="/categorias">Seguir comprando</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <section className="checkout-heading">
        <p>Finalizar compra</p>
        <h1>Checkout</h1>
        <span>
          Revisa tu pedido y selecciona un metodo de pago.
        </span>
      </section>

      {cartItems.length === 0 ? (
        <section className="checkout-empty">
          <h2>No hay productos en el carrito</h2>
          <p>Agrega productos desde categorias para continuar con la compra.</p>
          <Link to="/categorias">Ver productos</Link>
        </section>
      ) : (
        <section className="checkout-layout">
          <div className="checkout-summary">
            <h2>Resumen del pedido</h2>

            {cartItems.map((item) => (
              <article className="checkout-item" key={item.cartKey}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.price}</p>
                  {item.storeName && <span>Tienda: {item.storeName}</span>}
                  {item.selectedSize && <span>Talla: {item.selectedSize}</span>}
                  {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                  <span>Cantidad: {item.quantity}</span>
                </div>
              </article>
            ))}

            <div className="checkout-total">
              <span>Total a pagar</span>
              <strong>S/ {total.toFixed(2)}</strong>
            </div>
          </div>

          <form className="checkout-form" onSubmit={handleSubmit}>
            <h2>Datos de compra</h2>

            <label>
              Nombre completo
              <input type="text" placeholder="Cliente Velmora" required />
            </label>

            <label>
              Correo electronico
              <input type="email" placeholder="cliente@gmail.com" required />
            </label>

            <label>
              Direccion de entrega
              <input type="text" placeholder="Av. Manuel Olguín 125" required />
            </label>

            <div className="checkout-methods">
              <p>Metodo de pago</p>

              {["Tarjeta", "Yape / Plin", "Transferencia"].map((method) => (
                <button
                  type="button"
                  key={method}
                  className={paymentMethod === method ? "active" : ""}
                  onClick={() => setPaymentMethod(method)}
                >
                  {method}
                </button>
              ))}
            </div>




            <button type="submit" className="checkout-submit">
              {isSubmitting
                ? "Confirmando pedido..."
                : `Confirmar pedido con ${paymentMethod}`}
            </button>
            {formMessage && <p className="auth-message error">{formMessage}</p>}
          </form>
        </section>
      )}
    </main>
  );
}

export default Checkout;
