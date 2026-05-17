import {useEffect,useState,} from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
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

  const removeItem = (
    indexToRemove
  ) => {
    const updatedCart =
      cart.filter(
        (_, index) =>
          index !==
          indexToRemove
      );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(
        updatedCart
      )
    );
  };

  const totalPrice =
    cart.reduce(
      (acc, item) =>
        acc + item.price,
      0
    );

    const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Your Cart
      </h1>

      <button
  onClick={() => navigate("/")}
  className="mb-8 bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
>
  ← Continue Shopping
</button>

      {cart.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-2xl text-gray-600">
            Your cart is empty 🛒
          </h2>
        </div>
      ) : (
        <>
          <div className="max-w-4xl mx-auto space-y-6">
            {cart.map(
              (
                item,
                index
              ) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-md p-5 flex justify-between items-center"
                >
                  <div className="flex items-center gap-5">
                    <img
                      src={
                        item.image
                      }
                      alt={
                        item.name
                      }
                      className="w-28 h-28 object-cover rounded-xl"
                    />

                    <div>
                      <h2 className="text-2xl font-semibold">
                        {
                          item.name
                        }
                      </h2>

                      <p className="text-gray-500">
                        ₹
                        {
                          item.price
                        }
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      removeItem(
                        index
                      )
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
                  >
                    Remove
                  </button>
                </div>
              )
            )}
          </div>

          <div className="max-w-4xl mx-auto mt-8 bg-white rounded-2xl shadow-md p-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              Total:
            </h2>

            <h2 className="text-3xl font-bold text-green-600">
              ₹
              {totalPrice}
            </h2>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;