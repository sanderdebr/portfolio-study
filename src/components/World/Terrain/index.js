import React, { useMemo } from "react";
import { useFrame, useUpdate } from "react-three-fiber";
import { noise } from "./perlin";
import * as THREE from "three";
import Moss from "../../../assets/img/textures/moss.jpg";

const Terrain = (props) => {
  const mesh = useUpdate(({ geometry }) => {
    noise.seed(Math.random());
    let pos = geometry.getAttribute("position");
    let pa = pos.array;
    const hVerts = geometry.parameters.heightSegments + 1;
    const wVerts = geometry.parameters.widthSegments + 1;
    for (let j = 0; j < hVerts; j++) {
      for (let i = 0; i < wVerts; i++) {
        const ex = 1.05;
        pa[3 * (j * wVerts + i) + 2] =
          (noise.simplex2(i / 100, j / 100) +
            noise.simplex2((i + 200) / 50, j / 50) * Math.pow(ex, 1) +
            noise.simplex2((i + 400) / 25, j / 25) * Math.pow(ex, 2) +
            noise.simplex2((i + 600) / 12.5, j / 12.5) * Math.pow(ex, 3) +
            +(noise.simplex2((i + 800) / 6.25, j / 6.25) * Math.pow(ex, 4))) /
          2;
      }
    }

    console.log("update");

    pos.needsUpdate = true;
  }, []);

  // Raf loop
  useFrame(() => {
    mesh.current.rotation.z += 0.001;
  });

  const texture = useMemo(() => new THREE.TextureLoader().load(Moss), [Moss]);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(30, 30);

  return (
    <mesh receiveShadow castShadow ref={mesh} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[100, 100, 300, 300]} />
      <meshLambertMaterial
        attach="material"
        color="0xffffff"
        specular="0x111111"
        shininess={8}
        map={texture}
      />
      {/* <meshPhongMaterial
        attach="material"
        color={color}
        specular={specular}
        shininess={3}
        wireframe
      /> */}
    </mesh>
  );
};

export default Terrain;
