import { Link, useNavigate } from "react-router-dom";

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
    <nav
      style={{
        padding: "20px",
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid gray",
      }}
    >
      <Link to="/">
        <h2>CodeAlpha Store</h2>
      </Link>

      <div>
        <Link
          to="/cart"
          style={{
            marginRight: "20px",
          }}
        >
          Cart
        </Link>

        {user ? (
          <>
            <span
              style={{
                marginRight: "20px",
              }}
            >
              Hello, {user.name}
            </span>

            <button onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              Login
            </Link>

            {" | "}

            <Link to="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;