import React, { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import Intro from "./Intro";

const Home = props => {
  return (
    <Fragment>
      <Helmet title="Sander de Bruijn" />
      <Intro />
    </Fragment>
  );
};

export default Home;
