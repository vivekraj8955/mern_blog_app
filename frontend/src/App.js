import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login";
import Blog from "./components/Blog";
import UserBlog from "./components/UserBlog";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import { useSelector } from "react-redux";
function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return (
    <>
      <header>
        <Header></Header>
      </header>
      <main>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/blogs" element={<Blog />}></Route>
          <Route path="blogs/add" element={<AddBlog />}></Route>
          <Route path="/myblogs" element={<UserBlog />}></Route>
          <Route path="myblogs/:id" element={<BlogDetail />}></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
