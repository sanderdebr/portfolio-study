import React, { useRef, useEffect, useCallback } from "react";
import { getTransformX } from "../utils/handleSlider";
import styled from "styled-components";
import { TweenLite, Power4 } from "gsap";

const DragSlider = ({ children, amount }) => {
  let wrapper = useRef();
  let start = { x: 0, y: 0 };
  let dragging = false;
  const windowWidth = window.innerWidth;

  // Tween with gsap
  const slide = useCallback((durationMilliseconds, newX, direction) => {
    // Get current x value
    const curX = getTransformX(wrapper.current);
    // Slide to next item
    if (direction) {
      if (direction === "left") newX = curX - windowWidth * 0.7;
      else newX = curX + windowWidth * 0.7;
      // Setting boundries
      if (newX > 0) newX = 0;
      if (newX < windowWidth * -amount) newX = curX + 50;
    }

    const durationSeconds = durationMilliseconds / 1000;
    TweenLite.to(wrapper.current, durationSeconds, {
      x: newX,
      // ease: Power4.easeIn,
    });
  }, []);

  const handleDown = useCallback((e) => {
    const { pageX: x, pageY: y } = e;
    start.x = x;
    start.y = y;
    dragging = true;
  }, []);

  const handleMove = useCallback((e) => {
    const { pageX: x, pageY: y } = e;
    // Slide on mouse down and move
    if (dragging) {
      // Get current x value
      const curX = getTransformX(wrapper.current);
      // Determine dragged distance
      const distance = start.x - x;
      const newX = curX - distance;

      slide(100, newX, null);
    }
  }, []);

  const handleUp = useCallback((e) => {
    dragging = false;
    // On mouse up, slide to next project item
    const { pageX: x, pageY: y } = e;
    // Determine direction
    let direction = start.x > x ? "left" : "right";
    slide(600, null, direction);
  }, []);

  useEffect(() => {
    slide();

    wrapper.current.addEventListener("mousedown", handleDown);
    wrapper.current.addEventListener("mousemove", handleMove);
    wrapper.current.addEventListener("mouseup", handleUp);
  }, [handleDown, handleMove, handleUp, slide]);

  return (
    <Wrapper style={{ transform: "translate3d(0, 0, 0)" }} ref={wrapper}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  border: 1px solid green;
  display: flex;
  align-items: center;
`;

export default DragSlider;
