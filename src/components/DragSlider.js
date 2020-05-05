import React from "react";
import styled from "styled-components";

const DragSlider = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  position: absolute;
  width: auto;
  border: 1px solid green;
  display: flex;
  align-items: center;
`;

export default DragSlider;
