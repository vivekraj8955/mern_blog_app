import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";

const UserBlog = () => {
  const [blogs, setBlogs] = useState();
  const [name, setName] = useState();
  const id = localStorage.getItem("userId");
  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/blogs/user/${id}`)
      .catch((err) => console.log(err));
    const data = res.data;
    setName(data.blogs.name);
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs.blogs));
  }, []);
  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
          <BlogCard
            id={blog._id}
            title={blog.title}
            isUser={true}
            description={blog.description}
            user={name}
            image={blog.image}
          ></BlogCard>
        ))}
    </div>
  );
};

export default UserBlog;
