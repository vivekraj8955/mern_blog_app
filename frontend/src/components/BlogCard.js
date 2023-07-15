import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BlogCard = ({ title, description, user, image, isUser, id }) => {
  const navigate = useNavigate();
  const handleEdit = (e) => {
    navigate(`/myblogs/${id}`);
  };
  const deletRequest = async () => {
    const res = await axios
      .delete(`http://localhost:5000/api/blogs/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleDelete = (e) => {
    deletRequest()
      .then((data) => console.log(data))
      .then(() => navigate(`/blogs`));
  };
  console.log(user, isUser);
  return (
    <div>
      <Card
        sx={{
          margin: "auto",
          width: "40%",
          padding: 2,
          mt: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
            boxShadow: " 10px 10px 20px brown",
          },
        }}
      >
        {isUser && (
          <Box display="flex">
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {user[0]}
            </Avatar>
          }
          title={title}
        />
        <CardMedia
          component="img"
          height="194"
          image={image}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <b>{user} : </b>
            {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogCard;
