import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";
import API from "../services/api";

function ProductDetails() {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [product, setProduct] =
    useState(null);

  useEffect(() => {
    const fetchProduct =
      async () => {
        try {
          const res =
            await API.get(
              `/api/products/${id}`
            );

          setProduct(
            res.data
          );
        } catch (error) {
          console.log(
            error
          );

          toast.error(
            "Failed to load product"
          );
        }
      };

    fetchProduct();
  }, [id]);

  const addToCart = () => {
    const token =
      localStorage.getItem(
        "token"
      );

    if (!token) {
      toast.error(
        "Please login first"
      );
      navigate(
        "/login"
      );
      return;
    }

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

    window.dispatchEvent(
      new Event(
        "cartUpdated"
      )
    );

    toast.success(
      "Added to cart"
    );
  };

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Back Button */}
      <button
        onClick={() =>
          navigate("/")
        }
        className="mb-6 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
      >
        ← Back to Products
      </button>

      {/* Product Card */}
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-5xl mx-auto w-full flex flex-col md:flex-row gap-10">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 rounded-3xl object-cover"
        />

        <div className="flex flex-col justify-center">
          <h1 className="text-5xl font-bold mb-4">
            {
              product.name
            }
          </h1>

          <p className="text-gray-600 text-lg mb-4">
            {
              product.description
            }
          </p>

          <h2 className="text-4xl font-bold text-green-600 mb-4">
            ₹
            {
              product.price
            }
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