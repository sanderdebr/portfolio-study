import React, { useEffect, useRef } from "react";
import styled, { css, useTheme } from "styled-components";
import rgba from "../helpers/rgba";
import { useAppContext } from "../hooks";

import "../helpers/toggleAnimation.css";

const ThemeToggle = ({ isMobile, ...otherProps }) => {
  const theme = useTheme();
  const { dispatch } = useAppContext();

  const toggleButton = useRef();

  const toggleAnimation = groups => {
    groups.forEach(g => {
      if (g.classList.contains("active")) {
        g.classList.remove("active");
        g.classList.add("active-reverse");
      } else if (g.classList.contains("active-reverse")) {
        g.classList.remove("active-reverse");
        g.classList.add("active");
      } else {
        g.classList.add("active");
      }
    });
    dispatch({ type: "toggleTheme" });
  };

  useEffect(() => {
    const groups = Array.from(document.querySelectorAll("#eteno0v2oqa81 g"));
    toggleButton.current.addEventListener("click", () => {
      toggleAnimation(groups);
    });
  }, []);

  return (
    <div ref={toggleButton}>
      <ThemeToggleButton iconOnly isMobile={isMobile} {...otherProps}>
        <ThemeToggleSVG
          width="100"
          height="40"
          id="eteno0v2oqa81"
          viewBox="0 0 798 424"
          shape-rendering="geometricPrecision"
          text-rendering="geometricPrecision"
        >
          <defs>
            <filter
              id="eteno0v2oqa86-filter"
              x="-400%"
              width="600%"
              y="-400%"
              height="600%"
            >
              <feGaussianBlur
                id="eteno0v2oqa86-filter-drop-shadow-0-blur"
                in="SourceAlpha"
                stdDeviation="10,10"
              />
              <feOffset
                id="eteno0v2oqa86-filter-drop-shadow-0-offset"
                dx="5"
                dy="5"
                result="tmp"
              />
              <feFlood
                id="eteno0v2oqa86-filter-drop-shadow-0-flood"
                floorcolor="rgba(0,0,0,0.16)"
              />
              <feComposite
                id="eteno0v2oqa86-filter-drop-shadow-0-composite"
                operator="in"
                in2="tmp"
              />
              <feMerge id="eteno0v2oqa86-filter-drop-shadow-0-merge">
                <feMergeNode id="eteno0v2oqa86-filter-drop-shadow-0-merge-node-1" />
                <feMergeNode
                  id="eteno0v2oqa86-filter-drop-shadow-0-merge-node-2"
                  in="SourceGraphic"
                />
              </feMerge>
            </filter>
          </defs>
          <g id="eteno0v2oqa82" transform="matrix(1 0 0 1 -233 -188)">
            <rect
              id="eteno0v2oqa83"
              width="456.549000"
              height="214.727852"
              x="0"
              transform="matrix(1 0 0 1 403.72550000000001 292.63607400000001)"
              fill={rgba(theme.headingColor, 0.05)}
              stroke="none"
              strokeWidth="1"
              rx="50"
            />
            <g id="eteno0v2oqa84_to" transform="translate(-25.500000,0)">
              <g id="eteno0v2oqa84" transform="translate(0,0)">
                <g id="eteno0v2oqa85" transform="matrix(1 0 0 1 233 188)">
                  <circle
                    id="eteno0v2oqa86"
                    r="182"
                    transform="matrix(1 0 0 1 207.50000000000000 202)"
                    filter="url(#eteno0v2oqa86-filter)"
                    fill="#f5f5f5"
                    fillRule="evenodd"
                    stroke="rgb(236,236,236)"
                    strokeWidth="13"
                    strokeOpacity="0"
                  />
                </g>
                <g
                  id="eteno0v2oqa87"
                  transform="matrix(1 0 0 1 2.50000000000000 -2)"
                >
                  <g id="eteno0v2oqa88" transform="matrix(1 0 0 1 376 330)">
                    <circle
                      id="eteno0v2oqa89"
                      r="62"
                      transform="matrix(1 0 0 1 62 62)"
                      fill="none"
                      stroke="none"
                      strokeWidth="12"
                    />
                    <circle
                      id="eteno0v2oqa810"
                      r="56"
                      transform="matrix(1 0 0 1 62 62)"
                      fill="none"
                      stroke="rgb(0,0,0)"
                      strokeWidth="12"
                    />
                  </g>
                  <g
                    id="eteno0v2oqa811_ts"
                    transform="translate(433,276) scale(1,1)"
                  >
                    <rect
                      id="eteno0v2oqa811"
                      width="11"
                      height="34"
                      rx="5.500000"
                      ry="0"
                      transform="translate(0,0)"
                      fill="rgb(0,0,0)"
                      stroke="none"
                      strokeWidth="1"
                    />
                  </g>
                  <g
                    id="eteno0v2oqa812_ts"
                    transform="translate(517.450000,304.772000) rotate(45) scale(1,1)"
                  >
                    <rect
                      id="eteno0v2oqa812"
                      width="11"
                      height="25"
                      rx="5.500000"
                      ry="0"
                      transform="translate(0,0)"
                      fill="rgb(0,0,0)"
                      stroke="none"
                      strokeWidth="1"
                    />
                  </g>
                  <g
                    id="eteno0v2oqa813_ts"
                    transform="translate(368.450000,453.772000) rotate(45) scale(1,1)"
                  >
                    <rect
                      id="eteno0v2oqa813"
                      width="11"
                      height="25"
                      rx="5.500000"
                      ry="0"
                      transform="translate(0,0)"
                      fill="rgb(0,0,0)"
                      stroke="none"
                      strokeWidth="1"
                    />
                  </g>
                  <g
                    id="eteno0v2oqa814_ts"
                    transform="translate(526.228000,472.450000) rotate(135) scale(1,1)"
                  >
                    <rect
                      id="eteno0v2oqa814"
                      width="11"
                      height="25"
                      rx="5.500000"
                      ry="0"
                      transform="translate(0,0)"
                      fill="rgb(0,0,0)"
                      stroke="none"
                      strokeWidth="1"
                    />
                  </g>
                  <g
                    id="eteno0v2oqa815_ts"
                    transform="translate(377.228000,323.450000) rotate(135) scale(1,1)"
                  >
                    <rect
                      id="eteno0v2oqa815"
                      width="11"
                      height="25"
                      rx="5.500000"
                      ry="0"
                      transform="translate(0,0)"
                      fill="rgb(0,0,0)"
                      stroke="none"
                      strokeWidth="1"
                    />
                  </g>
                  <g
                    id="eteno0v2oqa816_ts"
                    transform="translate(433,474) scale(1,1)"
                  >
                    <rect
                      id="eteno0v2oqa816"
                      width="11"
                      height="34"
                      rx="5.500000"
                      ry="0"
                      transform="translate(0,0)"
                      fill="rgb(0,0,0)"
                      stroke="none"
                      strokeWidth="1"
                    />
                  </g>
                  <g
                    id="eteno0v2oqa817_ts"
                    transform="translate(556.500000,387) rotate(90) scale(1,1)"
                  >
                    <rect
                      id="eteno0v2oqa817"
                      width="11"
                      height="34"
                      rx="5.500000"
                      ry="0"
                      transform="translate(0,0)"
                      fill="rgb(0,0,0)"
                      stroke="none"
                      strokeWidth="1"
                    />
                  </g>
                  <g
                    id="eteno0v2oqa818_ts"
                    transform="translate(353.500000,387) rotate(90) scale(1,1)"
                  >
                    <rect
                      id="eteno0v2oqa818"
                      width="11"
                      height="34"
                      rx="5.500000"
                      ry="0"
                      transform="translate(0,0)"
                      fill="rgb(0,0,0)"
                      stroke="none"
                      strokeWidth="1"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g
              id="eteno0v2oqa819"
              transform="matrix(1 0 0 1 137.27449999999988 10.00000000000016)"
            >
              <g
                id="eteno0v2oqa820"
                display="none"
                transform="matrix(1 0 0 1 133 188)"
              >
                <circle
                  id="eteno0v2oqa821"
                  r="182"
                  transform="matrix(1 0 0 1 581 202)"
                  fill="rgb(0,0,0)"
                  stroke="none"
                  strokeWidth="1"
                />
              </g>
              <path
                id="eteno0v2oqa822"
                d="M100.500000,257C80.474272,257.032466,60.899773,251.053518,44.310000,239.837000C28.152550,228.928900,15.505116,213.569267,7.900000,195.619000C-4.129973,167.143573,-2.388999,134.716591,12.620671,107.692897C27.630341,80.669204,54.239248,62.054525,84.771000,57.219000C78.300367,70.727535,74.960466,85.521748,75,100.500000C75.025720,129.894453,87.907964,157.806867,110.259276,176.897528C132.610589,195.988188,162.194220,204.346646,191.231000,199.775000C174.544189,234.742588,139.245088,257.006104,100.500000,257Z"
                transform="matrix(1 0 0 1 601 238)"
                fill="rgb(255,255,255)"
                fillOpacity="0"
                stroke="none"
                strokeWidth="1"
              />
              <g
                id="eteno0v2oqa823"
                transform="matrix(1 0 0 1 3.54900000000000 -4)"
                opacity="0"
              >
                <rect
                  id="eteno0v2oqa824"
                  width="9"
                  height="35"
                  rx="4.500000"
                  ry="0"
                  transform="matrix(1 0 0 1 738 287)"
                  fill="rgb(255,255,255)"
                  stroke="none"
                  strokeWidth="1"
                />
                <rect
                  id="eteno0v2oqa825"
                  width="9"
                  height="35"
                  rx="4.500000"
                  ry="0"
                  transform="matrix(0 1 -1 0 760 300)"
                  fill="rgb(255,255,255)"
                  stroke="none"
                  strokeWidth="1"
                />
              </g>
              <g
                id="eteno0v2oqa826"
                transform="matrix(1 0 0 1 89.54900000000001 31)"
                opacity="0"
              >
                <rect
                  id="eteno0v2oqa827"
                  width="13"
                  height="58"
                  rx="6.500000"
                  ry="0"
                  transform="matrix(1 0 0 1 708 286)"
                  fill="rgb(255,255,255)"
                  stroke="none"
                  strokeWidth="1"
                />
                <rect
                  id="eteno0v2oqa828"
                  width="13"
                  height="58"
                  rx="6.500000"
                  ry="0"
                  transform="matrix(0 1 -1 0 743 309)"
                  fill="rgb(255,255,255)"
                  stroke="none"
                  strokeWidth="1"
                />
              </g>
            </g>
          </g>
        </ThemeToggleSVG>
      </ThemeToggleButton>
    </div>
  );
};

const ThemeToggleSVG = styled.svg`
  pointer-events: all;
`;

const ThemeToggleButton = styled.div`
  position: fixed;
  z-index: 2;
  width: auto;
  height: auto;
  padding: 6px;
  top: ${props => props.theme.spacingOuter.desktop - 8}px;
  right: ${props => props.theme.spacingOuter.desktop - 24}px;
  transform: translate3d(0, 0, 0);

  @media (max-width: ${props => props.theme.tablet}px) {
    top: ${props =>
      props.isMobile ? "unset" : `${props.theme.spacingOuter.tablet - 8}px`};
    right: ${props =>
      props.isMobile ? "10px" : `${props.theme.spacingOuter.tablet - 8}px`};
  }

  ${props =>
    props.isMobile &&
    css`
      top: unset;
      bottom: 20px;
    `}

  ${props =>
    !props.isMobile &&
    css`
      @media (max-width: ${props => props.theme.mobile}px),
        (max-height: ${props => props.theme.mobile}px) {
        display: none;
      }
    `}
`;

export default ThemeToggle;
