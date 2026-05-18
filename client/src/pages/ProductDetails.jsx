import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  useEffect(() => {
    const fetchProduct =
      async () => {
        try {
          const res =
            await API.get(
              `/products/${id}`
            );

          setProduct(
            res.data
          );
        } catch (error) {
          console.log(
            error
          );
        }
      };

    fetchProduct();
  }, [id]);

  const addToCart = () => {
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
      existingProduct.quantity += 1;
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

  if (!product) {
    return (
      <div className="text-center mt-20 text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center items-center">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-5xl w-full flex flex-col md:flex-row gap-10">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 rounded-3xl object-cover"
        />

        <div className="flex flex-col justify-center">
          <h1 className="text-5xl font-bold mb-4">
            {product.name}
          </h1>

          <p className="text-gray-600 text-lg mb-4">
            {
              product.description
            }
          </p>

          <h2 className="text-4xl font-bold text-green-600 mb-4">
            ₹
            {product.price}
          </h2>

          <p className="text-lg mb-2">
            <strong>
              Category:
            </strong>{" "}
            {
              product.category
            }
          </p>

          <p className="text-lg mb-6">
            <strong>
              Stock:
            </strong>{" "}
            {
              product.stock
            }
          </p>

          <button
            onClick={
              addToCart
            }
            disabled={
              product.stock ===
              0
            }
            className={`px-8 py-4 rounded-2xl text-white text-lg transition ${
              product.stock ===
              0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            }`}
          >
            {product.stock ===
            0
              ? "Out of Stock"
              : "Add To Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;