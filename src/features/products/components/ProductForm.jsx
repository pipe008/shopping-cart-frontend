import { useEffect, useState } from "react";

const initialState = {
  name: "",
  description: "",
  price: "",
  stock: "",
  category: "",
  image: "",
  available: true,
};

function ProductForm({
  initialValues,
  onSubmit,
  submitText = "Guardar producto",
  loading = false,
}) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (initialValues) {
      setForm({
        name: initialValues.name || "",
        description: initialValues.description || "",
        price: initialValues.price ?? "",
        stock: initialValues.stock ?? "",
        category: initialValues.category || "",
        image: initialValues.image || "",
        available: initialValues.available ?? true,
      });
    }
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit(form);
  };

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <h3 style={{ marginBottom: "18px" }}>Datos del producto</h3>

      <div className="form-grid">
        <input
          className="input"
          type="text"
          name="name"
          placeholder="Nombre del producto"
          value={form.name}
          onChange={handleChange}
          required
        />

        <textarea
          className="input"
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
          rows="4"
        />

        <input
          className="input"
          type="number"
          name="price"
          placeholder="Precio"
          value={form.price}
          onChange={handleChange}
          min="1"
          required
        />

        <input
          className="input"
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          min="0"
          required
        />

        <input
          className="input"
          type="text"
          name="category"
          placeholder="Categoría"
          value={form.category}
          onChange={handleChange}
        />

        <input
          className="input"
          type="text"
          name="image"
          placeholder="URL de la imagen"
          value={form.image}
          onChange={handleChange}
        />

        <label className="checkbox-row">
          <input
            type="checkbox"
            name="available"
            checked={form.available}
            onChange={handleChange}
          />
          <span>Producto disponible</span>
        </label>

        <button className="btn btn-primary btn-full" type="submit" disabled={loading}>
          {loading ? "Guardando..." : submitText}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;