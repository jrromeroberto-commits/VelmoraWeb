import { Link } from "react-router-dom";
import { formatSoles, getCartSubtotal } from "../services/pricingService";

function CartDrawer({
  cartItems,
  isOpen,
  onClose,
  onClearCart,
  onRemoveFromCart,
}) {
  const total = getCartSubtotal(cartItems);

  return (
    <div className={`cart-overlay ${isOpen ? "active" : ""}`}>
      <aside className="cart-drawer">
        <div className="cart-header">
          <div>
            <p>Velmora</p>
            <h2>Carrito de compras</h2>
          </div>

          <button type="button" onClick={onClose}>
            Cerrar
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <h3>Tu carrito esta vacio</h3>
            <p>Agrega productos desde la seccion de categorias.</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <article className="cart-item" key={item.cartKey}>
                  <img src={item.image} alt={item.name} />

                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.price}</p>
                    {item.storeName && <span>Tienda: {item.storeName}</span>}
                    {item.selectedSize && <span>Talla: {item.selectedSize}</span>}
                    {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                    <span>Cantidad: {item.quantity}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemoveFromCart(item.cartKey)}
                  >
                    Quitar
                  </button>
                </article>
              ))}
            </div>

            <div className="cart-footer">
              <div>
                <span>Total</span>
                <strong>{formatSoles(total)}</strong>
              </div>

              <button type="button" onClick={onClearCart}>
                Vaciar carrito
              </button>

              <Link
                to="/checkout"
                className="cart-checkout-link"
                onClick={onClose}
              >
                Finalizar compra
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export default CartDrawer;
