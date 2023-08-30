import React, { useEffect } from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RecordPage from "./pages/RecordPage";
import { useDispatch } from "react-redux";
import { setUser } from "./features/user/UserSlice";
import { getUser } from "./services/UserService";

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
      <Routes>
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/record"} element={<RecordPage />} />
        <Route path={"*"} element={<IndexPage />} />
      </Routes>
    </>
  );
}

export default App;
