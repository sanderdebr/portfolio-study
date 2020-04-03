import * as THREE from "three";
import ReactDOM from "react-dom";
import React, {
  Suspense,
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo
} from "react";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import styled, { useTheme } from "styled-components";
import { useThemeContext } from "../../hooks";
import lerp from "lerp";
import Text from "./Text";
import Effects from "./Effects";
import Sparks from "./Sparks";
import Particles from "./Particles";
import Number from "./Number";
import Controls from "./Controls";
import Spheres from "./Spheres";

function World() {
  const [hovered, hover] = useState(false);
  const [down, set] = useState(false);
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
        pixelRatio={Math.min(2, isMobile ? window.devicePixelRatio : 1)}
        camera={{ fov: 100, position: [0, 0, 50] }}
        onMouseMove={onMouseMove}
        onMouseUp={() => set(false)}
        onMouseDown={() => set(true)}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.Uncharted2ToneMapping;
          gl.setClearColor(new THREE.Color("#020207"));
        }}
      >
        <Controls />
        <fog attach="fog" args={["white", 50, 190]} />
        <ambientLight intensity={1.1} />
        <pointLight position={[100, 100, 100]} intensity={1.2} />
        <pointLight
          position={[-100, -100, -100]}
          intensity={5}
          color={theme.id === "light" ? theme.textColor : theme.accentColor}
        />
        <Number mouse={mouse} hover={hover} />
        {/* <Particles color={"black"} count={isMobile ? 125 : 250} mouse={mouse} /> */}
        <Spheres mouse={mouse} />
        {/* <Sparks
          count={20}
          mouse={mouse}
          colors={[
            "#A2CCB6",
            "#FCEEB5",
            "#EE786E",
            "#e0feff",
            "lightpink",
            "lightblue"
          ]}
        /> */}
        <Effects down={down} />
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
