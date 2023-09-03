import React from "react";
import SideBar from "../components/SideBar";
import { Navigate, Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/UserSlice";

const AccountBookPage = () => {
  const user = useSelector(selectUser);
  if (!user.loggedIn) {
    return <Navigate to={"/login"} />;
  }
  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, "& > :not(style)": { mb: 2 } }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AccountBookPage;
