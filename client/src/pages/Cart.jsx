import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";

function Cart() {
  const navigate =
    useNavigate();

  const [cart, setCart] =
    useState([]);

  useEffect(() => {
    const savedCart =
      JSON.parse(
        localStorage.getItem(
          "cart"
        )
      ) || [];

    setCart(savedCart);
  }, []);

  const updateCart = (
    updatedCart
  ) => {
    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(
        updatedCart
      )
    );
  };

  const increaseQuantity = (
    index
  ) => {
    const updatedCart = [
      ...cart,
    ];

    updatedCart[
      index
    ].quantity += 1;

    updateCart(
      updatedCart
    );
  };

  const decreaseQuantity = (
    index
  ) => {
    const updatedCart = [
      ...cart,
    ];

    if (
      updatedCart[
        index
      ].quantity > 1
    ) {
      updatedCart[
        index
      ].quantity -= 1;
    } else {
      updatedCart.splice(
        index,
        1
      );

      toast.success(
        "Product removed"
      );
    }

    updateCart(
      updatedCart
    );
  };

  const removeItem = (
    index
  ) => {
    const updatedCart = [
      ...cart,
    ];

    updatedCart.splice(
      index,
      1
    );

    updateCart(
      updatedCart
    );

    toast.success(
      "Product removed"
    );
  };

  const clearCart = () => {
    localStorage.removeItem(
      "cart"
    );

    setCart([]);

    toast.success(
      "Cart cleared"
    );
  };

  const totalPrice =
    cart.reduce(
      (total, item) =>
        total +
        item.price *
          item.quantity,
      0
    );

  const placeOrder =
    async () => {
      try {
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

        const orderItems =
          cart.map(
            (
              item
            ) => ({
              productId:
                item._id,
              name:
                item.name,
              image:
                item.image,
              price:
                item.price,
              quantity:
                item.quantity,
            })
          );

        await API.post(
          "/api/orders",
          {
            items:
              orderItems,
            totalAmount:
              totalPrice,
          },
          {
            headers:
              {
                Authorization: `Bearer ${token}`,
              },
          }
        );

        localStorage.removeItem(
          "cart"
        );

        setCart([]);

        toast.success(
          "Order placed successfully"
        );

        navigate(
          "/my-orders"
        );
      } catch (error) {
        console.log(
          error
        );

        toast.error(
          "Failed to place order"
        );
      }
    };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-5xl font-bold text-center mb-6">
        Your Cart
      </h1>

      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() =>
            navigate("/")
          }
          className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          ← Continue
          Shopping
        </button>

        {cart.length >
          0 && (
          <button
            onClick={
              clearCart
            }
            className="bg-red-500 text-white px-5 py-3 rounded-xl hover:bg-red-600 transition"
          >
            Clear Cart
          </button>
        )}
      </div>

      {cart.length ===
      0 ? (
        <p className="text-center text-2xl text-gray-500 mt-20">
          Your cart is
          empty 🛒
        </p>
      ) : (
        <div className="max-w-5xl mx-auto space-y-6">
          {cart.map(
            (
              item,
              index
            ) => (
              <div
                key={
                  index
                }
                className="bg-white rounded-3xl shadow-lg p-6 flex items-center justify-between"
              >
                <div className="flex items-center gap-6">
                  <img
                    src={
                      item.image
                    }
                    alt={
                      item.name
                    }
                    className="w-32 h-32 object-cover rounded-2xl"
                  />

                  <div>
                    <h2 className="text-3xl font-bold">
                      {
                        item.name
                      }
                    </h2>

                    <p className="text-gray-500 text-xl mt-1">
                      ₹
                      {
                        item.price
                      }
                    </p>

                    <div className="flex items-center gap-4 mt-4">
                      <button
                        onClick={() =>
                          decreaseQuantity(
                            index
                          )
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded-lg text-xl hover:bg-red-600"
                      >
                        -
                      </button>

                      <span className="text-2xl font-semibold">
                        {
                          item.quantity
                        }
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(
                            index
                          )
                        }
                        className="bg-green-500 text-white px-4 py-2 rounded-lg text-xl hover:bg-green-600"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    removeItem(
                      index
                    )
                  }
                  className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition"
                >
                  Remove
                </button>
              </div>
            )
          )}

          {/* Total + Place Order */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-4xl font-bold">
                Total:
              </h2>

              <h2 className="text-5xl font-bold text-green-600">
                ₹
                {totalPrice}
              </h2>
            </div>

            <button
              onClick={
                placeOrder
              }
              className="w-full bg-green-600 text-white py-4 rounded-2xl text-xl font-semibold hover:bg-green-700 transition"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;