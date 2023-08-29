import React from "react";
import { Button } from "@mui/material";
import { setUser } from "../UserSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../services/UserService";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const { t } = useTranslation();
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
        {t("main.login")}
      </Button>
    </>
  );
};

export default LoginPage;
