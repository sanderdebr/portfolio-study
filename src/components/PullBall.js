import React, { useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { rgba } from "../utils/style";
import clamp from "lodash-es/clamp";
import { useSpring, animated } from "react-spring";
import { useGesture } from "react-with-gesture";

const PullBall = (props) => {
  const circle = useRef();
  const text = useRef();

  const handleDown = () => {
    circle.current.classList.add("active");
  };

  let myTime;
  const handlePull = () => {
    myTime = setTimeout(() => alert("Hello"), 1200);
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
        text.current.textContent = "Further";
      }
    } else {
      handleUp();
      bool = true;
      text.current.textContent = "Pull me";
    }

    velocity = clamp(velocity, 1, 8);
    set({
      xy: down ? delta : [0, 0],
      config: { mass: velocity, tension: 500 * velocity, friction: 50 },
    });
  });

  return (
    <PullBallWrapper>
      <animated.svg
        className="pullball"
        {...bind()}
        style={{
          transform: xy.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`),
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
          Pull me
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
        fill: ${(props) => rgba(props.theme.headingColor, 0.2)};
      }
      &.active {
        animation: ${dash} 4s ease;
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
