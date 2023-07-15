const express = require("express");
const {
  getAllblogs,
  addBlog,
  updateBlog,
  getById,
  deletBlog,
  getByUserId,
} = require("../controllers/blog-controller");

const blogRouter = express.Router();

blogRouter.get("/", getAllblogs);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.get("/:id", getById);
blogRouter.delete("/:id", deletBlog);
blogRouter.get("/user/:id", getByUserId);

module.exports = blogRouter;
