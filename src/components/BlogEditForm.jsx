import React, { useState } from "react";
import axios from "axios";
import { useNavigate  } from "react-router-dom";

const BlogEditForm = ({ post }) => {
  const [formData, setFormData] = useState({
    title: post.title,
    content: post.content,
    author: post.author,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the JWT token from localStorage
    const token = localStorage.getItem("token");

    // Check if the token exists
    if (!token) {
      console.error("Authentication token missing.");
      return;
    }

    try {
      const response = await axios.patch(
        `https://blog-server1.vercel.app/api/posts/${post._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Post updated:", response.data);
      setFormData({
        title: "",
        content: "",
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
      <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 p-2 border rounded w-full focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content:
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            className="mt-1 p-2 border rounded w-full h-32 focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700"
          >
            Author:
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="mt-1 p-2 border rounded w-full focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Update Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogEditForm;
