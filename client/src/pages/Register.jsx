import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

function Register() {
  const navigate =
    useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const handleRegister =
    async (e) => {
      e.preventDefault();

      setLoading(true);

      try {
        await API.post(
          "/auth/register",
          {
            name,
            email,
            password,
          }
        );

        toast.success(
          "Registration successful"
        );

        navigate(
          "/login"
        );
      } catch (error) {
        toast.error(
          error.response
            ?.data
            ?.message ||
            "Registration failed"
        );
      } finally {
        setLoading(
          false
        );
      }
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex justify-center items-center px-4">
      <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-10 border border-gray-200 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-blue-600">
          Register
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Create your
          account to
          continue
        </p>

        <form
          onSubmit={
            handleRegister
          }
          className="space-y-5"
        >
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target
                  .value
              )
            }
            className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target
                  .value
              )
            }
            className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target
                  .value
              )
            }
            className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />

          <button
            type="submit"
            disabled={
              loading
            }
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:scale-[1.02] transition duration-300 disabled:opacity-70"
          >
            {loading
              ? "Registering..."
              : "Register"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an
          account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;