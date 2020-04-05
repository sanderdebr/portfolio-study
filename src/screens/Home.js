import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Intro from "./Intro";
import AboutMe from "./AboutMe";

const Home = (props) => {
  const [pullBallHidden, setPullBallHidden] = useState(false);

  return (
    <>
      <Helmet title="Sander de Bruijn" />
      <Intro pullBallHidden={pullBallHidden} />
      <AboutMe />
    </>
  );
};

export default Home;
