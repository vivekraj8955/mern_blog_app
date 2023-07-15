import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { authAction } from "../store";
const Header = () => {
  const id = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const [value, setValue] = useState();
  if (id) {
    dispatch(authAction.login());
  }
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          "linear-gradient(90deg, hsla(192, 96%, 50%, 1) 0%, hsla(65, 92%, 54%, 1) 100%)",
      }}
    >
      <Toolbar>
        <Typography variant="h6">MyBlogs</Typography>
        <Box display="flex" marginRight={"auto"} marginLeft={"auto"}>
          <Tabs
            textColor="inherit"
            value={value}
            onChange={(e, value) => setValue(value)}
          >
            <Tab LinkComponent={Link} to="/blogs" label="All Blogs"></Tab>
            <Tab LinkComponent={Link} to="/myblogs" label="My Blogs"></Tab>
            <Tab LinkComponent={Link} to="/blogs/add" label="Add Blog"></Tab>
          </Tabs>
        </Box>
        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && (
            <>
              <Button
                LinkComponent={Link}
                to="/login"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
                color="warning"
              >
                Login
              </Button>
              <Button
                LinkComponent={Link}
                to="/login"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
                color="warning"
              >
                Signup
              </Button>
            </>
          )}
          {isLoggedIn && (
            <Button
              onClick={() => {
                dispatch(authAction.logout());
                localStorage.clear();
              }}
              LinkComponent={Link}
              to="/login"
              variant="contained"
              sx={{ margin: 1, borderRadius: 10 }}
              color="warning"
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
