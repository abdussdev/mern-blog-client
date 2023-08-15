import React, { useState } from "react";
import { Link,  useNavigate  } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://blog-server1.vercel.app/api/login",
        formData
      );
      // Handle successful login
      const { token } = response.data;
      // Store the token in local storage
      localStorage.setItem("token", token);
      console.log("Login successful. Token:", token);

      // Redirect to the home page after successful login
      navigate("/", { replace: true });
    } catch (error) {
      // Handle login error
      console.error("Error logging in:", error);
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded shadow-md w-full md:w-1/3">
        <h2 className="text-2xl text-center font-semibold mb-4">Login</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-medium mb-1">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleFormChange}
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
