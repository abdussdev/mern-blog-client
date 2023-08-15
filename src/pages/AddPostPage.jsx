import axios from "axios";
import BlogAddEditForm from "../components/BlogAddForm";
import { useNavigate } from "react-router-dom";

const AddPostPage = () => {
  const navigate = useNavigate();

  // Handle form submission
  const handlePostSubmit = async (formData) => {
    try {
      // Get the JWT token from localStorage
      const token = localStorage.getItem("token");

      // Check if the token exists
      if (!token) {
        console.error("Unauthorized user. Please log in.");
        navigate("/login"); // Redirect to login page
        return;
      }

      // Set the Authorization header with the token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Make the POST request with form data and token
      const response = await axios.post(
        "https://blog-server1.vercel.app/api/post",
        formData,
        config
      );
      navigate("/");
      console.log("Post created:", response.data);
      // Do something with the response, if needed
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="max-w-4xl p-6 mt-10 ml-auto mr-auto bg-white border border-gray-200 rounded-lg shadow pr-4 border-r">
      <h2 className="text-2xl text-center font-semibold mb-4">Create a post</h2>
      <BlogAddEditForm onSubmit={handlePostSubmit} />
    </div>
  );
};

export default AddPostPage;
