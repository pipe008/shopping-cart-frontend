import CartProvider from "./CartProvider";

function AppProviders({ children }) {
  return <CartProvider>{children}</CartProvider>;
}

export default AppProviders;