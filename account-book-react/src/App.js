import React from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"*"} element={<IndexPage />} />
      </Routes>
    </>
  );
}

export default App;
