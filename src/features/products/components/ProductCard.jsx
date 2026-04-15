import { formatCurrency } from "../../../shared/utils/currency";

function ProductCard({ product, onAddToCart }) {
  return (
    <article className="card product-card">
      <img
        className="product-image"
        src={product.image}
        alt={product.name}
        onError={(e) => {
          e.currentTarget.src =
            "https://via.placeholder.com/600x400?text=Producto";
        }}
      />

      <div className="product-body">
        <span className="product-category">{product.category}</span>

        <h3 className="product-title">{product.name}</h3>

        <p className="product-description">{product.description}</p>

        <p className="muted">Stock disponible: {product.stock}</p>

        <div className="product-footer">
          <span className="price">{formatCurrency(product.price)}</span>

          <button
            className="btn btn-primary"
            onClick={() => onAddToCart(product)}
            disabled={product.stock <= 0}
          >
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;