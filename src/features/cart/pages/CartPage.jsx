import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import EmptyState from "../../../shared/components/EmptyState";
import { useCart } from "../../../shared/hooks/useCart";
import { formatCurrency } from "../../../shared/utils/currency";

function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, cartCount } =
    useCart();

  return (
    <section className="page">
      <div className="container">
        <h1 className="section-title">Tu carrito</h1>

        {cartItems.length === 0 ? (
          <EmptyState
            title="Tu carrito está vacío"
            description="Agrega algunos productos desde el catálogo para empezar."
          />
        ) : (
          <div className="cart-layout">
            <div className="cart-list">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </div>

            <aside className="card summary-card">
              <h3>Resumen</h3>

              <div className="summary-line">
                <span>Productos</span>
                <strong>{cartCount}</strong>
              </div>

              <div className="summary-line">
                <span>Total a pagar</span>
                <strong>{formatCurrency(cartTotal)}</strong>
              </div>

              <div style={{ marginTop: "18px" }}>
                <Link to="/checkout">
                  <button className="btn btn-primary btn-full">
                    Ir al checkout
                  </button>
                </Link>
              </div>

              <p className="footer-note">
                El carrito queda guardado localmente, así que no se pierde al
                recargar la página.
              </p>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}

export default CartPage;