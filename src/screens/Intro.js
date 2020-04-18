import React, { Suspense, lazy, memo } from "react";
import styled, { css, keyframes } from "styled-components";
import { Transition } from "react-transition-group";
import { AnimTextReveal, AnimTextRevealMask } from "../utils/style";
import { useLocalStorage } from "../hooks";
import { rgba, AnimTextSlide } from "../utils/style";
import PullBall from "../components/PullBall";

const World = lazy(() => import("../components/World"));

function Intro(props) {
  const { sectionRef, ...otherProps } = props;
  const [storedPulled] = useLocalStorage("pulled");

  return (
    <IntroContent ref={sectionRef} {...otherProps}>
      <Transition appear in timeout={3000}>
        {(status) => (
          <>
            <Suspense fallback={null}>
              <World />{" "}
            </Suspense>
            <IntroText status={status}>
              <IntroName>
                <IntroNameWord status={status} delay="600ms">
                  Sander de Bruijn
                </IntroNameWord>
              </IntroName>
              <IntroTitle>
                <IntroTitleRow>
                  <IntroTitleWord status={status} delay="800ms">
                    <TextReveal status={status}>
                      <TextRevealInner delay="800ms" status={status}>
                        Creative
                      </TextRevealInner>
                    </TextReveal>
                  </IntroTitleWord>
                </IntroTitleRow>
                <IntroTitleRow>
                  <IntroTitleWord delay="1000ms" status={status}>
                    <TextReveal status={status}>
                      <TextRevealInner delay="1000ms" status={status}>
                        Developer
                      </TextRevealInner>
                    </TextReveal>
                  </IntroTitleWord>
                </IntroTitleRow>
              </IntroTitle>
            </IntroText>
            {!storedPulled && <PullBall status={status} />}
          </>
        )}
      </Transition>
    </IntroContent>
  );
}

const IntroContent = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  outline: none;
  user-select: none;
`;

const IntroText = styled.header`
  z-index: 1;
  margin-left: -22.5%;
  margin-top: -5%;
  width: 100%;
  position: relative;
  max-width: 400px;

  @media (min-width: ${(props) => props.theme.desktop}px) {
    max-width: 600px;
  }

  @media (max-width: ${(props) => props.theme.mobile}px) {
    margin: -25px 0 0 50px;
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
  text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);

  @media (min-width: ${(props) => props.theme.desktop}px) {
    font-size: 28px;
  }

  @media (max-width: ${(props) => props.theme.tablet}px) {
    font-size: 22px;
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

const IntroNameWord = styled.span`
  position: relative;
  display: inline;
  line-height: 1;
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
  animation-timing-function: ${(props) => props.theme.curveFastoutSlowin};
  color: ${(props) => rgba(props.theme.accentColor, 0)};
  transition: all 0.5s ease;

  ${(props) =>
    props.status === "entering" &&
    css`
      animation-name: ${AnimTextReveal(props.theme.accentColor)};
    `}

  ${(props) =>
    props.status === "entered" &&
    css`
      color: ${props.theme.accentColor};
    `}

  &::after {
    content: "";
    width: 100%;
    height: 100%;
    background: ${(props) => props.theme.accentColor};
    opacity: 0;
    animation-duration: 1.5s;
    animation-fill-mode: forwards;
    animation-timing-function: ${(props) => props.theme.curveFastoutSlowin};
    transform-origin: left;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;

    ${(props) =>
      props.status === "entering" &&
      css`
        animation-name: ${AnimTextRevealMask};
      `}

    ${(props) =>
      props.status === "entered" &&
      css`
        opacity: 1;
        transform: scaleX(0);
        transform-origin: right;
      `}
  }

  ${(props) =>
    props.delay &&
    css`
      animation-delay: ${props.delay};

      &::after {
        animation-delay: ${props.delay};
      }
    `}
`;

const IntroTitle = styled.h2`
  width: 100%;
  font-size: 110px;
  margin: 0;
  letter-spacing: 0.1rem;
  color: ${(props) => props.theme.headingColor};
  font-weight: 500;
  line-height: 1.1em;
  text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
  opacity: 1;

  @media (min-width: ${(props) => props.theme.desktop}px) {
    font-size: 140px;
  }

  @media (max-width: 860px) {
    font-size: 90px;
  }

  @media (max-width: 600px) {
    font-size: 56px;
  }

  @media (max-width: 400px) {
    font-size: 52px;
  }
`;

const IntroTitleRow = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
`;

const IntroTitleWord = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  line-height: 1;
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
  animation-timing-function: ${(props) => props.theme.curveFastoutSlowin};
  color: ${(props) => rgba(props.theme.headingColor, 0)};
  transition: opacity 0.5s ease 0.4s;

  ${(props) =>
    props.status === "entering" &&
    css`
      animation-name: ${AnimTextReveal(props.theme.headingColor)};
    `}

  ${(props) =>
    props.status === "entered" &&
    css`
      color: ${props.theme.headingColor};
    `}
`;

const TextReveal = styled.span`
  overflow: hidden;
  display: table-cell;

  ${(props) =>
    props.status === "entered" &&
    css`
      overflow: visible;
    `}
`;

const TextRevealInner = styled.span`
  display: inline-block;
  transform: translateY(200px);
  ${(props) =>
    props.status === "entering" &&
    css`
      animation: ${AnimTextSlide} 3s forwards cubic-bezier(0.16, 1, 0.3, 1);
      animation-delay: ${props.delay};
    `};

  ${(props) =>
    props.status === "entered" &&
    css`
      transform: translateY(0);
    `}
`;

export default memo(Intro);
