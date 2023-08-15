import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BlogEditForm from "../components/BlogEditForm";

function EditPostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSinglePost();
  }, []);

  const fetchSinglePost = async () => {
    try {
      // Get the JWT token from localStorage
      const token = localStorage.getItem("token");

      // Check if the token exists
      if (!token) {
        console.error("Authentication token missing.");
        // Redirect the user to the login page
        navigate("/login");
        return;
      }

      // Set the Authorization header with the token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `https://blog-server1.vercel.app/api/posts/${postId}`,
        config
      );
      setPost(response.data);
      
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl p-6 mt-10 ml-auto mr-auto bg-white border border-gray-200 rounded-lg shadow pr-4 border-r">
      <h2 className="text-2xl text-center font-semibold mb-4">Edit Post</h2>
      <BlogEditForm post={post} />
    </div>
  );
}

export default EditPostPage;
