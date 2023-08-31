import React, { useEffect } from "react";
import Header from "./components/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RecordPage from "./pages/RecordPage";
import { useDispatch } from "react-redux";
import { setUser } from "./features/user/UserSlice";
import { getUser } from "./services/UserService";
import AccountBookPage from "./pages/AccountBookPage";
import ABOverview from "./pages/ABOverview";

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
        <Route index element={<IndexPage />} />
        <Route path={"login"} element={<LoginPage />} />
        <Route path={"account-book"} element={<AccountBookPage />}>
          <Route index element={<ABOverview />} />
          <Route path={"record"} element={<RecordPage />} />
          <Route path={"*"} element={<Navigate to="" />} />
        </Route>
        <Route path={"*"} element={<Navigate to="" />} />
      </Routes>
    </>
  );
}

export default App;
