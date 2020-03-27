import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";

import "./logo.css";

const Logo = props => {
  const { backgroundColor } = useContext(ThemeContext);

  return (
    <LogoWrapper
      width="60"
      height="75"
      id="eo29lu4h2ku1"
      shape-rendering="geometricPrecision"
      text-rendering="geometricPrecision"
      viewBox="0 0 565.646 819.48"
    >
      <defs>
        <linearGradient
          id="eo29lu4h2ku4-fill"
          x1="0.500000"
          y1="0"
          x2="-0.000359"
          y2="0.001645"
          spreadMethod="pad"
          gradientUnits="objectBoundingBox"
        >
          <stop
            id="eo29lu4h2ku4-fill-0"
            offset="0%"
            stop-color="rgb(253,74,65)"
          />
          <stop
            id="eo29lu4h2ku4-fill-1"
            offset="100%"
            stop-color="rgb(127,37,33)"
          />
        </linearGradient>
        <linearGradient
          id="eo29lu4h2ku5-fill"
          x1="-0.000124"
          y1="0.825000"
          x2="0.001904"
          y2="0.074000"
          spreadMethod="pad"
          gradientUnits="objectBoundingBox"
        >
          <stop
            id="eo29lu4h2ku5-fill-0"
            offset="0%"
            stop-color="rgb(253,74,65)"
          />
          <stop
            id="eo29lu4h2ku5-fill-1"
            offset="100%"
            stop-color="rgb(127,37,33)"
          />
        </linearGradient>
      </defs>
      <g
        id="eo29lu4h2ku2"
        transform="matrix(1 0 0 1 -360.18599999999998 -213.37799999999999)"
      >
        <g id="eo29lu4h2ku3_to" transform="translate(65.381000,0.119000)">
          <path
            id="eo29lu4h2ku3"
            d="M586.100231,213.259000C586.216651,221.359000,585.859000,394.736000,585.859000,394.736000L873.859000,531.336000L873.859000,352.173000Z"
            transform="translate(0,0)"
            fill="rgb(255,255,255)"
            stroke="none"
            stroke-width="1"
          />
        </g>
        <g id="eo29lu4h2ku4_to" transform="translate(17.413358,-23.391972)">
          <g id="eo29lu4h2ku4_tr" transform="rotate(0)">
            <path
              id="eo29lu4h2ku4"
              d="M344.243651,591.659867L633.826642,418.576395L633.826642,238.062077L342.956642,412.624370Z"
              transform="translate(0,0)"
              fill="url(#eo29lu4h2ku4-fill)"
              stroke="none"
              stroke-width="1"
            />
          </g>
        </g>
        <g id="eo29lu4h2ku5_to" transform="translate(61.300000,104.431000)">
          <g id="eo29lu4h2ku5_tr" transform="rotate(0)">
            <path
              id="eo29lu4h2ku5"
              d="M572,927.432000L572,742.316000L863.321000,577.716000L863.321000,749.758000Z"
              transform="translate(0,0)"
              fill="url(#eo29lu4h2ku5-fill)"
              stroke="none"
              stroke-width="1"
            />
          </g>
        </g>
        <g id="eo29lu4h2ku6_to" transform="translate(0,112.443814)">
          <path
            id="eo29lu4h2ku6"
            d="M360.186000,601.942000L360.186000,781.589000L633.300000,919.967000L633.300000,735.467000Z"
            transform="translate(0,0)"
            fill="rgb(255,255,255)"
            stroke="none"
            stroke-width="1"
          />
        </g>
        <path
          id="eo29lu4h2ku7"
          d="M925.342000,817.712000L360.880000,529.276000L359.880000,350.176000L925.341000,644.376000"
          transform="matrix(1 0 0 1 0.49000000000003 39.17400000000003)"
          fill="rgb(255,255,255)"
          stroke="none"
          stroke-width="1"
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
