import React from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import LanguageMenu from "./LanguageMenu";
import UserMenu from "./UserMenu";

const Header = () => {
  return (
    <AppBar
      position={"relative"}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography>Account Book</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <LanguageMenu />
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
