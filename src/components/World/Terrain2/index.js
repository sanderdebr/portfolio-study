import React, { useMemo } from "react";
import { useFrame, useUpdate, useEffect } from "react-three-fiber";
import { noise } from "../Terrain/perlin";
import * as THREE from "three";
import Everest from "../../../assets/textures/everest.bin";
// import Moss from "../../../assets/textures/moss.jpg";

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
    loadTerrain(Everest, (data) => {
      for (var i = 0, l = geometry.vertices.length; i < l; i++) {
        geometry.vertices[i].z = -(data[i] / 65535) * 10;
        geometry.verticesNeedUpdate = true;
      }
    });
  });

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry attach="geometry" args={[60, 60, 199, 199]} />
      <meshPhongMaterial
        attach="material"
        color={"#ccc"}
        specular={"#333"}
        shininess={3}
        wireframe
      />
    </mesh>
  );
};

export default Terrain;
