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
import { setUser } from "../features/user/UserSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../services/UserService";
import { useTranslation } from "react-i18next";
import oauth2s from "../constants/oauth2";

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(undefined);

  const handleLoginClick = () => {
    setError(undefined);
    login(form)
      .then((res) => {
        dispatch(setUser(res.data));
        navigate("/account-book");
      })
      .catch(() => {
        setError(t("main.invalidNamePass"));
      });
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
              <FormHelperText error={error !== undefined}>
                {error}
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
