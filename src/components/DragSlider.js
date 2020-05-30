import React, { useRef, useEffect, useCallback } from "react";
import { getTransformX } from "../utils/handleSlider";
import styled from "styled-components";
import { TweenLite } from "gsap";

const DragSlider = ({ children }) => {
  let wrapper = useRef();
  let start = { x: 0, y: 0 };
  let dragging = false;

  // Tween with gsap
  const slide = (durationMilliseconds, newX) => {
    const durationSeconds = durationMilliseconds / 1000;
    TweenLite.to(wrapper.current, durationSeconds, {
      x: newX,
    });
  };

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
      // Only slide within boundries
      if (newX < 0 && newX > children.length * -1500) {
        slide(100, newX);
      }
    }
  }, []);

  const handleUp = useCallback((e) => {
    dragging = false;

    // On mouse up, slide to next project item
    const { pageX: x, pageY: y } = e;
    // Get current x value
    const curX = getTransformX(wrapper.current);
    // Determine to right or left
    let newX = start.x > x ? curX - 1500 : curX + 1500;
    // Only slide within boundries
    if (newX < 0 && newX > children.length * -1500) {
      slide(1000, newX);
    }
  }, []);

  useEffect(() => {
    wrapper.current.addEventListener("mousedown", handleDown);
    wrapper.current.addEventListener("mousemove", handleMove);
    wrapper.current.addEventListener("mouseup", handleUp);
  }, [handleDown, handleMove, handleUp]);

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
