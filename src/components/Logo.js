import React, { useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";

import "../helpers/logoAnimation.css";

const Logo = () => {
  const logo = useRef();

  const toggle = groups => groups.forEach(g => g.classList.toggle("active"));

  useEffect(() => {
    const groups = Array.from(document.querySelectorAll("#eq8f6pzz6u41 g"));
    logo.current.addEventListener("mouseenter", () => toggle(groups));
    // logo.current.addEventListener("mouseleave", () =>
    //   setTimeout(() => toggle(groups), 1500)
    // );
  }, []);

  return (
    <div ref={logo}>
      <LogoWrapper
        width="60"
        height="75"
        id="eq8f6pzz6u41"
        shape-rendering="geometricPrecision"
        text-rendering="geometricPrecision"
        viewBox="0 0 565.646 819.48"
      >
        <defs>
          <linearGradient
            id="eq8f6pzz6u44-fill"
            x1="1"
            y1="0.261000"
            x2="-0.000053"
            y2="1"
            spreadMethod="pad"
            gradientUnits="objectBoundingBox"
          >
            <stop
              id="eq8f6pzz6u44-fill-0"
              offset="0%"
              stopColor="rgb(211,0,105)"
            />
            <stop
              id="eq8f6pzz6u44-fill-1"
              offset="23.500000%"
              stopColor="rgb(211,0,105)"
            />
            <stop
              id="eq8f6pzz6u44-fill-2"
              offset="100%"
              stopColor="rgb(119,0,59)"
            />
          </linearGradient>
          <linearGradient
            id="eq8f6pzz6u45-fill"
            x1="0.803000"
            y1="0.164000"
            x2="0"
            y2="1"
            spreadMethod="pad"
            gradientUnits="objectBoundingBox"
          >
            <stop
              id="eq8f6pzz6u45-fill-0"
              offset="0%"
              stopColor="rgb(133,16,74)"
            />
            <stop
              id="eq8f6pzz6u45-fill-1"
              offset="36.100000%"
              stopColor="rgb(177,0,88)"
            />
            <stop
              id="eq8f6pzz6u45-fill-2"
              offset="100%"
              stopColor="rgb(211,0,105)"
            />
          </linearGradient>
        </defs>
        <g
          id="eq8f6pzz6u42"
          transform="matrix(1 0 0 1 -360.18599999999998 -213.37799999999999)"
        >
          <g id="eq8f6pzz6u43_to" transform="translate(65.381000,0.119000)">
            <path
              id="eq8f6pzz6u43"
              d="M586.089000,213.259000C586.200000,221.359000,585.859000,394.736000,585.859000,394.736000L860.451000,531.336000L860.451000,352.173000Z"
              transform="translate(0,0)"
              fill="rgb(225,225,225)"
              stroke="none"
              strokeWidth="1"
            />
          </g>
          <g id="eq8f6pzz6u44_to" transform="translate(0,1)">
            <g id="eq8f6pzz6u44_tr" transform="rotate(0)">
              <path
                id="eq8f6pzz6u44"
                d="M361.475000,568.415000L651.506000,394.140000L651.506000,212.383000L360.186000,388.147000Z"
                transform="translate(0,0)"
                fill="url(#eq8f6pzz6u44-fill)"
                stroke="none"
                strokeWidth="1"
              />
            </g>
          </g>
          <g id="eq8f6pzz6u45_to" transform="translate(61.300000,104.431000)">
            <g id="eq8f6pzz6u45_tr" transform="rotate(0)">
              <path
                id="eq8f6pzz6u45"
                d="M572,927.432000L572,742.316000L863.321000,577.716000L863.321000,749.758000Z"
                transform="translate(0,0)"
                fill="url(#eq8f6pzz6u45-fill)"
                stroke="none"
                strokeWidth="1"
              />
            </g>
          </g>
          <g id="eq8f6pzz6u46_to" transform="translate(0,112.438000)">
            <path
              id="eq8f6pzz6u46"
              d="M360.186000,601.942000L360.186000,781.589000L633.300000,919.967000L633.300000,735.467000Z"
              transform="translate(0,0)"
              fill="rgb(225,225,225)"
              stroke="none"
              strokeWidth="1"
            />
          </g>
          <path
            id="eq8f6pzz6u47"
            d="M925.342000,817.712000L360.880000,529.276000L359.880000,350.176000L925.341000,644.376000"
            transform="matrix(1 0 0 1 0.49000000000000 39.29300000000000)"
            fill="rgb(225,225,225)"
            stroke="none"
            strokeWidth="1"
          />
        </g>
      </LogoWrapper>
    </div>
  );
};

const LogoWrapper = styled.svg`
  pointer-events: all;
`;

export default Logo;
