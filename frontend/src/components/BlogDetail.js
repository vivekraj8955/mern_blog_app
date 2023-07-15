import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BlogDetail = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const id = useParams().id;
  const [input, setinput] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });
  const fetchDetail = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/blogs/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    fetchDetail().then((data) => {
      setBlog(data.blog);
      setinput({
        title: data.blog.title,
        description: data.blog.description,
        imageUrl: data.blog.image,
      });
    });
  }, [id]);
  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:5000/api/blogs/update/${id}`, {
        title: input.title,
        description: input.description,
        image: input.imageUrl,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleChange = (e) => {
    setinput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/myblogs"));
  };

  return (
    <div>
      {input && (
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Box
            border={3}
            borderColor={
              "linear-gradient(90deg, hsla(192, 96%, 50%, 1) 0%, hsla(65, 92%, 54%, 1) 100%)"
            }
            borderRadius={10}
            boxShadow={"10px 10px 20px #ccc"}
            margin={3}
            display={"flex"}
            flexDirection={"column"}
            width={"80%"}
            paddingLeft={2}
            paddingRight={2}
          >
            <Typography
              fontWeight={"bold"}
              padding={3}
              variant="h2"
              textAlign={"center"}
            >
              Update Your Blog
            </Typography>
            <InputLabel
              sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
            >
              Title
            </InputLabel>
            <TextField
              onChange={handleChange}
              name="title"
              value={input.title}
              margin="normal"
              variant="outlined"
            ></TextField>
            <InputLabel
              sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
            >
              Description
            </InputLabel>
            <TextField
              onChange={handleChange}
              name="description"
              value={input.description}
              margin="normal"
              variant="outlined"
            ></TextField>
            <InputLabel
              sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
            >
              ImageUrl
            </InputLabel>
            <TextField
              onChange={handleChange}
              name="imageUrl"
              value={input.imageUrl}
              margin="normal"
              variant="outlined"
            ></TextField>
            <Button
              color="warning"
              sx={{
                maxWidth: "40%",
                margin: "auto",
                width: "25%",
                borderRadius: "20px",
                marginBottom: "5px",
              }}
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default BlogDetail;
