import { css, keyframes } from "styled-components";

export const randomColor = () => {
  const colors = ["#00f764", "#ff3100", "#ffb700", "#ff6361"];
  return colors[Math.floor(Math.random() * 5)];
};

function stringToRgba(colorString) {
  return colorString
    .split(" ")
    .join("")
    .replace("rgb(", "")
    .replace("rgba(", "")
    .replace(")", "")
    .split(",");
}

export function rgba(colorString, alpha) {
  const colorArray = stringToRgba(colorString);
  return `rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, ${alpha})`;
}

export const sectionPadding = css`
  padding-right: 120px;
  padding-left: 200px;

  @media (min-width: ${(props) => props.theme.desktop}px) {
    padding-left: 120px;
  }

  @media (max-width: ${(props) => props.theme.tablet}px) {
    padding-left: 160px;
  }

  @media (max-width: ${(props) => props.theme.mobile}px) {
    padding-right: 25px;
    padding-left: 25px;
  }

  @media (max-width: ${(props) => props.theme.mobile}px),
    (max-height: ${(props) => props.theme.mobile}px) {
    padding-left: ${(props) => props.theme.spacingOuter.mobile}px;
    padding-right: ${(props) => props.theme.spacingOuter.mobile}px;
  }

  @media ${(props) => props.theme.mobileLS} {
    padding-left: 100px;
    padding-right: 100px;
  }
`;

export const AnimTextReveal = (color) => keyframes`
  0% { color: ${rgba(color, 0)}; }
  50% { color: ${rgba(color, 0)}; }
  60% { color: ${color}; }
  100% { color: ${color}; }
`;

export const AnimTextRevealMask = keyframes`
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

export const AnimTextSlideIntro = keyframes`
  from {
    transform: translateY(100px)
  }
  to {
    transform: translateY(-5px);
      @media (min-width: ${(props) => props.theme.tablet}px) {
        transform: translateY(-15px);
      }
  }
`;

export const AnimTextSlide = keyframes`
  from {
    transform: translateY(100px)
  }
  to {
    transform: translateY(0px)
  }
`;

export default rgba;
