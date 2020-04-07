import React, {
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { random } from "lodash";
import { useFrame, useThree } from "react-three-fiber";
import { Tween, autoPlay, Easing } from "es6-tween";
import { randomColor } from "../../../utils/style";

const Sphere = ({ baseColor }) => {
  const mesh = useRef();
  const time = useRef(0);
  const { camera } = useThree();

  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [activeColor, setActiveColor] = useState(baseColor);

  const isActiveRef = useRef(isActive);

  // position
  const position = useMemo(() => {
    return [
      random(-50, 50, true),
      random(-50, 50, true),
      random(-50, 50, true),
    ];
  }, []);

  // random time mod factor
  const timeMod = useMemo(() => random(0.1, 4, true), []);

  // color
  const color = isHovered ? randomColor : isActive ? randomColor : baseColor;

  //useEffect of the activeState
  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  useEffect(() => {
    setActiveColor(baseColor);
  }, [baseColor]);

  // Tween
  // target position that camera tweens to
  const meshGrow = {
    scale: { x: 1.5, y: 1.5, z: 1.5 },
  };

  const meshShrink = {
    scale: { x: 1, y: 1, z: 1 },
  };

  autoPlay(true);

  function launchTween() {
    new Tween(mesh.current)
      .to(isActiveRef.current ? meshShrink : meshGrow)
      .easing(Easing.Cubic.InOut)
      .start();
  }

  // raf loop
  useFrame(() => {
    mesh.current.rotation.y += 0.01 * timeMod;
    if (isActiveRef.current) {
      time.current += 0.03;
      mesh.current.position.y = position[1] + Math.sin(time.current) * 5;
    }
  });

  // Events
  const onHover = useCallback(
    (e, value) => {
      document.body.style.cursor = "pointer";
      const color = randomColor();
      e.stopPropagation();
      setActiveColor(color);
      setIsHovered(value);
    },
    [setIsHovered]
  );

  const onClick = useCallback(
    (e) => {
      e.stopPropagation();
      setIsActive((v) => !v);
    },
    [setIsActive]
  );

  return (
    <mesh
      ref={mesh}
      position={position}
      onClick={(e) => {
        onClick(e);
        launchTween();
      }}
      onPointerOver={(e) => onHover(e, true, color)}
      onPointerOut={(e) => onHover(e, false)}
    >
      <sphereBufferGeometry attach="geometry" args={[2, 30, 30]} />
      <meshStandardMaterial
        attach="material"
        color={activeColor}
        roughness={0.6}
        metalness={0.1}
      />
    </mesh>
  );
};

export default Sphere;
