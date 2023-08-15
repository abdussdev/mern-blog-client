import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

const BlogAddEditForm = ({ onSubmit }) => {
  // State for form inputs
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    createdAt: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      const authorName = decodedToken.name;

      setFormData((prevData) => ({
        ...prevData,
        author: authorName,
      }));
    }
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: "",
      content: "",
      createdAt: "",
    });
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogAddEditForm;
