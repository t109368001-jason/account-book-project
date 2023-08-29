import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { logout, selectUser } from "../UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <AppBar position={"relative"}>
      <Toolbar>
        {user.loggedIn ? (
          <>
            <Typography>{user.name}</Typography>
            <Button color="inherit" onClick={() => dispatch(logout())}>
              Logout
            </Button>
          </>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
