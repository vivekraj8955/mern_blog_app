const express = require("express");
const mongoose = require("mongoose");

const router = require("./routes/user-routes");
const blogRouter = require("./routes/blog-routes");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/user", router);
app.use("/api/blogs", blogRouter);

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.4ddyftk.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() =>
    app.listen(5000, () => {
      console.log("server running on port : 5000");
    })
  )
  .catch((err) => console.log(err));
