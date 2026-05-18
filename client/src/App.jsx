import {Routes, Route,} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import MyOrders from "./pages/MyOrders";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
  <Route
    path="/"
    element={<Home />}
  />

  <Route
    path="/login"
    element={<Login />}
  />

  <Route
    path="/register"
    element={<Register />}
  />

  <Route
    path="/cart"
    element={<Cart />}
  />

  <Route
    path="/my-orders"
    element={<MyOrders />}
  />
</Routes>
    </>
  );
}

export default App;