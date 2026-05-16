import { useEffect, useState } from "react";
import API from "./services/api";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>

      {products.map((product) => (
        <div
          key={product._id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            width="200"
          />

          <h2>{product.name}</h2>

          <p>{product.description}</p>

          <h3>₹{product.price}</h3>

          <p>Category: {product.category}</p>

          <p>Stock: {product.stock}</p>
        </div>
      ))}
    </div>
  );
}

export default App;