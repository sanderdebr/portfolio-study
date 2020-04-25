import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useRouteTransition, useAppContext } from "../hooks";
import Intro from "./Intro";
import AboutMe from "./AboutMe";
import Projects from "./Projects";

export default function Home(props) {
  const { status } = useRouteTransition();
  const { hash, state } = useLocation();
  const initHash = useRef(true);
  const [visibleSections, setVisibleSections] = useState([]);
  const intro = useRef();
  const about = useRef();
  const projects = useRef();
  const { pulled } = useAppContext();

  useEffect(() => {
    const revealSections = [intro, about, projects];

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

  useEffect(() => {
    const hasEntered = status === "entered";
    const supportsNativeSmoothScroll =
      "scrollBehavior" in document.documentElement.style;
    let scrollObserver;
    let scrollTimeout;

    const handleHashchange = (hash, scroll) => {
      clearTimeout(scrollTimeout);
      const hashSections = [intro, about, projects];
      const hashString = hash.replace("#", "");
      const element = hashSections.filter(
        (item) => item.current.id === hashString
      )[0];
      if (!element) return;
      const behavior = scroll ? "smooth" : "instant";
      const top = element.current.offsetTop;

      scrollObserver = new IntersectionObserver(
        (entries, observer) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            scrollTimeout = setTimeout(() => {
              element.current.focus();
            }, 400);
            observer.unobserve(entry.target);
          }
        },
        { rootMargin: "-20% 0px -20% 0px" }
      );

      scrollObserver.observe(element.current);

      if (supportsNativeSmoothScroll) {
        window.scroll({
          top,
          left: 0,
          behavior,
        });
      } else {
        window.scrollTo(0, top);
      }
    };

    if (hash && initHash.current && hasEntered) {
      handleHashchange(pulled ? hash : "#intro", false);
      initHash.current = false;
    } else if (!hash && initHash.current && hasEntered) {
      window.scrollTo(0, 0);
      initHash.current = false;
    } else if (hasEntered) {
      handleHashchange(hash, true);
    }

    return () => {
      clearTimeout(scrollTimeout);
      if (scrollObserver) {
        scrollObserver.disconnect();
      }
    };
  }, [hash, state, status, pulled]);

  return (
    <>
      <Helmet
        title="Sander de Bruijn | Creative Developer"
        meta={[
          {
            name: "description",
            content: "Portfolio of Sander de Bruijn | Creative Developer",
          },
        ]}
      />
      <Intro sectionRef={intro} id="intro" />
      <AboutMe
        sectionRef={about}
        visible={visibleSections.includes(about.current)}
        id="about"
      />
      <Projects
        sectionRef={projects}
        visible={visibleSections.includes(projects.current)}
        id="projects"
      />
    </>
  );
}
