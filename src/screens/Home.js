import React, { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Intro from "./Intro";
import AboutMe from "./AboutMe";

export default function Home(props) {
  const [visibleSections, setVisibleSections] = useState([]);
  const intro = useRef();
  const about = useRef();

  useEffect(() => {
    const revealSections = [intro, about];

    const sectionObserver = new IntersectionObserver((entries, observer) => {
      console.log(entries, observer);
    });

    revealSections.forEach((section) => {
      // sectionObserver.observe(section.current);
      console.log(section);
    });

    return function cleanUp() {
      sectionObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <>
      <Helmet title="Sander de Bruijn" />
      <Intro ref={intro} />
      <AboutMe
        ref={about}
        visible={visibleSections.includes(about.current)}
        id="about"
      />
    </>
  );
}
