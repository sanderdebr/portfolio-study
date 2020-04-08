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

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections((prevSections) => [...prevSections, section]);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px" }
    );

    revealSections.forEach((section) => {
      sectionObserver.observe(section.current);
    });

    return function cleanUp() {
      sectionObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <>
      <Helmet title="Sander de Bruijn" />
      <Intro sectionRef={intro} />
      <AboutMe
        sectionRef={about}
        visible={visibleSections.includes(about.current)}
        id="about"
      />
    </>
  );
}
