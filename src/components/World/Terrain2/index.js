import React, { useMemo } from "react";
import { useFrame, useUpdate, useEffect } from "react-three-fiber";
import { noise } from "../Terrain/perlin";
import * as THREE from "three";
import Everest from "../../../assets/textures/everest.bin";
import Moss from "../../../assets/textures/moss.jpg";

// Function to retrieve terrain height data in a array format
function loadTerrain(file, callback) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = "arraybuffer";
  xhr.open("GET", file, true);
  xhr.onload = function (evt) {
    if (xhr.response) {
      let result = new Uint16Array(xhr.response);
      callback(result);
    }
  };
  xhr.send(null);
}

const Terrain = (props) => {
  const mesh = useUpdate(({ geometry }) => {
    //let pos = geometry.getAttribute("position");

    loadTerrain(Everest, (data) => {
      for (var i = 0, l = geometry.vertices.length; i < l; i++) {
        geometry.vertices[i].z = (data[i] / 65535) * 10;
      }
      // pos.needsUpdate = true;
    });

    geometry.verticesNeedUpdate = true;
  });
  // const mesh = useUpdate(({ geometry }) => {
  //   // Access vertex positions
  //   let pos = geometry.getAttribute("position");
  //   let pa = pos.array;

  //   loadTerrain(Latvia, (data) => {
  //     console.log("called");
  //     // Set z values
  //     const hVerts = geometry.parameters.heightSegments + 1;
  //     const wVerts = geometry.parameters.widthSegments + 1;
  //     for (let j = 0; j < hVerts; j++) {
  //       for (let i = 0; i < wVerts; i++) {
  //         const zPoint = (data[i] / 65535) * 100;
  //         pa[3 * (j * wVerts + i) + 2] = zPoint;
  //         console.log(zPoint);
  //       }
  //     }

  //     pos.needsUpdate = true;
  //   });
  // }, []);

  return (
    <mesh ref={mesh} rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry attach="geometry" args={[60, 60, 199, 199]} />
      <meshLambertMaterial
        attach="material"
        color="grey"
        specular="blue"
        shininess={3}
        wireframe
      />
    </mesh>
  );
};

export default Terrain;
