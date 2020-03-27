import React, { useRef, createContext, useEffect, useState } from "react";
import styled from "styled-components";

const Cursor = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const cursorSmall = useRef();

  const onMouseMove = event => {
    const { pageX: x, pageY: y } = event;
    cursorSmall.current.style.left = `${x}px`;
    cursorSmall.current.style.top = `${y}px`;
    setMousePosition({ x, y });
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  });

  return (
    <>
      <CursorSmall ref={cursorSmall}></CursorSmall>
      <CursorCanvas></CursorCanvas>
    </>
  );
};

const CursorSmall = styled.div`
  position: fixed;
  pointer-events: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  z-index: 11000;
  background: rgba(255, 255, 255, 0.1);
  transition: all 200ms ease;
`;

const CursorCanvas = styled.canvas`
  width: 100vw;
  height: 100vh;
  z-index: 12000;
`;

export default Cursor;
