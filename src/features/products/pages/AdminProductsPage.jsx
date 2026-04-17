import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../../shared/components/Loader";
import EmptyState from "../../../shared/components/EmptyState";
import SearchBar from "../../../shared/components/SearchBar";
import { deleteProduct, getProducts } from "../services/productService";
import { formatCurrency } from "../../../shared/utils/currency";

function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState("");
  const [search, setSearch] = useState("");

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("¿Seguro que quieres eliminar este producto?");
    if (!confirmed) return;

    try {
      setDeletingId(id);
      await deleteProduct(id);
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      alert("No se pudo eliminar el producto.");
    } finally {
      setDeletingId("");
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const text = `${product.name} ${product.description} ${product.category}`.toLowerCase();
      return text.includes(search.toLowerCase());
    });
  }, [products, search]);

  const stats = useMemo(() => {
    const total = products.length;
    const available = products.filter((p) => p.available && p.stock > 0).length;
    const outOfStock = products.filter((p) => p.stock === 0).length;

    return { total, available, outOfStock };
  }, [products]);

  const getStockLabel = (stock) => {
    if (stock === 0) return "Sin stock";
    if (stock <= 5) return "Pocas unidades";
    return "Disponible";
  };

  const getStockClass = (stock) => {
    if (stock === 0) return "stock-badge stock-out";
    if (stock <= 5) return "stock-badge stock-low";
    return "stock-badge stock-ok";
  };

  return (
    <section className="page">
      <div className="container">
        <div className="admin-header">
          <div>
            <h1 className="section-title admin-title-main">Administrar productos</h1>
            <p className="muted admin-subtitle">
              Crea, edita y elimina productos del catálogo desde un solo lugar.
            </p>
          </div>

          <Link to="/admin/products/new">
            <button className="btn btn-primary">Nuevo producto</button>
          </Link>
        </div>

        <div className="stats-grid">
          <article className="card stat-card">
            <span className="stat-label">Total productos</span>
            <strong className="stat-value">{stats.total}</strong>
          </article>

          <article className="card stat-card">
            <span className="stat-label">Disponibles</span>
            <strong className="stat-value">{stats.available}</strong>
          </article>

          <article className="card stat-card">
            <span className="stat-label">Sin stock</span>
            <strong className="stat-value">{stats.outOfStock}</strong>
          </article>
        </div>

        <div className="admin-toolbar">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Buscar por nombre, categoría o descripción..."
          />
        </div>

        {loading ? (
          <Loader text="Cargando productos del panel..." />
        ) : filteredProducts.length === 0 ? (
          <EmptyState
            title="No hay productos para mostrar"
            description="Crea uno nuevo o prueba con otra búsqueda."
          />
        ) : (
          <div className="admin-products-grid">
            {filteredProducts.map((product) => (
              <article key={product.id} className="card admin-product-card">
                <div className="admin-image-box">
                  <img
                    className="admin-product-image"
                    src={product.image}
                    alt={product.name}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/600x400?text=Producto";
                    }}
                  />
                </div>

                <div className="admin-product-body">
                  <div className="admin-product-top">
                    <span className="product-category">{product.category}</span>
                    <span className={getStockClass(product.stock)}>
                      {getStockLabel(product.stock)}
                    </span>
                  </div>

                  <h3 className="admin-product-title">{product.name}</h3>

                  <p className="admin-product-description">
                    {product.description || "Sin descripción disponible."}
                  </p>

                  <div className="admin-product-meta">
                    <div>
                      <span className="meta-label">Precio</span>
                      <strong>{formatCurrency(product.price)}</strong>
                    </div>

                    <div>
                      <span className="meta-label">Stock</span>
                      <strong>{product.stock}</strong>
                    </div>
                  </div>

                  <div className="admin-product-actions">
                    <Link to={`/admin/products/edit/${product.id}`}>
                      <button className="btn btn-secondary">Editar</button>
                    </Link>

                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(product.id)}
                      disabled={deletingId === product.id}
                    >
                      {deletingId === product.id ? "Eliminando..." : "Eliminar"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminProductsPage;