import { useContext } from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const { user, logout } =
    useContext(AuthContext);

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
      {/* LEFT */}
      <div className="flex items-center gap-6">
        {/* LOGO */}
        <Link to="/">
          <h2 className="font-bold text-3xl cursor-pointer">
            TaskFlow
          </h2>
        </Link>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* LOGGED IN */}
        {user ? (
          <>
            {/* USER */}
            <p className="font-medium text-lg">
              {user.name} (
              {user.role})
            </p>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* LOGIN */}
            {location.pathname !==
              "/login" && (
              <Link to="/login">
                <button className="border border-black px-5 py-2 rounded-lg hover:bg-black hover:text-white transition cursor-pointer">
                  Login
                </button>
              </Link>
            )}

            {/* SIGNUP */}
            {location.pathname !==
              "/signup" && (
              <Link to="/signup">
                <button className="bg-black text-white px-5 py-2 rounded-lg hover:opacity-90 transition cursor-pointer">
                  Signup
                </button>
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;