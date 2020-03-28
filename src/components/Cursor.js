import React, { useEffect, useState, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import isDescendant from "../helpers/isDescendant";
import rgba from "../helpers/rgba";

const Cursor = () => {
  const themeContext = useContext(ThemeContext);
  const [cursorPos, setCursorPos] = useState({ x: -50, y: -50 });
  const [cursorSize, setCursorSize] = useState("scale(1)");
  const [color, setColor] = useState({
    follow: themeContext.accentColor,
    small: themeContext.colorWhite
  });

  const onMouseMove = event => {
    const { pageX: x, pageY: y } = event;
    if (isDescendant("A", event.target) || event.target.tagName === "A") {
      setCursorSize("scale(2)");
      setColor({
        small: themeContext.accentColor,
        follow: rgba(themeContext.colorWhite, 0.2)
      });
    } else {
      setCursorSize("scale(1)");
      setColor({
        follow: themeContext.accentColor,
        small: themeContext.colorWhite
      });
    }
    setCursorPos({ x, y });
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
        style={{
          background: color.follow,
          transform: cursorSize,
          left: cursorPos.x,
          top: cursorPos.y
        }}
      ></CursorFollow>
      <CursorSmall
        style={{ background: color.small, left: cursorPos.x, top: cursorPos.y }}
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
  z-index: 2;
  margin-left: 16px;
  margin-top: 16px;
  transition: all 30ms ${props => props.theme.easeOutBack};
`;

const CursorFollow = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  pointer-events: none;
  border-radius: 50%;
  z-index: 2;
  opacity: 0.8;
  transition: all 300ms ${props => props.theme.easeOutBack};
`;

export default Cursor;
