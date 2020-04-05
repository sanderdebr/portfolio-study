import * as THREE from "three";
import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, extend, useFrame, useThree } from "react-three-fiber";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { WaterPass } from "./post/Waterpass";

// Makes these prototypes available as "native" jsx-string elements
extend({
  EffectComposer,
  ShaderPass,
  RenderPass,
  WaterPass,
  AfterimagePass,
  UnrealBloomPass,
});

export default function Effects() {
  const composer = useRef();
  const { scene, gl, size, camera } = useThree();
  const aspect = useMemo(() => new THREE.Vector2(size.width, size.height), [
    size,
  ]);
  useEffect(() => void composer.current.setSize(size.width, size.height), [
    size,
  ]);
  useFrame(() => composer.current.render(), 1);
  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <afterimagePass attachArray="passes" uniforms-damp-value={0.3} />
      <unrealBloomPass attachArray="passes" args={[aspect, 1, 1, 0]} />
      <shaderPass
        attachArray="passes"
        args={[FXAAShader]}
        uniforms-resolution-value={[1 / size.width, 1 / size.height]}
        renderToScreen
      />
    </effectComposer>
  );
}
