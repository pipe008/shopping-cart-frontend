import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../shared/hooks/useCart";
import { formatCurrency } from "../../../shared/utils/currency";
import { getFromStorage, setInStorage } from "../../../shared/utils/storage";
import EmptyState from "../../../shared/components/EmptyState";

function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();

  const [form, setForm] = useState({
    customerName: "",
    email: "",
    address: "",
  });

  const itemCount = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.quantity, 0),
    [cartItems]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!cartItems.length) return;

    const newOrder = {
      id: Date.now(),
      customerName: form.customerName,
      email: form.email,
      address: form.address,
      items: cartItems,
      total: cartTotal,
      status: "CREATED",
      createdAt: new Date().toISOString(),
    };

    const currentOrders = getFromStorage("orders", []);
    setInStorage("orders", [newOrder, ...currentOrders]);

    clearCart();
    navigate("/orders");
  };

  if (!cartItems.length) {
    return (
      <section className="page">
        <div className="container">
          <EmptyState
            title="No hay nada para pagar"
            description="Primero agrega productos al carrito y luego vuelve al checkout."
          />
        </div>
      </section>
    );
  }

  return (
    <section className="page">
      <div className="container">
        <h1 className="section-title">Checkout</h1>

        <div className="checkout-layout">
          <form className="card form-card" onSubmit={handleSubmit}>
            <h3>Datos del cliente</h3>

            <div className="form-grid">
              <input
                className="input"
                type="text"
                name="customerName"
                placeholder="Nombre completo"
                value={form.customerName}
                onChange={handleChange}
                required
              />

              <input
                className="input"
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={form.email}
                onChange={handleChange}
                required
              />

              <input
                className="input"
                type="text"
                name="address"
                placeholder="Dirección"
                value={form.address}
                onChange={handleChange}
                required
              />

              <button className="btn btn-primary btn-full" type="submit">
                Confirmar pedido
              </button>
            </div>
          </form>

          <aside className="card summary-card">
            <h3>Resumen del pedido</h3>

            <div className="summary-line">
              <span>Cantidad de ítems</span>
              <strong>{itemCount}</strong>
            </div>

            {cartItems.map((item) => (
              <div key={item.id} className="summary-line">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <strong>{formatCurrency(item.price * item.quantity)}</strong>
              </div>
            ))}

            <div className="divider" />

            <div className="summary-line">
              <span>Total</span>
              <strong>{formatCurrency(cartTotal)}</strong>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default CheckoutPage;