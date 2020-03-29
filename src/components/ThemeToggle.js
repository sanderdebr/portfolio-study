import React, { useEffect, useRef } from "react";
import styled, { css, useTheme } from "styled-components";
import Button from "./Button";
import { useAppContext } from "../hooks";

const ThemeToggle = ({ isMobile, ...otherProps }) => {
  const theme = useTheme();
  const { dispatch } = useAppContext();
  const initThemeId = useRef(theme.id);

  const ref = useRef();

  const handleClick = () => dispatch({ type: "toggleTheme" });

  return (
    <ThemeToggleButton
      iconOnly
      onClick={handleClick}
      isMobile={isMobile}
      {...otherProps}
    >
      <ThemeToggleWrapper ref={ref} />
    </ThemeToggleButton>
  );
};

const ThemeToggleButton = styled(Button)`
  position: fixed;
  z-index: 2048;
  width: 48px;
  height: 48px;
  padding: 6px;
  top: ${props => props.theme.spacingOuter.desktop - 8}px;
  right: ${props => props.theme.spacingOuter.desktop - 8}px;
  transform: translate3d(0, 0, 0);

  @media (max-width: ${props => props.theme.tablet}px) {
    top: ${props =>
      props.isMobile ? "unset" : `${props.theme.spacingOuter.tablet - 8}px`};
    right: ${props =>
      props.isMobile ? "30px" : `${props.theme.spacingOuter.tablet - 8}px`};
  }

  ${props =>
    props.isMobile &&
    css`
      top: unset;
      bottom: 30px;
    `}

  ${props =>
    !props.isMobile &&
    css`
      @media (max-width: ${props => props.theme.mobile}px),
        (max-height: ${props => props.theme.mobile}px) {
        display: none;
      }
    `}

  svg {
    flex: 1 1 100%;
    position: relative;
  }

  svg path {
    transition-property: fill, stroke;
    transition-timing-function: ease;
    transition-duration: 0.4s;
  }

  svg g > path {
    stroke: ${props => props.theme.colorText};
  }

  svg g[mask] path {
    fill: ${props => props.theme.colorText};
    stroke: none;
  }
`;

const ThemeToggleWrapper = styled.span`
  display: flex;
`;

export default ThemeToggle;
