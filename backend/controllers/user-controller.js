const User = require("../models/User");
const bcrypt = require("bcryptjs");

//############################################## getalluser  #################################################
const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return console.log(err);
  }
  if (!users) {
    res.status(404).json({
      message: "no user found",
    });
  }
  return res.status(200).json({ users });
};

//##############################################  signup  ####################################################
const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  const hashedpassword = bcrypt.hashSync(password);

  let existinguser;
  try {
    existinguser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (existinguser) {
    res.status(400).json({
      message: "user  already exist",
    });
  }
  const user = new User({
    name,
    email,
    password: hashedpassword,
    blogs: [],
  });
  try {
    await user.save();
    console.log("signup successfull");
    return res.status(201).json({
      user,
    });
  } catch (err) {
    return console.log(err);
  }
};

// ################################################### login  ############################################
const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existinguser;
  try {
    existinguser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existinguser) {
    return res.status(400).json({
      message: "user not found with this id",
    });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existinguser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({
      message: "Incorrect password",
    });
  }
  console.log("login successfull");
  return res.status(200).json({
    message: "Login successful",
    user: existinguser,
  });
};
module.exports = { getAllUser, signup, login };
