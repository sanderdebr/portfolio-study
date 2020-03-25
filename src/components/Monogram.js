import React from "react";
import styled from "styled-components";

const Monogram = ({ highlight }) => {
  return (
    <MonogramWrapper width="52" height="75" viewBox="0 0 565.646 819.48">
      <defs>
        <linearGradient
          id="linear-gradient"
          x1="1"
          y1="0.277"
          x2="0"
          y2="0.835"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stop-color="#d30069" />
          <stop offset="1" stop-color="#4b0855" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-2"
          x1="1"
          y1="0.226"
          x2="0"
          y2="0.738"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stop-color="#4b0855" />
          <stop offset="1" stop-color="#d30069" />
        </linearGradient>
      </defs>
      <g
        id="monogram-clip"
        data-name="Group 2"
        transform="translate(-360.186 -213.378)"
      >
        <path
          id="Path_1"
          data-name="Path 1"
          d="M586.089,213.259c.971,6.8-.23,181.477-.23,181.477l274.592,136.6V352.173Z"
          transform="translate(65.381 0.119)"
          fill="#b0b0b0"
        />
        <path
          id="Path_2"
          data-name="Path 2"
          d="M361.475,568.415,651.506,394.14V212.383L360.186,388.147Z"
          transform="translate(0 1)"
          fill="url(#linear-gradient)"
        />
        <path
          id="Path_4"
          data-name="Path 4"
          d="M572,927.432V743.614l291.321-165.9V749.758Z"
          transform="translate(61.295 105.427)"
          fill="url(#linear-gradient-2)"
        />
        <path
          id="Path_5"
          data-name="Path 5"
          d="M360.186,601.942V781.589L633.3,919.967v-184.5Z"
          transform="translate(0 112.438)"
          fill="#b0b0b0"
        />
        <path
          id="Path_3"
          data-name="Path 3"
          d="M925.342,817.712,360.88,529.276l-1-179.1,565.461,294.2"
          transform="translate(0.49 39.293)"
          fill="#b0b0b0"
        />
      </g>
      {highlight && (
        <g clipPath="url(#linear-gradient)">
          <MonogramHighlight
            className="monogram__highlight"
            width="100%"
            height="100%"
          />
        </g>
      )}
    </MonogramWrapper>
  );
};

const MonogramWrapper = styled.svg`
  fill: ${props => props.theme.colorText};
`;

const MonogramHighlight = styled.rect`
  fill: ${props => props.theme.colorAccent};
  opacity: 0;
  transform: scale3d(1, 0, 1);
  transform-origin: top;
  transition: transform 0.4s ${props => props.theme.curveFastoutSlowin},
    opacity 0.1s ease 0.4s;

  a:hover & {
    opacity: 1;
    transform: scale3d(1, 1, 1);
    transform-origin: bottom;
    transition: transform 0.4s ${props => props.theme.curveFastoutSlowin},
      opacity 0.1s ease;
  }
`;

export default Monogram;
