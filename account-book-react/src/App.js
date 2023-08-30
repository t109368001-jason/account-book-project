import React, { useEffect } from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RecordPage from "./pages/RecordPage";
import { useDispatch } from "react-redux";
import { setUser } from "./features/user/UserSlice";
import { getUser } from "./services/UserService";
import { Box } from "@mui/material";

const bodyMargin = 2;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getUser().then((res) => {
      dispatch(setUser({ username: res.data.name }));
    });
  }, []);

  return (
    <>
      <Header />
      <Box
        sx={{
          width: `calc(100% - ${bodyMargin}rem)`,
          height: `calc(100% - ${bodyMargin}rem)`,
          m: bodyMargin,
        }}
      >
        <Routes>
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/record"} element={<RecordPage />} />
          <Route path={"*"} element={<IndexPage />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
