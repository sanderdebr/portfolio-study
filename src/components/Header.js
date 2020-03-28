import React, { useRef, useState } from "react";
import { Link, NavLink } from "./Link";
import styled, { css, useTheme } from "styled-components/macro";
import { navLinks, socialLinks } from "../data/nav";
import Icon from "./Icon";
import Logo from "./Logo";

const HeaderIcons = () => (
  <HeaderNavIcons>
    {socialLinks.map(({ label, url, icon }) => (
      <HeaderNavIconLink key={label} href={url}>
        <HeaderNavIcon icon={icon} />
      </HeaderNavIconLink>
    ))}
  </HeaderNavIcons>
);

const Header = props => {
  const headerRef = useRef();
  const { location } = props;

  const isMatch = ({ match, hash = "" }) => {
    if (!match) return false;
    return `${match.url}${hash}` === `${location.pathname}${location.hash}`;
  };

  return (
    <HeaderWrapper role="banner" ref={headerRef}>
      <HeaderLogo to={{ pathname: "/", hash: "#intro" }}>
        <Logo />
      </HeaderLogo>
      <HeaderNav role="navigation">
        <HeaderNavList>
          {navLinks.map(({ label, pathname, hash }) => (
            <HeaderNavLink
              exact
              isActive={match => isMatch({ match, hash })}
              key={label}
              to={{ pathname, hash }}
            >
              {label}
            </HeaderNavLink>
          ))}
        </HeaderNavList>
        <HeaderIcons />
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

const HeaderNavIcons = styled.div`
  top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 16;

  @media (max-width: ${props => props.theme.mobile}px),
    (max-height: ${props => props.theme.mobile}px) {
    flex-direction: row;
    position: absolute;
    bottom: 30px;
    left: 30px;
  }

  @media ${props => props.theme.mobileLS} {
    transform: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const HeaderNavIconLink = styled.a.attrs({
  target: "_blank",
  rel: "noopener noreferrer"
})`
  display: flex;
  padding: 10px;
`;

const HeaderNavIcon = styled(Icon)`
  fill: ${props => props.theme.textColor};
  transition: fill 0.4s ease;
  position: relative;

  ${/* sc-selector */ HeaderNavIconLink}:hover &,
  ${/* sc-selector */ HeaderNavIconLink}:focus &,
  ${/* sc-selector */ HeaderNavIconLink}:active & {
    fill: ${props => props.theme.accentColor};
  }
`;

export default Header;
