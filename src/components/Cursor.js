import React, { useRef, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { isDescendant } from "../utils/isDescendant";
import { rgba } from "../utils/style";

const Cursor = () => {
  const cursorFollow = useRef();
  const cursorSmall = useRef();
  const theme = useTheme();

  const cursorFollowGrow = () => {
    cursorFollow.current.style.width = `${theme.cursorFollowSize}px`;
    cursorFollow.current.style.height = `${theme.cursorFollowSize}px`;
    cursorFollow.current.style.top = `-${theme.cursorFollowSize / 2}px`;
    cursorFollow.current.style.left = `-${theme.cursorFollowSize / 2}px`;
  };

  const cursowFollowShrink = (size) => {
    cursorFollow.current.style.width = `${size}px`;
    cursorFollow.current.style.height = `${size}px`;
    cursorFollow.current.style.top = `-${size / 2}px`;
    cursorFollow.current.style.left = `-${size / 2}px`;
  };

  const onMouseMove = (event) => {
    const {
      pageX: x,
      pageY: y,
      target: { tagName },
    } = event;

    // Default
    document.body.style.cursor = "default";
    cursorSmall.current.style.display = "block";
    cursorSmall.current.style.backgroundColor = "rgb(6, 170, 245)";
    cursorSmall.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    cursorFollow.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    cursowFollowShrink(30);

    // Hovering projects section
    if (isDescendant("projects", event.target, true)) {
      cursorFollowGrow();
      document.body.style.cursor = "grab";
      // cursorSmall.current.style.display = "none";
    }

    // Hovering A tags
    if (
      isDescendant("A", event.target) ||
      tagName === "A" ||
      tagName === "circle" ||
      tagName === "svg"
    ) {
      cursorFollowGrow();
      cursorSmall.current.style.backgroundColor = theme.secondaryAccentColor;
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
  transition: background-color cubic-bezier(0.22, 1, 0.36, 1);
  transition-duration: 800ms;
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
  transition: all cubic-bezier(0.22, 1, 0.36, 1);
  transition-duration: 600ms;
  transition-delay: 0;
`;

export default Cursor;
