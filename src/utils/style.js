import { css, keyframes } from "styled-components";

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

  @media (min-width: ${props => props.theme.desktop}px) {
    padding-left: 120px;
  }

  @media (max-width: ${props => props.theme.tablet}px) {
    padding-left: 160px;
  }

  @media (max-width: ${props => props.theme.mobile}px) {
    padding-right: 25px;
    padding-left: 25px;
  }

  @media (max-width: ${props => props.theme.mobile}px),
    (max-height: ${props => props.theme.mobile}px) {
    padding-left: ${props => props.theme.spacingOuter.mobile}px;
    padding-right: ${props => props.theme.spacingOuter.mobile}px;
  }

  @media ${props => props.theme.mobileLS} {
    padding-left: 100px;
    padding-right: 100px;
  }
`;

export const revealText = keyframes`
	0%, 50% {
		transform-origin: 0 50%;
	}
	
	60%, 100% {
		transform-origin: 100% 50%;		
        
	}

	
	60% {
		transform: scaleX(1);
	}
	
	100% {
		transform: scaleX(0);
	}
}`;

export const clipText = keyframes`
	from {
		clip-path: inset(0 100% 0 0);
	}
	to {
		clip-path: inset(0 0 0 0);
	}
`;

export default revealText;
