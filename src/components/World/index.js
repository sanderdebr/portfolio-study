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
// import Controls from "./Controls";
import Terrain from "./Terrain";
import Terrain2 from "./Terrain2";
import { TweenMax, TimelineMax, Elastic, Back } from "gsap";
import { Controls, useControl } from "react-three-gui";
import { rgba } from "../../utils/style";

const Camera = (props) => {
  const camera = useRef();
  const ease = Elastic.easeOut.config(1, 0.75);
  const { setDefaultCamera } = useThree();

  const [tl] = useState(new TimelineMax({ paused: true }));

  const posX = useControl("Pos X", { type: "number", min: -60, max: 60 });
  const posY = useControl("Pos Y", { type: "number", min: -60, max: 60 });
  const posZ = useControl("Pos Z", { type: "number", min: -60, max: 60 });

  const rotX = useControl("Pos X", { type: "number" });
  const rotY = useControl("Pos Y", { type: "number" });
  const rotZ = useControl("Pos Z", { type: "number" });

  // const rotateXY = useControl("Rotation", { type: "xypad", distance: Math.PI });

  // ANIMATE USING GSAP
  useEffect(() => {
    const pos = camera.current.position;
    const rot = camera.current.rotation;
    const time = 3;

    // Starting position
    tl.to(pos, time, {
      x: 19.6,
      y: -20.4,
      z: -31.2,
    })
      .to(rot, time, {
        y: 2.44,
      })
      // Position 1
      .to(pos, time, {
        y: -5.2,
      })
      .to(rot, time, {
        x: 0.2,
      })
      // Position 2
      .to(pos, time, {
        x: -0.8,
      })
      // Position 3
      .to(pos, time, {
        x: 3.6,
        y: 3.6,
        z: -14.8,
      })
      .to(rot, time, {
        x: 0.5,
        y: 3,
        z: 0,
      })
      .play();
  }, []);

  // This makes sure that size-related calculations are proper
  // Every call to useThree will return this camera instead of the default camera
  useEffect(() => void setDefaultCamera(camera.current), []);
  return (
    <perspectiveCamera
      ref={camera}
      position={[posX, posY, posZ]}
      rotation={[rotX, rotY, rotZ]}
    />
  );
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
          <Canvas>
            <Camera />
            {/* Camera controls <Controls /> */}
            <ambientLight position={[40, 40, 40]} intensity={0.1} />
            <pointLight
              intensity={0.5}
              position={[-6, 25, -6]}
              color={"#999"}
            />
            <Number mouse={mouse} hover={hover} />
            <Terrain2 />
            {/* <Effects /> */}
          </Canvas>
          {/* Camera GUI <Controls /> */}
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
