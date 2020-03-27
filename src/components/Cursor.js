import React, { useRef, createContext, useEffect, useState } from "react";
import styled from "styled-components";

const Cursor = ({ children }) => {
  const [mousePos, setMousePos] = useState({ x: -50, y: -50 });

  const cursorSmall = useRef();
  const cursorFollow = useRef();

  const onMouseMove = event => {
    const { pageX: x, pageY: y } = event;
    setMousePos({ x, y });
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  });

  return (
    <>
      <CursorFollow
        style={{ left: mousePos.x, top: mousePos.y }}
        ref={CursorFollow}
      ></CursorFollow>
      <CursorSmall
        style={{ left: mousePos.x, top: mousePos.y }}
        ref={cursorSmall}
      ></CursorSmall>
    </>
  );
};

const CursorSmall = styled.div`
  position: absolute;
  pointer-events: none;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  z-index: 11000;
  margin-left: 13px;
  margin-top: 13px;
  background: rgba(255, 255, 255, 1);
  transition: all 20ms ease;
`;

const CursorFollow = styled.div`
  position: absolute;
  pointer-events: none;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  z-index: 11000;
  background: ${props => props.theme.accentColor};
  opacity: 0.8;
  transition: all 200ms ease;
`;

export default Cursor;
