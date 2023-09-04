import React from "react";
import { Box, Divider, Paper, Typography } from "@mui/material";
import { selectUser } from "../features/user/UserSlice";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import { paperStyles } from "../app/styles";
import OAuth2Login from "../features/user/OAuth2Login";
import AdminLoginForm from "../features/user/AdminLoginForm";

const LoginPage = () => {
  const { t } = useTranslation();
  const user = useSelector(selectUser);

  if (user.loggedIn) {
    return <Navigate to={"/account-book"} />;
  }

  return (
    <>
      <Box />
      <Paper sx={paperStyles.absoluteCenter}>
        <Typography variant="h4">{t("main.login")}</Typography>
        <AdminLoginForm />
        <Divider>or</Divider>
        <OAuth2Login fullWidth />
      </Paper>
    </>
  );
};

export default LoginPage;
