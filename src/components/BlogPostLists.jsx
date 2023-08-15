import React, { useState, useEffect } from "react";
import {
  faEdit,
  faTrash,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function BlogPostLists() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get("https://blog-server1.vercel.app/api/posts");
        setBlogPosts(response.data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchBlogPosts();
  }, []);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to filter blog posts based on search term
  const filteredBlogPosts = blogPosts.filter((post) => {
    return (
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleDelete = async (postId) => {
    // Get the JWT token from localStorage
    const token = localStorage.getItem("token");

    // Check if the token exists
    if (!token) {
      console.error("Unauthorized user. Please log in.");
      navigate("/login"); // Redirect to login page
      return;
    }

    try {
      const response = await axios.delete(
        `https://blog-server1.vercel.app/api/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Post deleted:", response.data);

      // Filter out the deleted post from the list
      setBlogPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== postId)
      );

      alert("Post deleted successfully!");
     
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Function to truncate text and show limited words
  const truncateText = (text, limit) => {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + " ...";
    }
    return text;
  };

  return (
    <div className="max-w-6xl p-6 mt-4 ml-auto mr-auto bg-white border border-gray-200 rounded-lg shadow pr-4 border-r">
      <div className="mb-4 flex justify-between">
        <h1 className="text-2xl font-semibold mb-4">All posts</h1>
        <div className="flex items-center border rounded-lg overflow-hidden">
          <input
            type="text"
            className="w-full p-4 py-2"
            placeholder="Search post"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="text-gray-500 px-2 py-1 rounded">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
      <ul className="space-y-4">
        {filteredBlogPosts.map((post) => (
          <li key={post._id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2">
              {truncateText(post.content, 50)}
              <Link
                to={`/post/${post._id}`}
                className="text-blue-500 hover:underline"
              >
                See More
              </Link>{" "}
            </p>

            <div className="flex items-center mt-2">
              <FontAwesomeIcon icon={faUser} className="mr-2 text-gray-500" />
              <p>{post.author}</p>
            </div>
            <p className="mt-2">{new Date(post.createdAt).toLocaleString()}</p>

            <div className="mt-4 flex space-x-2">
              <Link
                to={`/edit/${post._id}`}
                className="text-gray-500 px-2 py-1 rounded"
              >
                <FontAwesomeIcon icon={faEdit} /> Edit
              </Link>
              <button
                className="text-gray-500 px-2 py-1 rounded"
                onClick={() => handleDelete(post._id)}
              >
                <FontAwesomeIcon icon={faTrash} /> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BlogPostLists;
