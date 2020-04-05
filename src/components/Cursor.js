import React, { useRef, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import isDescendant from "../utils/isDescendant";
import { rgba } from "../utils/style";

const Cursor = () => {
  const theme = useTheme();
  const cursorFollow = useRef();
  const cursorSmall = useRef();

  const onMouseMove = (event) => {
    const { pageX: x, pageY: y } = event;

    // cursorSmall.current.style.transform = `translateX(${x}px) translateY(${y}px)`;
    cursorFollow.current.style.transform = `translateX(${x}px) translateY(${y}px)`;

    if (
      // isDescendant("A", event.target) ||
      event.target.tagName === "A"
    ) {
      let translateX = (1 - 2.5) * x;
      let translateY = (1 - 2.5) * y;
      cursorFollow.current.style.transform = `translate(${translateX}px, ${translateY}px) scale(2.5) translateX(${x}px) translateY(${y}px)`;
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
      {/* <CursorSmall ref={cursorSmall}></CursorSmall> */}
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
`;

const CursorFollow = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  top: -25px;
  left: -25px;
  pointer-events: none;
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.headingColor};
  opacity: 0.15;
  z-index: 2;
  background: transparent;
  transition: all 300ms ease;
`;

export default Cursor;
