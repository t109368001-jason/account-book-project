import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { clearUser, selectUser } from "../features/user/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../services/UserService";
import { useTranslation } from "react-i18next";
import { AccountCircle, Language } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const locales = {
  en: { title: "English" },
  "zh-TW": { title: "中文" },
};

const Header = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [lanMenuAnchorEl, setLanMenuAnchorEl] = useState(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  const lanMenuOpen = Boolean(lanMenuAnchorEl);
  const userMenuOpen = Boolean(userMenuAnchorEl);
  console.log({ user });

  const handleLanMenuClick = (event) => {
    setLanMenuAnchorEl(event.currentTarget);
  };
  const handleLanMenuClose = () => {
    setLanMenuAnchorEl(null);
  };

  const handleUserMenuClick = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };
  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const handleLogoutClick = () => {
    logout().then(() => {
      dispatch(clearUser());
      navigate("/login");
    });
  };

  const renderLanguageMenu = (
    <Menu
      id="demo-positioned-menu"
      aria-labelledby="demo-positioned-button"
      anchorEl={lanMenuAnchorEl}
      open={lanMenuOpen}
      onClose={handleLanMenuClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      MenuListProps={{
        sx: { "& > :not(style)": { justifyContent: "center" } },
      }}
    >
      {Object.keys(locales).map((locale) => (
        <MenuItem
          key={locale}
          onClick={() => {
            i18n.changeLanguage(locale);
            handleLanMenuClose();
          }}
        >
          {locales[locale].title}
        </MenuItem>
      ))}
    </Menu>
  );

  const renderUserMenu = (
    <Menu
      id="demo-positioned-menu"
      aria-labelledby="demo-positioned-button"
      anchorEl={userMenuAnchorEl}
      open={userMenuOpen}
      onClose={handleUserMenuClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      MenuListProps={{
        sx: { "& > :not(style)": { justifyContent: "center" } },
      }}
    >
      {user.loggedIn && (
        <MenuItem>
          <Typography>{user.name}</Typography>
        </MenuItem>
      )}
      <MenuItem
        onClick={() => {
          handleUserMenuClose();
        }}
      >
        {user.loggedIn ? (
          <>
            <Button color="inherit" onClick={handleLogoutClick}>
              {t("main.logout")}
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" to={"/login"} component={Link}>
              {t("main.login")}
            </Button>
          </>
        )}
      </MenuItem>
    </Menu>
  );
  return (
    <AppBar position={"relative"}>
      <Toolbar>
        <Typography>Account Book</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          id="demo-positioned-button"
          aria-controls={lanMenuOpen ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={lanMenuOpen ? "true" : undefined}
          onClick={handleLanMenuClick}
        >
          <Language />
        </IconButton>
        <IconButton
          id="demo-positioned-button"
          aria-controls={userMenuOpen ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={userMenuOpen ? "true" : undefined}
          onClick={handleUserMenuClick}
        >
          <AccountCircle />
        </IconButton>
        {renderLanguageMenu}
        {renderUserMenu}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
