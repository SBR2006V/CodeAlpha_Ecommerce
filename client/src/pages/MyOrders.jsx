import {
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import API from "../services/api";
import {
  useNavigate,
} from "react-router-dom";

function MyOrders() {
  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const navigate =
    useNavigate();

  useEffect(() => {
    const fetchOrders =
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

          const res =
            await API.get(
              "/api/orders/my-orders",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

          setOrders(
            res.data
          );
        } catch (error) {
          console.log(
            error
          );

          toast.error(
            "Failed to load orders"
          );
        } finally {
          setLoading(
            false
          );
        }
      };

    fetchOrders();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl font-semibold">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-5xl font-bold text-center mb-10">
        My Orders
      </h1>

      {orders.length ===
      0 ? (
        <p className="text-center text-2xl text-gray-500">
          No orders found
        </p>
      ) : (
        <div className="max-w-5xl mx-auto space-y-8">
          {orders.map(
            (order) => (
              <div
                key={
                  order._id
                }
                className="bg-white rounded-3xl shadow-lg p-8"
              >
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">
                      Order Status:{" "}
                      <span className="text-green-600">
                        {
                          order.status
                        }
                      </span>
                    </h2>

                    <p className="text-gray-500 mt-1">
                      {new Date(
                        order.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>

                  <h2 className="text-3xl font-bold text-green-600">
                    ₹
                    {
                      order.totalAmount
                    }
                  </h2>
                </div>

                <div className="space-y-4">
                  {order.items.map(
                    (
                      item,
                      index
                    ) => (
                      <div
                        key={
                          index
                        }
                        className="flex items-center gap-5 border-b pb-4"
                      >
                        <img
                          src={
                            item.image
                          }
                          alt={
                            item.name
                          }
                          className="w-24 h-24 rounded-xl object-cover"
                        />

                        <div>
                          <h3 className="text-xl font-bold">
                            {
                              item.name
                            }
                          </h3>

                          <p className="text-gray-500">
                            ₹
                            {
                              item.price
                            }
                          </p>

                          <p>
                            Quantity:{" "}
                            {
                              item.quantity
                            }
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default MyOrders;