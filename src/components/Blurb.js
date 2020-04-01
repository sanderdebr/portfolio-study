import React from "react";
import styled, { useTheme } from "styled-components";
import Cutout from "../assets/img/cutout.png";
import { useSpring, animated } from "react-spring";

const Blurb = () => {
  const theme = useTheme();

  const h1Animation = useSpring({ border: "1px solid red" });

  return (
    <>
      <BlurbSVG
        style={h1Animation}
        width="500"
        height="485"
        viewBox="0 0 500 485"
      >
        <defs>
          <pattern id="pattern1" height="100%" width="100%">
            <path
              fill={theme.accentColor}
              d="M104.884,624.5c-332.258-60.753-334.946-199.6-334.946-199.6S-126.3,77.184,139.83,148.151c110.709,29.522,130.107,165.591,130.107,223.656-6.532,129.113-88.125,251.423-165.05,252.679"
              transform="translate(230.063 -138.598)"
            />
            <image
              width="130%"
              height="130%"
              clipPath="url(#shape)"
              href={Cutout}
            ></image>
          </pattern>
        </defs>
        <path
          d="M104.884,624.5c-332.258-60.753-334.946-199.6-334.946-199.6S-126.3,77.184,139.83,148.151c110.709,29.522,130.107,165.591,130.107,223.656-6.532,129.113-88.125,251.423-165.05,252.679"
          transform="translate(230.063 -138.598)"
          fill="url(#pattern1)"
        />
      </BlurbSVG>
    </>
  );
};

const BlurbSVG = styled(animated.svg)`
  z-index: 2;
  position: absolute;
  right: 15%;
`;

export default Blurb;
