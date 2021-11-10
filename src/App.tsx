import React, { FunctionComponent } from "react";
import { Routes, Route } from "react-router-dom";
//pages
import { ProductView, Home } from "./pages";

const App: FunctionComponent = (): JSX.Element => {
  return (
    <>
      <Routes>
        <Route element={<Home />} path={"/"} />
        <Route element={<ProductView />} path={"/product"} />
      </Routes>
    </>
  );
};

export default App;
