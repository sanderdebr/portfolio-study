import * as THREE from "three";
import React, { Suspense, useState, useCallback, useRef } from "react";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import styled, { useTheme } from "styled-components";
import { useThemeContext } from "../../hooks";
import Effects from "./Effects";
import Spheres from "./Spheres";
import Number from "./Number";
import Controls from "./Controls";

function World() {
  const [hovered, hover] = useState(false);
  const mouse = useRef([0, 0]);
  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }) =>
      (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]),
    []
  );
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const theme = useThemeContext();

  return (
    <CanvasWrapper>
      <Canvas
        gl={{
          alpha: true,
          antialias: true,
          logarithmicDepthBuffer: false,
          powerPreference: "high-performance",
        }}
        pixelRatio={Math.min(2, isMobile ? window.devicePixelRatio : 1)}
        camera={{
          fov: 100,
          position: [0, 0, 30],
        }}
        onMouseMove={onMouseMove}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.outputEncoding = THREE.sRGBEncoding;
        }}
      >
        {/* <Controls /> */}
        <ambientLight intensity={1} />
        <pointLight position={[100, 100, 100]} intensity={1.1} />
        <pointLight
          position={[-100, -100, -100]}
          intensity={5}
          color={theme.accentColor}
        />
        <Suspense fallback={null}>
          <Number mouse={mouse} hover={hover} />
          <Spheres count={isMobile ? 50 : 100} theme={theme} />
          {/* <Effects /> */}
        </Suspense>
      </Canvas>
    </CanvasWrapper>
  );
}

const CanvasWrapper = styled.div`
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
`;

export default World;
