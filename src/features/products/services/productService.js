import api from "../../../shared/services/api";

function mapProduct(item) {
  return {
    id: item.id || item._id,
    name: item.name || "",
    description: item.description || "",
    price: Number(item.price || 0),
    stock: Number(item.stock || 0),
    category: item.category || "General",
    image: item.image || "https://via.placeholder.com/600x400?text=Producto",
    available: Boolean(item.available),
  };
}

function normalizePayload(payload) {
  return {
    name: payload.name?.trim() || "",
    description: payload.description?.trim() || "",
    price: Number(payload.price),
    stock: Number(payload.stock),
    category: payload.category?.trim() || "General",
    image: payload.image?.trim() || "",
    available: Boolean(payload.available),
  };
}

export async function getProducts() {
  const response = await api.get("/products");
  const data = response.data || [];
  return Array.isArray(data) ? data.map(mapProduct) : [];
}

export async function getProductById(id) {
  const response = await api.get(`/products/${id}`);
  return mapProduct(response.data);
}

export async function createProduct(payload) {
  const response = await api.post("/products", normalizePayload(payload), {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return mapProduct(response.data);
}

export async function updateProduct(id, payload) {
  const response = await api.put(`/products/${id}`, normalizePayload(payload), {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return mapProduct(response.data);
}

export async function deleteProduct(id) {
  await api.delete(`/products/${id}`);
}