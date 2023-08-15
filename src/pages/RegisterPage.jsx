import React, { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();
  // State for form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://blog-server1.vercel.app/api/register",
        formData
      );
      console.log("User registered:", response.data);
      // Do something with the response, if needed
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error registering:", error);
    }

    // Reset form inputs after submission
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full md:w-1/3">
        <h2 className="text-2xl text-center font-semibold mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              Name:
            </label>
            <input
              type="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block font-medium mb-1">
              Confirm Password:
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Register
          </button>
        </form>
        <p className="mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
