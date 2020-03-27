import React, { useRef, useState } from "react";
import { Link, NavLink } from "./Link";
import styled, { css, useTheme } from "styled-components/macro";
import { navLinks } from "../data/nav";

import Logo from "./Logo";

const Header = props => {
  const headerRef = useRef();
  const [hashKey, setHashKey] = useState();
  const { location } = props;

  const isMatch = ({ match, hash = "" }) => {
    if (!match) return false;
    return `${match.url}${hash}` === `${location.pathname}${location.hash}`;
  };

  const handleNavClick = () => {
    setHashKey(
      Math.random()
        .toString(32)
        .substr(2, 8)
    );
  };

  return (
    <HeaderWrapper role="banner" ref={headerRef}>
      <HeaderLogo to={{ pathname: "/", hash: "#intro", state: hashKey }}>
        <Logo />
      </HeaderLogo>
      <HeaderNav role="navigation">
        <HeaderNavList>
          {navLinks.map(({ label, pathname, hash }) => (
            <HeaderNavLink
              exact
              isActive={match => isMatch({ match, hash })}
              onClick={handleNavClick}
              key={label}
              to={{ pathname, hash, state: hashKey }}
            >
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
  color: ${props => props.theme.headingColor};
  text-decoration: none;
  font-weight: 400;
  font-size: 1rem;
  position: relative;
  transition: color 0.3s ease 0.1s;
  line-height: 1;
  width: max-content;

  &:hover,
  &:active,
  &:focus,
  &.active {
    color: ${props => props.theme.headingColor};
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 5px;
    right: 17.5px;
    left: 17.5px;
    height: 2px;
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
