import React, { useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { rgba } from "../utils/style";
import clamp from "lodash-es/clamp";
import { useSpring, animated } from "react-spring";
import { useGesture } from "react-with-gesture";
import { useAppContext, useLocalStorage } from "../hooks";
import { useEffect } from "react";

const PullBall = (props) => {
  const circle = useRef();
  const text = useRef();
  const pullRef = useRef();
  const { pulled, dispatch } = useAppContext();

  const handleDown = () => {
    circle.current.classList.add("active");
  };

  let myTime;
  const handlePull = () => {
    myTime = setTimeout(() => {
      text.current.textContent = "Welcome";
      dispatch({ type: "togglePulled" });
      document.getElementById("about").scrollIntoView({
        behavior: "smooth",
      });
    }, 700);
  };

  const handleUp = () => {
    circle.current.classList.remove("active");
    clearTimeout(myTime);
  };

  let bool = true;
  const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }));
  const bind = useGesture(({ down, delta, velocity }, timeOut) => {
    if (down) {
      if (delta[1] < -100) {
        if (bool) handlePull();
        bool = false;
        handleDown();
        text.current.textContent = "Keep going";
      } else {
        text.current.textContent = "A bit more";
      }
    } else {
      handleUp();
      bool = true;
      if (!pulled) text.current.textContent = "Pull to enter";
    }

    velocity = clamp(velocity, 1, 8);
    set({
      xy: down ? delta : [0, 0],
      config: { mass: velocity, tension: 500 * velocity, friction: 50 },
    });
  });

  return (
    <PullBallWrapper pulled={pulled} ref={pullRef}>
      <animated.svg
        className="pullball"
        {...bind()}
        style={{
          transform: xy.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`),
          touchAction: "none",
        }}
      >
        <circle ref={circle} cx="50" cy="50" r="50" />
        <text
          ref={text}
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          fill="white"
        >
          Pull to enter
        </text>
      </animated.svg>
    </PullBallWrapper>
  );
};

export default PullBall;

const dash = keyframes`
 to {
    stroke-dashoffset: 0;
  }
`;

const PullBallWrapper = styled.div`
  transition: opacity 350ms ease;
  opacity: 1 ${(props) => (props.pulled ? 0 : 1)};
  svg {
    z-index: 4;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    cursor: -webkit-grab;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: pre;
    position: fixed;
    bottom: 64px;
    border: 1px solid ${(props) => rgba(props.theme.headingColor, 0.2)};
    font-size: 90%;
    text {
      fill: ${(props) => props.theme.headingColor};
    }
    circle {
      fill: ${(props) => rgba(props.theme.headingColor, 0)};
      stroke: ${(props) => rgba(props.theme.accentColor, 1)};
      stroke-width: 15;
      stroke-dasharray: 1000;
      stroke-dashoffset: 1000;
      transition: fill 250ms ease;
      &:hover,
      &:active,
      &:focus {
        fill: ${(props) => rgba(props.theme.headingColor, 0.1)};
      }
      &.active {
        animation: ${dash} 3s ease;
      }
    }
  }

  > svg:active {
    cursor: -webkit-grabbing;
  }

  @media (max-width: ${(props) => props.theme.mobile}px),
    (max-height: ${(props) => props.theme.mobile}px) {
    svg {
      bottom: 24px;
      position: fixed;
      left: 40%;
    }
  }
`;
