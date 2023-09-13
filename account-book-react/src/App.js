import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RecordPage from "./pages/RecordPage";
import { useDispatch } from "react-redux";
import { getUser } from "./features/user/UserApi";
import AccountBookPage from "./pages/AccountBookPage";
import ABOverview from "./pages/ABOverview";

function App() {
  const dispatch = useDispatch();
  const [init, setInit] = useState(false);

  useEffect(() => {
    dispatch(getUser()).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path={"login"} element={<LoginPage />} />
        <Route path={"account-book"} element={<AccountBookPage />}>
          <Route path={"record"} element={<RecordPage />} />
          <Route index element={<ABOverview />} />
          <Route path={"*"} element={<Navigate to="" />} />
        </Route>
        <Route index element={<IndexPage />} />
        <Route path={"*"} element={<Navigate to="" />} />
      </Routes>
    </>
  );
}

export default App;
