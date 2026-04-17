import { useEffect, useState } from "react";
import EmptyState from "../../../shared/components/EmptyState";
import { getFromStorage } from "../../../shared/utils/storage";
import { formatCurrency } from "../../../shared/utils/currency";

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(getFromStorage("orders", []));
  }, []);

  if (!orders.length) {
    return (
      <section className="page">
        <div className="container">
          <EmptyState
            title="Todavía no tienes pedidos"
            description="Cuando confirmes una compra, aparecerá aquí con su resumen."
          />
        </div>
      </section>
    );
  }

  return (
    <section className="page">
      <div className="container">
        <h1 className="section-title">Mis pedidos</h1>

        <div className="orders-grid">
          {orders.map((order) => (
            <article key={order.id} className="card order-card">
              <div className="order-header">
                <div>
                  <h3>Pedido #{order.id}</h3>
                  <p className="muted">
                    {new Date(order.createdAt).toLocaleString("es-CO")}
                  </p>
                </div>

                <span className="order-status">{order.status}</span>
              </div>

              <p className="muted">Cliente: {order.customerName}</p>
              <p className="muted">Correo: {order.email}</p>
              <p className="muted">Dirección: {order.address}</p>

              <div className="order-items">
                {order.items.map((item) => (
                  <div key={item.id} className="summary-line">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <strong>{formatCurrency(item.price * item.quantity)}</strong>
                  </div>
                ))}
              </div>

              <div className="divider" />

              <div className="summary-line">
                <span>Total del pedido</span>
                <strong>{formatCurrency(order.total)}</strong>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OrdersPage;