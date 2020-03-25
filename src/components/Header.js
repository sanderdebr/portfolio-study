import React, { useRef, useState } from "react";
import { Link, NavLink } from "./Link";
import styled, { css, useTheme } from "styled-components/macro";

import Monogram from "./Monogram";

const Header = () => {
  const headerRef = useRef();
  const [hashKey, setHashKey] = useState();

  return (
    <HeaderWrapper ref={headerRef}>
      <HeaderLogo to={{ pathname: "/", hash: "#intro", state: hashKey }}>
        <Monogram highlight />
      </HeaderLogo>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  border: 1px solid green;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: fixed;
  padding: 0;
  width: 45px;
  z-index: 1;
  top: ${props => props.theme.spacingOuter.desktop}px;
  left: ${props => props.theme.spacingOuter.desktop}px;
  bottom: ${props => props.theme.spacingOuter.desktop}px;

  @media (max-width: ${props => props.theme.tablet}px) {
    top: ${props => props.theme.spacingOuter.tablet}px;
    left: ${props => props.theme.spacingOuter.tablet}px;
    bottom: ${props => props.theme.spacingOuter.tablet}px;
  }

  @media (max-width: ${props => props.theme.mobile}px),
    (max-height: ${props => props.theme.mobile}px) {
    top: ${props => props.theme.spacingOuter.mobile}px;
    left: ${props => props.theme.spacingOuter.mobile}px;
    bottom: auto;
  }
`;

const HeaderLogo = styled(Link)`
  border: purple 1px solid;
  display: flex;
  position: relative;
  padding: 10px;
  z-index: 1;
`;

export default Header;
