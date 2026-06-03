function CartDrawer({
  cartItems,
  isOpen,
  onClose,
  onClearCart,
  onRemoveFromCart,
}) {
  const total = cartItems.reduce((sum, item) => {
    const price = Number(item.price.replace("S/ ", ""));
    return sum + price * item.quantity;
  }, 0);

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
                <article className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />

                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.price}</p>
                    <span>Cantidad: {item.quantity}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemoveFromCart(item.id)}
                  >
                    Quitar
                  </button>
                </article>
              ))}
            </div>

            <div className="cart-footer">
              <div>
                <span>Total</span>
                <strong>S/ {total.toFixed(2)}</strong>
              </div>

              <button type="button" onClick={onClearCart}>
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export default CartDrawer;
