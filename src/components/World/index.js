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

    for (let i = 0; i < 10; i++) {
      tl.to(rot, 5, {
        x: -Math.random() * 1,
        y: Math.random() * 3,
        ease,
      })
        .to(pos, 5, {
          x: Math.random() * 15,
          y: Math.random(),
          z: Math.random() * 15,
          ease,
        })
        .to(pos, 5, {
          x: -Math.random() * 15,
          y: -Math.random() * 10,
          z: -Math.random() * 15,
          ease,
        })
        .to(rot, 5, {
          x: -Math.random() * 1,
          y: Math.random() * 3,
          ease,
        })
        .play();
    }
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
            {/* <Controls /> */}
            <ambientLight position={[0, 4, 0]} intensity={0.1} />
            {/* <directionalLight
              intensity={0.5}
              position={[0, 0, 0]}
              color={0xffffff}
            /> */}
            <pointLight
              intensity={1.9}
              position={[-6, 3, -6]}
              color={theme.id === "light" ? "#ccc" : "#999"}
            />
            {/* <pointLight intensity={1.9} position={[6, 3, 6]} color={0xffcc77} /> */}
            <Number mouse={mouse} hover={hover} />
            <Terrain2 />
            {/* <Effects /> */}
          </Canvas>
          <Controls />
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
