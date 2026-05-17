import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";

function Home() {
  const [products, setProducts] =
    useState([]);

  useEffect(() => {
    const fetchProducts =
      async () => {
        try {
          const res =
            await API.get(
              "/products"
            );

          setProducts(
            res.data
          );
        } catch (error) {
          console.log(
            error
          );
        }
      };

    fetchProducts();
  }, []);

  const addToCart = (
    product
  ) => {
    const cart =
      JSON.parse(
        localStorage.getItem(
          "cart"
        )
      ) || [];

    const existingProduct =
      cart.find(
        (item) =>
          item._id ===
          product._id
      );

    if (
      existingProduct
    ) {
      existingProduct.quantity =
        (existingProduct.quantity ||
          1) + 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    toast.success(
      "Added to cart"
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-10">
        Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map(
          (product) => (
            <div
              key={
                product._id
              }
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
            >
              <img
                src={
                  product.image
                }
                alt={
                  product.name
                }
                className="w-full h-64 object-cover"
              />

              <div className="p-5">
                <h2 className="text-2xl font-semibold mb-2">
                  {
                    product.name
                  }
                </h2>

                <p className="text-gray-600 mb-3">
                  {
                    product.description
                  }
                </p>

                <p className="text-2xl font-bold text-green-600 mb-3">
                  ₹
                  {
                    product.price
                  }
                </p>

                <p className="text-sm text-gray-500">
                  Category:{" "}
                  {
                    product.category
                  }
                </p>

                <p className="text-sm text-gray-500 mb-4">
                  Stock:{" "}
                  {
                    product.stock
                  }
                </p>

                <button
                  onClick={() =>
                    addToCart(
                      product
                    )
                  }
                  className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Home;