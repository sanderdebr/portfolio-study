import * as THREE from "three";
import React, { useRef, useMemo, useEffect } from "react";
import { extend, useThree, useFrame } from "react-three-fiber";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
// import { UnrealBloomPass } from "./post/UnrealBloomPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { BokehPass } from "three/examples/jsm/postprocessing/BokehPass";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass";
import GlitchPass from "./post/Glitchpass";
import { WaterPass } from "./post/Waterpass";
import { SSAOPass } from "three/examples/jsm/postprocessing/SSAOPass";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";

extend({
  EffectComposer,
  ShaderPass,
  RenderPass,
  WaterPass,
  UnrealBloomPass,
  BokehPass,
  FilmPass,
  GlitchPass,
  SSAOPass,
  FXAAShader
});

export default function Effects({ down }) {
  const composer = useRef();
  const { scene, gl, size, camera } = useThree();
  const aspect = useMemo(() => new THREE.Vector2(size.width, size.height), [
    size
  ]);
  useEffect(() => void composer.current.setSize(size.width, size.height), [
    size
  ]);
  useFrame(() => composer.current.render(), 1);
  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <shaderPass
        attachArray="passes"
        args={[FXAAShader]}
        material-uniforms-resolution-value={[1 / size.width, 1 / size.height]}
      />
      {/* <waterPass attachArray="passes" factor={1.5} /> */}
      <unrealBloomPass attachArray="passes" args={[aspect, 1, 1, 0]} />
      {/* <glitchPass attachArray="passes" factor={down ? 1 : 0} /> */}
    </effectComposer>
  );
}
