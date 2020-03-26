import React, { useRef, useState } from "react";
import { Link, NavLink } from "./Link";
import styled, { css, useTheme } from "styled-components/macro";
import { navLinks } from "../data/nav";

import Logo from "./Logo";

const Header = () => {
  const headerRef = useRef();
  const [hashKey, setHashKey] = useState();

  return (
    <HeaderWrapper role="banner" ref={headerRef}>
      <HeaderLogo to={{ pathname: "/", hash: "#intro", state: hashKey }}>
        <Logo />
      </HeaderLogo>
      <HeaderNav role="navigation">
        <HeaderNavList>
          {navLinks.map(({ label, pathname, hash }) => (
            <HeaderNavLink exact to={{ pathname, hash, state: hashKey }}>
              {label}
            </HeaderNavLink>
          ))}
        </HeaderNavList>
      </HeaderNav>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
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
  display: flex;
  position: relative;
  padding: 10px;
  z-index: 1;
`;

const HeaderNav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex: 1 1 auto;
  max-width: 45px;
  position: relative;
  top: -10px;

  @media (max-width: ${props => props.theme.mobile}px),
    (max-height: ${props => props.theme.mobile}px) {
    display: none;
  }
`;

const HeaderNavList = styled.div`
  transform: rotate(-90deg) translate3d(-50%, 0, 0);
  display: flex;
  flex-direction: row-reverse;
`;

const HeaderNavLink = styled(NavLink)`
  padding: 20px;
  color: ${props => props.theme.textColor};
  text-decoration: none;
  font-weight: 500;
  position: relative;
  transition: color 0.3s ease 0.1s;
  line-height: 1;

  &:hover,
  &:active,
  &:focus,
  &.active {
    color: ${props => props.theme.textColor};
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 10px;
    left: 10px;
    height: 4px;
    background: ${props => props.theme.accentColor};
    transform: scaleX(0) translateY(-2px);
    transition: transform 0.4s ${props => props.theme.curveFastoutSlowin};
    transform-origin: right;
  }

  &:hover:after,
  &:active:after,
  &:focus:after,
  &.active:after {
    transform: scaleX(1) translateY(-2px);
    transform-origin: left;
  }
`;

export default Header;
