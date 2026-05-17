import {
  Link,
  useNavigate,
} from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <Link to="/">
        <h2 className="text-2xl font-bold text-blue-600">
          CodeAlpha Store
        </h2>
      </Link>

      <div className="flex items-center gap-5">
        <Link
          to="/cart"
          className="font-medium hover:text-blue-600 transition"
        >
          Cart
        </Link>

        {user ? (
          <>
            <span className="text-gray-700">
              Hello, {user.name}
            </span>

            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="hover:text-blue-600 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;