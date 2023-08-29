import React from "react";
import { Button } from "@mui/material";
import { login } from "../UserSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginClick = () => {
    dispatch(login({ name: "User" }));
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
