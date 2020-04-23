import React, { useRef, useEffect } from "react";
import styled, { useTheme } from "styled-components";
// import isDescendant from "../utils/isDescendant";
// import { rgba } from "../utils/style";

const Cursor = () => {
  const cursorFollow = useRef();
  const cursorSmall = useRef();

  const onMouseMove = (event) => {
    const { pageX: x, pageY: y } = event;

    cursorSmall.current.style.transform = `translateX(${x}px) translateY(${y}px)`;
    cursorFollow.current.style.transform = `translateX(${x}px) translateY(${y}px)`;

    // if (
    //   isDescendant("A", event.target) ||
    //   tagName === "A" ||
    //   tagName === "circle" ||
    //   tagName === "svg"
    // ) {
    //   let translateX = (1 - 3) * x;
    //   let translateY = (1 - 3) * y;
    //   cursorFollow.current.style.transform = `translate(${translateX}px, ${translateY}px) scale(3) translateX(${x}px) translateY(${y}px)`;
    // }
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
`;

export default Cursor;
