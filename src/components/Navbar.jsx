import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the authentication token from local storage
    localStorage.removeItem("token");
    // Navigate to the login page after successful logout
    navigate("/login");
  };

  return (
    <nav className="bg-gray-600 p-4">
      <ul className="flex justify-center space-x-4">
        <li>
          <Link
            to="/"
            className="text-white font-bold hover:text-blue-500 transition"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/create-post"
            className="text-white font-bold hover:text-blue-500 transition"
          >
            Add post
          </Link>
        </li>
        {localStorage.getItem("token") ? (
          // If authenticated, show Logout button
          <li>
            <button
              onClick={handleLogout}
              className="text-white font-bold hover:text-blue-500 transition"
            >
              Logout
            </button>
          </li>
        ) : (
          // If not authenticated, show Login link
          <li>
            <Link
              to="/login"
              className="text-white font-bold hover:text-blue-500 transition"
            >
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
