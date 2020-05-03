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

    cursorSmall.current.style.backgroundColor = "rgb(6, 170, 245)";

    cursorFollow.current.style.width = "30px";
    cursorFollow.current.style.height = "30px";
    cursorFollow.current.style.top = "-15px";
    cursorFollow.current.style.left = "-15px";

    cursorSmall.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    cursorFollow.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;

    if (
      isDescendant("A", event.target) ||
      tagName === "A" ||
      tagName === "circle" ||
      tagName === "svg"
    ) {
      cursorFollow.current.style.width = "100px";
      cursorFollow.current.style.height = "100px";
      cursorFollow.current.style.top = "-50px";
      cursorFollow.current.style.left = "-50px";

      cursorSmall.current.style.backgroundColor = "rgb(0, 247, 100)";
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
  background-color: ${(props) => props.theme.accentColor};
  transition: background-color ease;
  transition-duration: 500ms;
  transition-delay: 0;
`;

const CursorFollow = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  top: -15px;
  left: -15px;
  pointer-events: none;
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.headingColor};
  opacity: 0.15;
  z-index: 2;
  background: transparent;
  transition: all ease;
  transition-duration: 200ms;
  transition-delay: 0;
`;

export default Cursor;
