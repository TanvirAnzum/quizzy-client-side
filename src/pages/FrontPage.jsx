import React from "react";
import Consumers from "../components/frontpage/Consumers";
import Content from "../components/frontpage/Content";
import Features from "../components/frontpage/Features";
import Overview from "../components/frontpage/Overview";

const FrontPage = () => {
  return (
    <>
      <Content />
      <Features />
      <Overview />
      <Consumers />
    </>
  );
};

export default FrontPage;
