import React from "react";
import { Button } from "@mui/material";
import { setUser } from "../UserSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../services/UserService";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginClick = () => {
    const username = "admin";
    const password = "admin";
    login({ username, password }).then((res) => {
      dispatch(setUser({ username: res.data.name }));
    });
    navigate("/");
  };

  return (
    <>
      <Button color="inherit" onClick={handleLoginClick}>
        Login
      </Button>
    </>
  );
};

export default LoginPage;
