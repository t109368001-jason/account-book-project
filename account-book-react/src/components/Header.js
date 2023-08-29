import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { clearUser, selectUser } from "../UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../services/UserService";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogoutClick = () => {
    logout().then(() => {
      dispatch(clearUser());
    });
  };

  return (
    <AppBar position={"relative"}>
      <Toolbar>
        {user.loggedIn ? (
          <>
            <Typography>{user.name}</Typography>
            <Button color="inherit" onClick={handleLogoutClick}>
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
