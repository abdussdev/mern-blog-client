import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import SinglePostPage from "./pages/SinglePostPage";
import EditPostPage from "./pages/EditPostPage";
import AddPostPage from "./pages/AddPostPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

export default function App() {
 
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-post" element={<AddPostPage />} />
          <Route path="/post/:postId" element={<SinglePostPage />} />
          <Route path="/edit/:postId" element={<EditPostPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
