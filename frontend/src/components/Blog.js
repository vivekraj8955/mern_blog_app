import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "./BlogCard";

const Blog = () => {
  const [blogs, setblogs] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/api/blogs")
      .catch((err) => console.log(err));
    const data = res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setblogs(data.blogs));
  }, [blogs]);
  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
          <BlogCard
            id={blog._id}
            isUser={localStorage.getItem("userId") === blog.user._id}
            title={blog.title}
            description={blog.description}
            user={blog.user.name}
            image={blog.image}
          ></BlogCard>
        ))}
    </div>
  );
};

export default Blog;
