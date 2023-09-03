import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { selectUser } from "../features/user/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/user/UserApi";
import { useTranslation } from "react-i18next";
import oauth2s from "../constants/oauth2";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [form, setForm] = useState({ username: "", password: "" });

  if (user.loggedIn) {
    return <Navigate to={"/account-book"} />;
  }

  const handleLoginClick = () => {
    dispatch(login(form));
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
      <Paper sx={{ borderRadius: 2 }}>
        <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
          <Typography variant="h4">{t("main.login")}</Typography>
          <Box
            display="flex"
            flexDirection="column"
            sx={{ "& > :not(style)": { my: 2 } }}
          >
            <FormControl sx={{ "& > :not(style)": { my: 2 } }}>
              <TextField
                autoFocus={true}
                value={form.username}
                label={t("main.username")}
                onChange={(event) => {
                  setForm((form) => ({
                    ...form,
                    username: event.target.value,
                  }));
                }}
              />
              <TextField
                value={form.password}
                label={t("main.password")}
                onChange={(event) => {
                  setForm((form) => ({
                    ...form,
                    password: event.target.value,
                  }));
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleLoginClick();
                  }
                }}
              />
              <Button
                // color="inherit"
                onClick={handleLoginClick}
                variant="contained"
              >
                {t("main.login")}
              </Button>
              <FormHelperText error={user.error !== undefined}>
                {t(user.error)}
              </FormHelperText>
            </FormControl>
            <Divider>or</Divider>
            {oauth2s.map((oauth2, index) => (
              <Button
                key={index}
                variant="outlined"
                startIcon={<oauth2.icon />}
                href={oauth2.path}
              >
                {oauth2.title}
              </Button>
            ))}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
