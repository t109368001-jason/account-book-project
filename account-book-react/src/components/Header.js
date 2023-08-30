import React from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import LanguageMenu from "./LanguageMenu";
import UserMenu from "./UserMenu";

const Header = () => {
  return (
    <AppBar position={"relative"}>
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
