import React, { Suspense, useRef, useState } from "react";
import { Link, NavLink } from "./Link";
import styled, { css, useTheme } from "styled-components/macro";
import { navLinks, socialLinks } from "../data/nav";
import { useWindowSize, useAppContext, useLocalStorage } from "../hooks";
import { Transition } from "react-transition-group";
import { rgba } from "../utils/style";
import NavToggle from "./NavToggle";
import Icon from "./Icon";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const HeaderIcons = () => (
  <HeaderNavIcons>
    {socialLinks.map(({ label, url, icon }) => (
      <HeaderNavIconLink key={label} href={url}>
        <HeaderNavIcon icon={icon} />
      </HeaderNavIconLink>
    ))}
  </HeaderNavIcons>
);

const Header = (props) => {
  const { menuOpen, dispatch } = useAppContext();
  const headerRef = useRef();
  const { location } = props;
  const [hashKey, setHashKey] = useState();
  const mobile = useTheme();
  const windowSize = useWindowSize();
  const isMobile = windowSize.width <= mobile || windowSize.height <= 696;
  const { pulled } = useAppContext();
  console.log(pulled);

  const handleNavClick = (e) => {
    !pulled && e.preventDefault();
    setHashKey(Math.random().toString(32).substr(2, 8));
  };

  const handleMobileNavClick = () =>
    menuOpen && dispatch({ type: "toggleMenu" });

  const isMatch = ({ match, hash = "" }) => {
    if (!match) return false;
    return `${match.url}${hash}` === `${location.pathname}${location.hash}`;
  };

  return (
    <HeaderWrapper role="banner" ref={headerRef}>
      <HeaderLogo
        to={{ pathname: "/", hash: "#intro", state: hashKey }}
        onClick={handleMobileNavClick}
      >
        <Logo />
      </HeaderLogo>
      <NavToggle
        onClick={() => dispatch({ type: "toggleMenu" })}
        menuOpen={menuOpen}
      />
      <HeaderNav role="navigation">
        <HeaderNavList>
          {navLinks.map(({ label, pathname, hash }, index) => (
            <HeaderNavLink
              exact
              isActive={(match) => isMatch({ match, hash, state: hashKey })}
              delay={300 + index * 100}
              onClick={handleNavClick}
              key={label}
              to={{ pathname, hash }}
              pulled={pulled}
            >
              {label}
            </HeaderNavLink>
          ))}
        </HeaderNavList>
        <HeaderIcons />
      </HeaderNav>
      <Transition
        mountOnEnter
        unmountOnExit
        in={menuOpen}
        timeout={{ enter: 0, exit: 500 }}
      >
        {(status) => (
          <HeaderMobileNav status={status}>
            {navLinks.map(({ label, pathname, hash }, index) => (
              <HeaderMobileNavLink
                key={label}
                delay={300 + index * 100}
                status={status}
                onClick={handleMobileNavClick}
                to={{ pathname, hash, state: hashKey }}
              >
                {label}
              </HeaderMobileNavLink>
            ))}
            <HeaderIcons />
            <Suspense fallback={null}>
              <ThemeToggle isMobile />
            </Suspense>
          </HeaderMobileNav>
        )}
      </Transition>
      {!isMobile && (
        <Suspense fallback={null}>
          <ThemeToggle />
        </Suspense>
      )}
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
  z-index: 2;
  top: ${(props) => props.theme.spacingOuter.desktop}px;
  left: ${(props) => props.theme.spacingOuter.desktop}px;
  bottom: ${(props) => props.theme.spacingOuter.desktop}px;

  @media (max-width: ${(props) => props.theme.tablet}px) {
    top: ${(props) => props.theme.spacingOuter.tablet}px;
    left: ${(props) => props.theme.spacingOuter.tablet}px;
    bottom: ${(props) => props.theme.spacingOuter.tablet}px;
  }

  @media (max-width: ${(props) => props.theme.mobile}px),
    (max-height: ${(props) => props.theme.mobile}px) {
    top: ${(props) => props.theme.spacingOuter.mobile}px;
    left: ${(props) => props.theme.spacingOuter.mobile}px;
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

  @media (max-width: ${(props) => props.theme.mobile}px),
    (max-height: ${(props) => props.theme.mobile}px) {
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
  color: ${(props) => props.theme.headingColor};
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
    color: ${(props) => props.theme.headingColor};
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 5px;
    right: 17.5px;
    left: 17.5px;
    height: 2px;
    background: ${(props) => props.theme.accentColor};
    transform: scaleX(0) translateY(-2px);
    transition: transform 0.4s ${(props) => props.theme.curveFastoutSlowin};
    transform-origin: right;
    opacity: ${(props) => (props.pulled === true ? 1 : 0)};
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 16;

  @media (max-width: ${(props) => props.theme.mobile}px),
    (max-height: ${(props) => props.theme.mobile}px) {
    flex-direction: row;
    position: absolute;
    bottom: 30px;
    left: 10px;
  }

  @media ${(props) => props.theme.mobileLS} {
    transform: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const HeaderNavIconLink = styled.a.attrs({
  target: "_blank",
  rel: "noopener noreferrer",
})`
  display: flex;
  padding: 10px;
`;

const HeaderNavIcon = styled(Icon)`
  fill: ${(props) => props.theme.textColor};
  transition: fill 0.4s ease;
  position: relative;

  ${/* sc-selector */ HeaderNavIconLink}:hover &,
  ${/* sc-selector */ HeaderNavIconLink}:focus &,
  ${/* sc-selector */ HeaderNavIconLink}:active & {
    fill: ${(props) => props.theme.accentColor};
  }
`;

const HeaderMobileNav = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: ${(props) => rgba(props.theme.backgroundColor, 0.9)};
  transform: translateX(
    ${(props) => (props.status === "entered" ? "0%" : "-100%")}
  );
  transition-property: transform, background;
  transition-duration: 0.5s;
  transition-timing-function: ${(props) => props.theme.curveFastoutSlowin};
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);

  @media (max-width: ${(props) => props.theme.mobile}px),
    (max-height: ${(props) => props.theme.mobile}px) {
    display: flex;
  }
`;

const HeaderMobileNavLink = styled(NavLink)`
  width: 100%;
  font-size: 22px;
  text-align: center;
  text-decoration: none;
  color: ${(props) => props.theme.headingColor};
  padding: 20px 40px;
  opacity: 0;
  transform: translateY(50%);
  transition: all 600ms ${(props) => props.theme.curveFastoutSlowin};
  transition-delay: ${(props) => props.delay}ms;
  position: relative;
  top: -15px;

  @media ${(props) => props.theme.mobileLS} {
    top: auto;
  }

  @media (max-width: 400px) {
    font-size: 30px;
  }

  @media (max-height: 360px) {
    font-size: 30px;
  }

  ${(props) =>
    props.status === "entered" &&
    css`
      opacity: 1;
      transform: translateY(0%);
    `}

  &::after {
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: ${(props) => props.theme.backgroundColor};
    transform: scaleY(1);
    transition: transform 600ms ${(props) => props.theme.curveFastoutSlowin};
    transition-delay: ${(props) => props.delay}ms;
    transform-origin: bottom;
    ${(props) =>
      props.status === "entered" &&
      css`
        transform: scaleY(0);
      `}
  }

  &:hover {
    color: ${(props) => props.theme.textColor};
  }
`;

export default Header;
