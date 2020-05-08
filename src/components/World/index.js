import * as THREE from "three";
import React, {
  Suspense,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { Canvas, useRender, useThree } from "react-three-fiber";
import styled, { useTheme } from "styled-components";
import { useThemeContext } from "../../hooks";
import { isVisible } from "../../utils/transition";
import { Transition } from "react-transition-group";
import Number from "./Number";
import Controls from "./Controls";
import Terrain from "./Terrain";
import Terrain2 from "./Terrain2";
import { TweenMax, TimelineMax, Elastic, Back } from "gsap";

const Camera = (props) => {
  const camera = useRef();
  const ease = Elastic.easeOut.config(1, 0.75);
  const { setDefaultCamera } = useThree();

  const [tl] = useState(new TimelineMax({ paused: true }));

  // ANIMATE USING GSAP
  // useEffect(() => {
  //   const pos = camera.current.position;
  //   const rotation = camera.current.rotation;

  //   tl.to(pos, 3, {
  //     z: 10,
  //     ease,
  //   })
  //     .to(pos, 3, { x: 30, ease })
  //     .to(rotation, 5, { x: -25 * (Math.PI / 180), ease })
  //     .to(pos, 3, { z: 30, y: 20, ease })
  //     .play();
  // }, []);

  // This makes sure that size-related calculations are proper
  // Every call to useThree will return this camera instead of the default camera
  useEffect(() => void setDefaultCamera(camera.current), []);
  return <perspectiveCamera ref={camera} position={[0, 0, 20]} />;
};

const Light = () => {
  //Create a PointLight and turn on shadows for the light
  const light = new THREE.DirectionalLight(0xffe0bb);
  light.intensity = 1.3;

  light.castShadow = true;

  light.shadow.camera.near = -20;
  light.shadow.camera.far = 60;
  light.shadow.camera.left = -24;
  light.shadow.camera.right = 24;
  light.shadow.camera.top = 24;
  light.shadow.camera.bottom = -24;

  light.shadow.camera.visible = true;

  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;
  return <primitive object={light} />;
};

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
            <Controls />
            <ambientLight color={0x556680} />
            <fog color={0xddeeff} intensity={0.00025} />
            <Light />
            <Suspense fallback={null}>
              <Number mouse={mouse} hover={hover} />
              <Terrain2 />
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
