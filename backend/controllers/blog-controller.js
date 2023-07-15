const { default: mongoose } = require("mongoose");
const Blog = require("../models/Blog");
const User = require("../models/User");

// ##################################### getting all blogs ################################################
const getAllblogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find().populate("user");
  } catch (err) {
    return console.log(err);
  }
  if (!blogs) {
    return res.status(400).json({
      message: "no blogs found",
    });
  }
  return res.status(200).json({ blogs });
};

// ###################################### add blog #########################################################
const addBlog = async (req, res, next) => {
  const { title, description, user, image } = req.body;
  let existinguser;
  try {
    existinguser = await User.findById(user);
  } catch (err) {
    console.log(err);
  }
  if (!existinguser)
    return res.status(400).json({ message: "unable to find user by this id" });

  const blog = new Blog({ title, description, user, image });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existinguser.blogs.push(blog);
    await existinguser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
  console.log("blog added successfully");
  return res.status(200).json({ blog });
};
// ################################### update blog #########################################################
const updateBlog = async (req, res, next) => {
  const blogId = req.params.id;
  const { title, description, image } = req.body;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, { title, description, image });
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    res.status(400).json({ message: "unable to update" });
  }
  res.status(200).json({ blog });
};

// ########################### get by id   #################################################################
const getById = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!blog) {
    return res.status(400).json({ message: "no blog found" });
  }
  console.log("find blog by id seccessfull");
  return res.status(200).json({ blog });
};

// ################################### delete ##############################################################
const deletBlog = async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  let blog;
  try {
    blog = await Blog.findByIdAndRemove(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (err) {
    console.log(err);
  }
  if (!blog) return res.status(400).json({ message: "unable to delete" });

  return res.status(200).json({ message: "blog deleted successfully" });
};

// ################################# geeting user by id ####################################################
const getByUserId = async (req, res, next) => {
  const id = req.params.id;
  let userBlogs;
  try {
    userBlogs = await User.findById(id).populate("blogs");
  } catch (err) {
    console.log("error in findbyid");
    return console.log(err);
  }
  if (!userBlogs) return res.status(400).json({ message: "no blogs found" });
  console.log("blog by userid");
  return res.status(200).json({ blogs: userBlogs });
};

module.exports = {
  getAllblogs,
  addBlog,
  updateBlog,
  getById,
  deletBlog,
  getByUserId,
};
