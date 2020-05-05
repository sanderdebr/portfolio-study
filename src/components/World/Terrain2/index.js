import React, { useMemo } from "react";
import * as THREE from "three";
import { useFrame, useUpdate } from "react-three-fiber";
import Moss from "../../../assets/textures/moss.jpg";
import Latvia from "../../../assets/textures/latvia.bin";

function loadTerrain(file, callback) {
  let elevationMap;
  var xhr = new XMLHttpRequest();
  xhr.responseType = "arraybuffer";
  xhr.open("GET", file, true);
  xhr.onload = function (evt) {
    if (xhr.response) {
      callback(new Uint16Array(xhr.response));
    }
  };
  xhr.send(null);
  return elevationMap;
}

export default async function Terrain2() {
  const mesh = useUpdate(({ geometry }) => {
    let pos = geometry.getAttribute("position");
    let pa = pos.array;
    const hVerts = geometry.parameters.heightSegments + 1;
    const wVerts = geometry.parameters.widthSegments + 1;
    loadTerrain(Latvia, (result) => {
      for (let j = 0; j < hVerts; j++) {
        for (let i = 0; i < wVerts; i++) {
          const ex = 1.05;
          // pa[3 * (j * wVerts + i) + 2] = (result[i] / 65535) * 25;
        }
      }
    });

    console.log("update");

    pos.needsUpdate = true;
  }, []);

  //   const terrainLoader = useMemo(() => new TerrainLoader().load(Moss), [Moss]);
  //   terrainLoader.load(Latvia, function (data) {
  //     console.log(data);
  //   });

  //   texture.wrapS = THREE.RepeatWrapping;
  //   texture.wrapT = THREE.RepeatWrapping;
  //   texture.repeat.set(30, 30);

  return (
    <mesh ref={mesh}>
      <planeBufferGeometry attach="geometry" args={[60, 60, 199, 199]} />
      <meshLambertMaterial
        attach="material"
        color="0xffffff"
        specular="0x111111"
        shininess={8}
        // map={texture}
      />
    </mesh>
  );
}
