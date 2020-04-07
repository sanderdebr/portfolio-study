import React, { useRef } from "react";
import { map } from "lodash";
import { useFrame } from "react-three-fiber";

import Sphere from "./Sphere";

export default ({ count, baseColor }) => {
  const group = useRef();

  useFrame(() => {
    group.current.rotation.y += 0.001;
  });

  const nodesCubes = map(new Array(count), (el, i) => {
    return <Sphere key={i} baseColor={baseColor} />;
  });

  return <group ref={group}>{nodesCubes}</group>;
};
