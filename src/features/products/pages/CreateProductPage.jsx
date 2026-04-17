import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { createProduct } from "../services/productService";

function CreateProductPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (formData) => {
    try {
      setLoading(true);
      await createProduct(formData);
      navigate("/admin/products");
    } catch (error) {
      alert("No se pudo crear el producto. Revisa los datos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page">
      <div className="container">
        <h1 className="section-title">Crear producto</h1>
        <ProductForm
          onSubmit={handleCreate}
          submitText="Crear producto"
          loading={loading}
        />
      </div>
    </section>
  );
}

export default CreateProductPage;