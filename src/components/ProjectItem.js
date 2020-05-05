import React from "react";
import styled, { css } from "styled-components";
import { RouterButton } from "../components/Button";
import { useSpring, animated } from "react-spring";

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1.1,
];
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const ProjectItem = ({ title, description }) => {
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  return (
    <Container>
      <Content>
        <Left>
          <animated.div
            onMouseMove={({ clientX: x, clientY: y }) =>
              set({ xys: calc(x, y) })
            }
            onMouseLeave={() => set({ xys: [0, 0, 1] })}
            style={{ transform: props.xys.interpolate(trans) }}
          />
        </Left>
        <Right>
          <NumberWrapper>
            <Number>01</Number>
            <NumberTitle>PROJECT</NumberTitle>
          </NumberWrapper>
          <Title>{title}</Title>
          <Description>{description}</Description>
          <Button left secondary icon="rightArrow" to="/contact">
            View case study
          </Button>
        </Right>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  max-height: 500px;
  width: 70vw;
  border: 1px solid purple;
`;

const Content = styled.div`
  padding: 0 4em;
  height: 100%;
  border: 1px solid purple;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Left = styled.div`
  width: 100%;
  height: 100%;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    width: 45ch;
    height: 45ch;
    background: grey;
    border-radius: 5px;
    background-image: url(https://drscdn.500px.org/photo/435236/q%3D80_m%3D1500/v2?webp=true&sig=67031bdff6f582f3e027311e2074be452203ab637c0bd21d89128844becf8e40);
    background-size: cover;
    background-position: center center;
    box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
    transition: box-shadow 0.5s;
    will-change: transform;
    border: 15px solid white;
  }
`;

const Right = styled.div`
  width: 100%;
  height: 100%;
  flex-grow: 1;
  padding: 3rem 4rem;
`;

const Title = styled.h2`
  font-size: 38px;
`;

const Description = styled.p`
  font-size: ${(props) => props.theme.fontSize};
  letter-spacing: ${(props) => props.theme.letterSpacing};
  line-height: ${(props) => props.theme.lineHeight};
`;

const NumberWrapper = styled.div`
  position: relative;
  height: 90px;
`;

const Number = styled.h1`
  position: absolute;
  font-size: 170px;
  margin: 0;
  left: 0;
  top: 0;
  opacity: 0.5;
`;

const NumberTitle = styled.div`
  position: absolute;
  left: 0;
  top: 7px;
  letter-spacing: 0.5em;
`;

const Button = styled(RouterButton)`
  margin-top: 1em;
`;

export default ProjectItem;
