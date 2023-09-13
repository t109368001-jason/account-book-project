import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Language } from "@mui/icons-material";
import { locales } from "../i18n";

const LanguageMenu = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id="language-button"
        aria-controls={open ? "language-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Language />
      </IconButton>
      <Menu
        id="language-menu"
        aria-labelledby="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          sx: { "& > :not(style)": { justifyContent: "center" } },
        }}
      >
        {Object.keys(locales).map((locale) => (
          <MenuItem
            id={`language-menu-${locale}`}
            key={locale}
            onClick={() => {
              i18n.changeLanguage(locale).then(handleClose);
            }}
          >
            {locales[locale].title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageMenu;
