import React, { useRef } from "react";
import { map } from "lodash";
import { useFrame } from "react-three-fiber";
import { useThemeContext } from "../../../hooks";

import Sphere from "./Sphere";

export default ({ count, theme }) => {
  const accentColor = theme.accentColor;
  const baseColor = theme.id === "light" ? 0xffffff : 0x000000;

  const group = useRef();

  useFrame(() => {
    group.current.rotation.y += 0.001;
  });

  const nodesCubes = map(new Array(count), (el, i) => {
    return <Sphere key={i} accentColor={accentColor} baseColor={baseColor} />;
  });

  return <group ref={group}>{nodesCubes}</group>;
};
