import { formatCurrency } from "../../../shared/utils/currency";

function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <article className="card cart-item">
      <img
        className="cart-thumb"
        src={item.image}
        alt={item.name}
        onError={(e) => {
          e.currentTarget.src =
            "https://via.placeholder.com/400x300?text=Producto";
        }}
      />

      <div className="cart-info">
        <h3>{item.name}</h3>
        <p className="muted">Precio unitario: {formatCurrency(item.price)}</p>
        <p className="muted">Stock máximo: {item.stock}</p>

        <div className="cart-actions">
          <div className="qty-box">
            <button
              className="qty-button"
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            >
              -
            </button>

            <strong>{item.quantity}</strong>

            <button
              className="qty-button"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            >
              +
            </button>
          </div>

          <button className="btn btn-danger" onClick={() => onRemove(item.id)}>
            Eliminar
          </button>
        </div>
      </div>

      <div>
        <strong>{formatCurrency(item.quantity * item.price)}</strong>
      </div>
    </article>
  );
}

export default CartItem;