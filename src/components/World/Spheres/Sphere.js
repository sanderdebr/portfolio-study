import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback
} from "react";
import { random } from "lodash";
import { useFrame } from "react-three-fiber";

const Sphere = () => {
  const mesh = useRef();
  const time = useRef(0);

  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const isActiveRef = useRef(isActive);

  // Position
  const position = useMemo(() => {
    return [
      random(-100, 100, true),
      random(0, 100, true),
      random(-100, 100, true)
    ];
  }, []);

  // random time mod factor
  const timeMod = useMemo(() => random(0.1, 4, true), []);

  // Color
  const color = isHovered ? 0xe5d54d : isActive ? 0xf7e7e5 : 0x000000;

  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  // Raf loop
  useFrame(() => {
    mesh.current.rotation.y += 0.01 * timeMod;
    if (isActiveRef.current) {
      time.current += 0.03;
      mesh.current.position.y = position[1] + Math.sin(time.current) * 0.4;
    }
  });

  // Events
  const onHover = useCallback(
    (e, value) => {
      e.stopPropagation();
      setIsHovered(value);
    },
    [setIsHovered]
  );

  const onClick = useCallback(
    e => {
      e.stopPropagation();
      setIsActive(v => !v);
    },
    [setIsActive]
  );

  return (
    <mesh
      ref={mesh}
      position={position}
      onClick={onClick}
      onPointerOver={e => onHover(e, true)}
      onPointerOut={e => onHover(e, false)}
    >
      <sphereBufferGeometry attach="geometry" args={[3, 32, 32]} />
      <meshPhongMaterial attach="material" color={color} />
    </mesh>
  );
};

export default Sphere;
