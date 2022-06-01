import React from "react";
import { Helmet } from "react-helmet-async";
import { ProductShow } from "../page";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <div className="banner"></div>
      <div>
        {" "}
        <ProductShow />{" "}
      </div>
    </>
  );
};

export default Home;
