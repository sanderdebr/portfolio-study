import React, { useRef, useEffect, useCallback, useState } from "react";
import { getTransformX } from "../utils/handleSlider";
import styled from "styled-components";
import { TweenMax } from "gsap";

const DragSlider = ({ children, amount }) => {
  let wrapper = useRef();
  let start = { x: 0, y: 0 };
  let dragging = false;
  let curItem = 0;
  const windowWidth = window.innerWidth;
  let items;

  // List all project items
  useEffect(() => {
    amount = amount - 1;
    items = Array.from(document.querySelectorAll(".project-item"));
  }, []);

  // Tween with gsap
  const slide = useCallback((durationMilliseconds, newX, direction) => {
    let nextOffset;
    let nextItem;
    // Slide to next item
    if (items.length) {
      nextItem = items.filter(
        (item) => parseInt(item.dataset.id) === curItem
      )[0];
      nextOffset = nextItem.offsetLeft;
    }

    if (direction) {
      if (direction === "right") {
        if (curItem < amount) curItem++;
      } else if (direction === "left") {
        if (curItem > 0) curItem--;
      }
      newX = nextOffset * -1;
    }

    // Set boundries
    if (newX > 500) newX = 0;
    console.log("newX: ", newX);
    if (newX < -windowWidth * amount) newX = getTransformX(wrapper.current);

    const durationSeconds = durationMilliseconds / 1000;
    TweenMax.to(wrapper.current, durationSeconds, {
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
      slide(500, newX, null);
    }
  }, []);

  const handleUp = useCallback((e) => {
    dragging = false;
    // On mouse up, slide to next project item
    const { pageX: x, pageY: y } = e;
    // Determine direction
    let direction = start.x > x ? "right" : "left";
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
