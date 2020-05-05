import * as THREE from "three";
import React, {
  Suspense,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import styled, { useTheme } from "styled-components";
import { useThemeContext } from "../../hooks";
import { isVisible } from "../../utils/transition";
import { Transition } from "react-transition-group";
import Number from "./Number";
import Controls from "./Controls";
import Terrain from "./Terrain";
import { TweenMax, TimelineMax, Elastic, Back } from "gsap";

function Camera(props) {
  const camera = useRef();
  const ease = Elastic.easeOut.config(1, 0.75);
  const { setDefaultCamera } = useThree();

  const [tl] = useState(new TimelineMax({ paused: true }));

  useEffect(() => {
    const pos = camera.current.position;
    const rotation = camera.current.rotation;

    tl.to(pos, 3, {
      z: 10,
      ease,
    })
      .to(pos, 3, { x: 30, ease })
      .to(rotation, 5, { x: -25 * (Math.PI / 180), ease })
      .to(pos, 3, { z: 30, y: 20, ease })
      .play();
  }, []);

  // This makes sure that size-related calculations are proper
  // Every call to useThree will return this camera instead of the default camera
  useEffect(() => void setDefaultCamera(camera.current), []);
  return <perspectiveCamera ref={camera} position={[0, 0, 0]} />;
}

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
    <Transition appear in timeout={3000}>
      {(status) => (
        <CanvasWrapper status={status}>
          <Canvas
            gl={{
              alpha: true,
              antialias: true,
              logarithmicDepthBuffer: false,
              powerPreference: "high-performance",
            }}
            pixelRatio={Math.min(2, isMobile ? window.devicePixelRatio : 1)}
            onMouseMove={onMouseMove}
            onCreated={({ gl }) => {
              gl.toneMapping = THREE.ACESFilmicToneMapping;
              gl.outputEncoding = THREE.sRGBEncoding;
            }}
          >
            <Camera />
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
              <Terrain
                color={theme.id === "light" ? "#666" : "black"}
                specular={"#666"}
              />
              {/* <Effects /> */}
            </Suspense>
          </Canvas>
        </CanvasWrapper>
      )}
    </Transition>
  );
}

const CanvasWrapper = styled.div`
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  opacity: ${(props) => (props.status === "entered" ? 1 : 0)};
  transition-property: opacity;
  transition-duration: 3s;
  transition-timing-function: ease;
`;

export default World;
