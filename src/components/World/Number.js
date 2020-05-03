import * as THREE from "three";
import ReactDOM from "react-dom";
import React, {
  Suspense,
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import lerp from "lerp";
import Text from "./Text";

function Number({ mouse, hover }) {
  const ref = useRef();
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  const offsetLeft = window.innerSize > 900 ? 2 : -0.5;
  const offsetY = window.innerSize > 900 ? 12 : 36;
  const offsetZ = window.innerSize > 900 ? 3 : -20;
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.x =
        offsetLeft +
        lerp(ref.current.position.x, mouse.current[0] / aspect / 10, 0.1);
      ref.current.rotation.x =
        300 +
        lerp(ref.current.rotation.x, 0 + mouse.current[1] / aspect / 50, 0.1);
      ref.current.rotation.y = 0.8;
    }
  });
  return (
    <Suspense fallback={null}>
      <group position={[0, offsetY, offsetZ]} ref={ref}>
        <Text
          size={6}
          onPointerOver={() => hover(true)}
          onPointerOut={() => hover(false)}
        >
          S
        </Text>
      </group>
    </Suspense>
  );
}

export default Number;
