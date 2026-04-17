import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";
import SearchBar from "../../../shared/components/SearchBar";
import Loader from "../../../shared/components/Loader";
import EmptyState from "../../../shared/components/EmptyState";
import { useCart } from "../../../shared/hooks/useCart";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map((item) => item.category))];
    return ["Todas", ...uniqueCategories];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "Todas" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  return (
    <section className="page">
      <div className="container">
        <div className="hero">
          <h1>Encuentra lo que necesitas en un solo lugar</h1>
          <p>
            Explora el catálogo, revisa los productos disponibles y arma tu
            compra de forma simple, clara y ordenada.
          </p>
        </div>

        <div className="controls">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Buscar por nombre o descripción..."
          />

          <select
            className="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <Loader text="Estamos cargando el catálogo..." />
        ) : filteredProducts.length === 0 ? (
          <EmptyState
            title="No encontramos productos"
            description="Prueba otro término de búsqueda o cambia la categoría."
          />
        ) : (
          <div className="grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductsPage;