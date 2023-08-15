import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SinglePostPage() {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    fetchSinglePost();
    fetchComments();
  }, []);

  const fetchSinglePost = async () => {
    try {
      const response = await axios.get(
        `https://blog-server1.vercel.app/api/posts/${postId}`
      );
      setPost(response.data);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  

  const fetchComments = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Authentication token missing.");
        return;
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(
        `https://blog-server1.vercel.app/api/posts/comments/${postId}`,
        { headers }
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Unauthorized user. Please log in.");
        navigate("/login"); // Redirect to login page
        return;
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        `https://blog-server1.vercel.app/api/posts/comments/${postId}`,
        // Provide the comment text in the request body
        { text: commentText }, // Use the correct field name here
        { headers }
      );

      console.log("Comment added:", response.data);

      setComments([...comments, response.data]);

      // Clear the comment input
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (!post) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="max-w-6xl p-6 mt-4 ml-auto mr-auto bg-white border border-gray-200 rounded-lg shadow pr-4 border-r">
      <h2 className="text-3xl font-semibold mb-4">{post.title}</h2>
      <p className="mb-4">{post.content}</p>
      <div className="flex items-center mt-2">
        <FontAwesomeIcon icon={faUser} className="mr-2 text-gray-500" />
        <p>{post.author}</p>
      </div>
      <p className="text-gray-400 mb-2">
        {new Date(post.createdAt).toLocaleString()}
      </p>
      <form>
        <ul>
          
        </ul>
      </form>

      {/* Display Comments */}
      {comments.map((comment) => (
        <div key={comment._id} className="mb-2 border p-2 rounded-lg">
          <p>{comment.text}</p>
          <p className="text-gray-400">
            By {comment.author} on{" "}
            {new Date(comment.createdAt).toLocaleString()}
          </p>
        </div>
      ))}

      {/* Comment Form */}
      <form onSubmit={handleCommentSubmit} className="mb-4">
        <label htmlFor="comment" className="block mb-1 font-medium">
          Add Comment:
        </label>
        <textarea
          id="comment"
          name="comment"
          value={commentText} // Use the updated state name
          onChange={(e) => setCommentText(e.target.value)} // Use the updated state setter
          rows="4"
          className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mt-2"
        >
          Add Comment
        </button>
      </form>
    </div>
  );
}

export default SinglePostPage;
