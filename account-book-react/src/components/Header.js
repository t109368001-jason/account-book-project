import React, { useState } from "react";
import {
  AppBar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { clearUser, selectUser } from "../UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../services/UserService";
import { useTranslation } from "react-i18next";
import { Language } from "@mui/icons-material";
import { Link } from "react-router-dom";

const locales = {
  en: { title: "English" },
  "zh-TW": { title: "中文" },
};

const Header = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    logout().then(() => {
      dispatch(clearUser());
    });
  };

  return (
    <AppBar position={"relative"}>
      <Toolbar>
        <IconButton
          id="demo-positioned-button"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <Language />
        </IconButton>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          {Object.keys(locales).map((locale) => (
            <MenuItem
              key={locale}
              onClick={() => {
                i18n.changeLanguage(locale);
                handleClose();
              }}
            >
              {locales[locale].title}
            </MenuItem>
          ))}
        </Menu>
        {user.loggedIn ? (
          <>
            <Typography>{user.name}</Typography>
            <Button color="inherit" onClick={handleLogoutClick}>
              {t("main.logout")}
            </Button>
          </>
        ) : (
          <Button color="inherit" to={"/login"} component={Link}>
            {t("main.login")}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
