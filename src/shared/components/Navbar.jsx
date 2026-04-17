import { NavLink } from "react-router-dom";
import { useCart } from "../hooks/useCart";

function Navbar() {
  const { cartCount } = useCart();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand">
          <strong>Tienda Central</strong>
          <span>Catálogo y compras en línea</span>
        </NavLink>

        <nav className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Productos
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Administrar
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Carrito
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </NavLink>

          <NavLink
            to="/checkout"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Checkout
          </NavLink>

          <NavLink
            to="/orders"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Pedidos
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;