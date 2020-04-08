import React, { Suspense, lazy, memo } from "react";
import styled, { css, keyframes } from "styled-components";
import { Transition } from "react-transition-group";
import prerender from "../utils/prerender";
import { revealText, clipText } from "../utils/style";
import { useWindowSize, useThemeContext } from "../hooks";
import { rgba } from "../utils/style";
import PullBall from "../components/PullBall";

const World = lazy(() => import("../components/World"));

const Intro = (props) => {
  const windowSize = useWindowSize();
  const theme = useThemeContext();

  return (
    <IntroContent>
      <Transition appear={!prerender} in={!prerender} timeout={3000}>
        {(status) => (
          <>
            {!prerender && (
              <Suspense fallback={null}>
                <World />{" "}
              </Suspense>
            )}
            <IntroText>
              <IntroName status={status}>Sander de Bruijn</IntroName>
              <IntroTitle status={status}>Creative Developer</IntroTitle>
            </IntroText>
            <PullBall status={status} />
          </>
        )}
      </Transition>
    </IntroContent>
  );
};

const IntroContent = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  outline: none;
`;

const IntroText = styled.header`
  z-index: 1;
  margin-left: -22.5%;
  margin-top: -2.5%;
  width: 100%;
  position: relative;
  max-width: 400px;

  @media (min-width: ${(props) => props.theme.desktop}px) {
    max-width: 600px;
  }

  @media (max-width: ${(props) => props.theme.mobile}px) {
    margin: 25px 0 0 25px;
  }

  @media ${(props) => props.theme.mobileLS} {
    top: -16px;
  }
`;

const IntroName = styled.h1`
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: ${(props) => props.theme.accentColor};
  margin-bottom: 20px;
  margin-top: 0;
  font-weight: 400;
  line-height: 1;
  font-size: 24px;
  animation: ${clipText} 800ms ease;
  text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);

  &::after {
    content: "";
    position: absolute;
    height: 30px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform: scaleX(0);
    transform-origin: 0 50%;
    pointer-events: none;
    background-color: ${(props) => props.theme.accentColor};
    animation: ${revealText} 800ms ${(props) => props.theme.curveFastoutSlowin};
  }

  @media (min-width: ${(props) => props.theme.desktop}px) {
    font-size: 28px;
  }

  @media (max-width: ${(props) => props.theme.tablet}px) {
    font-size: 18px;
    margin-bottom: 0px;
  }

  @media (max-width: ${(props) => props.theme.mobile}px) {
    margin-bottom: 20px;
    letter-spacing: 0.2em;
    white-space: nowrap;
    overflow: hidden;
  }

  @media ${(props) => props.theme.mobileLS} {
    margin-bottom: 20px;
    margin-top: 30px;
  }
`;

const IntroTitle = styled.h2`
  width: 100%;
  font-size: 90px;
  margin: 0;
  letter-spacing: 0.1rem;
  color: ${(props) => props.theme.headingColor};
  font-weight: 500;
  line-height: 1.1em;
  text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
  opacity: 1;
  /* opacity: ${(props) => (props.theme.id === "light" ? 0.5 : 1)}; */

  @media (min-width: ${(props) => props.theme.desktop}px) {
    font-size: 110px;
  }

  @media (max-width: 860px) {
    font-size: 90px;
  }

  @media (max-width: 600px) {
    font-size: 56px;
  }

  @media (max-width: 400px) {
    font-size: 42px;
  }
`;

export default memo(Intro);
