import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import isDescendant from "../helpers/isDescendant";
import rgba from "../helpers/rgba";

const Cursor = () => {
  const cursorFollow = useRef();
  const cursorSmall = useRef();

  const onMouseMove = event => {
    const { pageX: x, pageY: y } = event;
    window.requestAnimationFrame(() => {
      cursorSmall.current.style.transform = `translateX(${x}px) translateY(${y}px)`;
      cursorFollow.current.style.transform = `translateX(${x}px) translateY(${y}px)`;
      console.log(event.target.className);
      if (isDescendant("A", event.target) || event.target.tagName === "A") {
        let translateX = (1 - 2) * x;
        let translateY = (1 - 2) * y;
        cursorFollow.current.style.transform = `translate(${translateX}px, ${translateY}px) scale(2) translateX(${x}px) translateY(${y}px)`;
      }
    });
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
  margin-left: 22px;
  margin-top: 22px;
  transition: all 30ms ${props => props.theme.easeOutBack};
  background: ${props => props.theme.accentColor};
`;

const CursorFollow = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  pointer-events: none;
  border-radius: 50%;
  z-index: 2;
  opacity: 0.8;
  transition: all 300ms ${props => props.theme.easeOutBack};
  background: ${props => rgba(props.theme.headingColor, 0.05)};
`;

export default Cursor;
