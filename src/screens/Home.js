import React, { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import Intro from "./Intro";
import AboutMe from "./AboutMe";

const Home = props => {
  return (
    <Fragment>
      <Helmet title="Sander de Bruijn" />
      <Intro />
      <AboutMe />
    </Fragment>
  );
};

export default Home;
