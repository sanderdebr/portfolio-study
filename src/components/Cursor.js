import React, { useRef, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import isDescendant from "../utils/isDescendant";
import { rgba } from "../utils/style";

const Cursor = () => {
  const cursorFollow = useRef();
  const cursorSmall = useRef();

  const onMouseMove = (event) => {
    const {
      pageX: x,
      pageY: y,
      target: { tagName },
    } = event;

    cursorSmall.current.style.opacity = 1;

    cursorSmall.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    cursorFollow.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;

    if (
      isDescendant("A", event.target) ||
      tagName === "A" ||
      tagName === "circle" ||
      tagName === "svg"
    ) {
      let translateX = (1 - 5) * x;
      let translateY = (1 - 5) * y;
      cursorFollow.current.style.transform = `translate(${translateX}px, ${translateY}px) scale(5) translate3d(${x}px, ${y}px, 0)`;

      cursorSmall.current.style.opacity = 0;
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <>
      <CursorFollow ref={cursorFollow}></CursorFollow>
      <CursorSmall ref={cursorSmall}></CursorSmall>
    </>
  );
};

const CursorSmall = styled.div`
  position: absolute;
  pointer-events: none;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  z-index: 2;
  margin-top: -3px;
  margin-left: -3px;
  background: ${(props) => props.theme.accentColor};
  transition: transform ease;
  transition-duration: 100ms;
  transition-delay: 0;
`;

const CursorFollow = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  top: -10px;
  left: -10px;
  pointer-events: none;
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.headingColor};
  opacity: 0.15;
  z-index: 2;
  background: transparent;
  transition: transform ease;
  transition-duration: 0ms;
  transition-delay: 0;
`;

export default Cursor;
