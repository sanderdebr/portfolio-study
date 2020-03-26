import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";

const Logo = props => {
  const { backgroundColor } = useContext(ThemeContext);

  return (
    <LogoWrapper width="60" height="75" viewBox="0 0 565.646 819.48">
      <g
        id="Logo"
        transform="translate(-360.186 -213.378)"
        stroke={backgroundColor}
        strokeWidth="30"
      >
        <path
          id="Path_1"
          data-name="Path 1"
          d="M586.089,213.259c.111,8.1-.23,181.477-.23,181.477l274.592,136.6V352.173Z"
          transform="translate(65.381 0.119)"
          fill="#fff"
        />
        <path
          id="Path_2"
          data-name="Path 2"
          d="M361.475,568.415,651.506,394.14V212.383L360.186,388.147Z"
          transform="translate(0 1)"
          fill="#f4b687"
        />
        <path
          id="Path_4"
          data-name="Path 4"
          d="M572,927.432V742.316l291.321-164.6V749.758Z"
          transform="translate(61.295 105.427)"
          fill="#f4b687"
        />
        <path
          id="Path_5"
          data-name="Path 5"
          d="M360.186,601.942V781.589L633.3,919.967v-184.5Z"
          transform="translate(0 112.438)"
          fill="#fff"
        />
        <path
          id="Path_3"
          data-name="Path 3"
          d="M925.342,817.712,360.88,529.276l-1-179.1,565.461,294.2"
          transform="translate(0.49 39.293)"
          fill="#fff"
        />
      </g>
    </LogoWrapper>
  );
};

const LogoWrapper = styled.svg`
  transition: all 0.5s ${props => props.theme.curveFastoutSlowin};
  stroke-dasharray: 1500;
  stroke-dashoffset: 1500;
  &:hover {
    cursor: pointer;
    stroke-dashoffset: 0;
  }
`;

export default Logo;
