import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import Loader from "../../../shared/components/Loader";
import EmptyState from "../../../shared/components/EmptyState";
import { getProductById, updateProduct } from "../services/productService";

function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        setProduct(null);
      } finally {
        setLoadingData(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      setSaving(true);
      await updateProduct(id, formData);
      navigate("/admin/products");
    } catch (error) {
      alert("No se pudo actualizar el producto.");
    } finally {
      setSaving(false);
    }
  };

  if (loadingData) {
    return (
      <section className="page">
        <div className="container">
          <Loader text="Cargando producto..." />
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="page">
        <div className="container">
          <EmptyState
            title="Producto no encontrado"
            description="No se pudo cargar el producto solicitado."
          />
        </div>
      </section>
    );
  }

  return (
    <section className="page">
      <div className="container">
        <h1 className="section-title">Editar producto</h1>
        <ProductForm
          initialValues={product}
          onSubmit={handleUpdate}
          submitText="Guardar cambios"
          loading={saving}
        />
      </div>
    </section>
  );
}

export default EditProductPage;