import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { selectUser } from "../features/user/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/user/UserApi";
import { useTranslation } from "react-i18next";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleClose();
    dispatch(logout());
    navigate("/login");
  };

  const handleLoginClick = () => {
    handleClose();
    navigate("/login");
  };

  return (
    <>
      <IconButton
        aria-controls={open ? "user-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <AccountCircle />
      </IconButton>

      <Menu
        id="user-menu"
        aria-labelledby="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          sx: { "& > :not(style)": { justifyContent: "center" } },
        }}
      >
        {!user.loggedIn && (
          <MenuItem id="user-menu-logout" onClick={handleLoginClick}>
            {t("main.login")}
          </MenuItem>
        )}
        {user.loggedIn && <MenuItem id="user-menu-name">{user.name}</MenuItem>}
        {user.loggedIn && (
          <MenuItem id="user-menu-login" onClick={handleLogoutClick}>
            {t("main.logout")}
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default UserMenu;
