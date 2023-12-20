import { Button, FormControl, TextField } from "@mui/material";
import React, { useState } from "react";
import { login } from "./UserApi";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { selectUser } from "./UserSlice";
import { commonStyles } from "../../app/styles";

const AdminLoginForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [form, setForm] = useState({ username: "", password: "" });

  const handleLoginClick = () => {
    dispatch(login(form));
  };

  return (
    <FormControl fullWidth sx={commonStyles.mb4ExcludeLast}>
      <TextField
        autoFocus={true}
        value={form.username}
        label={t("main.username")}
        error={user.error !== undefined}
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
        error={user.error !== undefined}
        helperText={t(user.error)}
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
      <Button onClick={handleLoginClick} variant="contained">
        {t("main.login")}
      </Button>
    </FormControl>
  );
};

export default AdminLoginForm;
