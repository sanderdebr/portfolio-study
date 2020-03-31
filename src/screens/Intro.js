import React from "react";
import styled, { css, keyframes } from "styled-components";
import { Transition } from "react-transition-group";
import prerender from "../utils/prerender";
import rgba from "../utils/rgba";

const Intro = () => {
  return (
    <IntroContent>
      <Transition appear={!prerender} in={!prerender} timeout={3000}>
        {status => (
          <IntroText>
            <IntroName status={status}>Sander de Bruijn</IntroName>
            <IntroTitle status={status}>Creative Developer</IntroTitle>
          </IntroText>
        )}
      </Transition>
    </IntroContent>
  );
};

const IntroContent = styled.section`
  height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  outline: none;
`;

const IntroText = styled.header`
  margin-left: 30%;
  margin-top: -6%;
  width: 100%;
  position: relative;

  @media (min-width: ${props => props.theme.desktop}px) {
    max-width: 920px;
  }

  @media (max-width: ${props => props.theme.mobile}px) {
    margin-left: 10%;
    top: -60px;
  }

  @media (max-width: 400px) {
    top: -30px;
  }

  @media ${props => props.theme.mobileLS} {
    top: -16px;
  }
`;

const IntroName = styled.h1`
  text-transform: uppercase;
  font-size: 24px;
  letter-spacing: 0.3em;
  color: ${props => rgba(props.theme.accentColor, 0.8)};
  margin-bottom: 20px;
  margin-top: 0;
  font-weight: 500;
  line-height: 1;
  opacity: 0;

  ${props =>
    props.status === "entering" &&
    css`
      animation: ${css`
        ${AnimFade} 0.6s ease 0.2s forwards
      `};
    `}

  ${props =>
    props.status === "entered" &&
    css`
      opacity: 1;
    `}

  @media (min-width: ${props => props.theme.desktop}px) {
    font-size: 28px;
  }

  @media (max-width: ${props => props.theme.tablet}px) {
    font-size: 18px;
  }

  @media (max-width: ${props => props.theme.mobile}px) {
    margin-bottom: 20px;
    letter-spacing: 0.2em;
    white-space: nowrap;
    overflow: hidden;
  }

  @media ${props => props.theme.mobileLS} {
    margin-bottom: 20px;
    margin-top: 30px;
  }
`;

const IntroTitle = styled.h2`
  display: flex;
  flex-direction: column;
  font-size: 100px;
  margin: 0;
  letter-spacing: -0.005em;
  line-height: 1em;
  font-weight: ${props => (props.theme.id === "light" ? 600 : 500)};

  &::after {
    content: "";
    position: absolute;
    top: 38%;
    right: 7%;
    width: 40%;
    height: 2px;
    background: ${props => rgba(props.theme.headingColor, 0.2)};
  }

  @media (min-width: ${props => props.theme.desktop}px) {
    font-size: 120px;
  }

  @media (max-width: 860px) {
    font-size: 80px;
  }

  @media (max-width: 600px) {
    font-size: 56px;
  }

  @media (max-width: 400px) {
    font-size: 42px;
  }
`;

const IntroTitleLabel = styled.span`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  position: absolute;
`;

const IntroTitleRow = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;

  ${props =>
    props.prerender &&
    css`
      opacity: 0;
    `}
`;

const AnimTextReveal = props => keyframes`
  0% { color: ${rgba(props.theme.accentColor, 0)}; }
  50% { color: ${rgba(props.theme.accentColor, 0)}; }
  60% { color: ${props.theme.accentColor}; }
  100% { color: ${props.theme.accentColor}; }
`;

const AnimTextRevealMask = keyframes`
  0% {
    opacity: 1;
    transform: scaleX(0);
    transform-origin: left;
  }
  50% {
    opacity: 1;
    transform: scaleX(1);
    transform-origin: left;
  }
  51% {
    opacity: 1;
    transform: scaleX(1);
    transform-origin: right;
  }
  100% {
    opacity: 1;
    transform: scaleX(0);
    transform-origin: right;
  }
`;

const IntroTitleWord = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  line-height: 1;
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
  animation-timing-function: ${props => props.theme.curveFastoutSlowin};
  color: ${props => rgba(props.theme.colorTitle, 0)};
  transition: opacity 0.5s ease 0.4s;

  ${props =>
    props.status === "entering" &&
    css`
      animation-name: ${AnimTextReveal(props)};
    `}

  ${props =>
    props.status === "entered" &&
    css`
      color: ${props.theme.colorTitle};
    `}

  ${props =>
    props.status === "exiting" &&
    css`
      color: ${props.theme.colorTitle};
      opacity: 0;
      position: absolute;
      top: 0;
      z-index: 0;
    `}

  &::after {
    content: '';
    width: 100%;
    height: 100%;
    background: ${props => props.theme.accentColor};
    opacity: 0;
    animation-duration: 1.5s;
    animation-fill-mode: forwards;
    animation-timing-function: ${props => props.theme.curveFastoutSlowin};
    transform-origin: left;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;

    ${props =>
      props.status === "entering" &&
      css`
        animation-name: ${AnimTextRevealMask};
      `}

    ${props =>
      props.status === "entered" &&
      css`
        opacity: 1;
        transform: scaleX(0);
        transform-origin: right;
      `}
  }

  ${props =>
    props.delay &&
    css`
      animation-delay: ${props.delay};

      &::after {
        animation-delay: ${props.delay};
      }
    `}

  ${props =>
    props.plus &&
    css`
      &::before {
        content: "+";
        margin-right: 10px;
        opacity: 0.4;
      }
    `}
`;

const AnimLineIntro = keyframes`
  0% {
    transform: scaleX(0);
    opacity: 1;
  }
  100% {
    transform: scaleX(1);
    opacity: 1;
  }
`;

const IntroTitleLine = styled.span`
  content: "";
  height: 2px;
  background: ${props => rgba(props.theme.textColor, 0.3)};
  width: 120%;
  display: flex;
  margin-left: 20px;
  animation-duration: 0.8s;
  animation-delay: 1s;
  animation-fill-mode: forwards;
  animation-timing-function: ${props => props.theme.curveFastoutSlowin};
  transform-origin: left;
  opacity: 0;

  ${props =>
    props.status === "entering" &&
    css`
      animation-name: ${AnimLineIntro};
    `}

  ${props =>
    props.status === "entered" &&
    css`
      transform: scaleX(1);
      opacity: 1;
    `}
`;

const AnimFade = keyframes`
  0% {opacity: 0}
  100% {opacity: 1}
`;

export default Intro;
