import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import {
  Float,
  Circle,
  MeshReflectorMaterial,
  Icosahedron,
  OrbitControls,
  Stats,
  useHelper,
  SpotLight,
  Plane
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import useStore from "../singleComponents/Hooks/useStore";
import { useTimeline } from "../singleComponents/Hooks/useTimeLine";
import { Brady } from "../canvasComponents/Brady";
import { SpotLightHelper } from "three";
import { useControls } from 'leva'
import Smoke from '../canvasComponents/Smoke'
import * as THREE from 'three'

export default function ExampleScene(props: {
  setReveal: Dispatch<SetStateAction<boolean>>;
  reveal: boolean;
}) {
  let meshRef = useRef<THREE.Mesh>();
  const { viewport, mouse } = useThree();

  const lightRef = useRef<THREE.SpotLight>(null!);

  const vec = new THREE.Vector3()

  useFrame((state) => {
    if (meshRef.current !== undefined) {
      meshRef.current.rotateY((mouse.x * viewport.width) / 1500);
      meshRef.current.rotateZ((mouse.y * viewport.height) / 1500);
    }
    if ((lightRef.current !== undefined) && (lightRef.current !== null)) {
      lightRef.current.target.position.lerp(vec.set((state.mouse.x * viewport.width) / 12, (state.mouse.y * viewport.height) / 12, 0), 0.1)
      lightRef.current.target.updateMatrixWorld()
    }
  });

  const [renderState, setrenderState] = useState(false)

  useEffect(() => {    
    if(props.reveal) {
      setTimeout(() => {
        setrenderState(true)
      }, 500);
    }
  },[props.reveal])

  const BradyComponent = () => {
    return renderState ? 
    <>
      <Brady />
      <SpotLight
        ref={lightRef} 
        angle={lightControls.angle}
        position={lightControls.position}
        color={lightControls.color}
        decay={lightControls.decay}
        castShadow={lightControls.shadow}
        distance={lightControls.distance}
        intensity={lightControls.intensity}
        scale={lightControls.scale}
        power={lightControls.power}
        penumbra={lightControls.penumbra}
        attenuation={5}
        anglePower={4}
      />
    </> : <></>
  }

  const lightControls = useControls("spotLight", {
    angle: .3,
    position: [0,5,0],
    color: '#ffffff',
    decay: 1,
    shadow: false,
    distance: 9,
    intensity: 100,
    scale: 1,
    power: 500,
    penumbra: 1
  })

  return (
    <>
      <Plane
        args={[50, 36, 36]}
        rotation-x={-Math.PI / 2}
        position={[1, -1.7, 0]}
      >
        <MeshReflectorMaterial
          resolution={1024}
          blur={[400, 50]}
          mirror={2}
          mixBlur={.1}
          mixStrength={10}
          transparent
          opacity={0.3}
          color="#555"
          metalness={5}
          roughness={1}
        />
      </Plane>
      <Brady/>
      <SpotLight
        ref={lightRef} 
        angle={lightControls.angle}
        position={lightControls.position}
        color={lightControls.color}
        decay={lightControls.decay}
        castShadow={lightControls.shadow}
        distance={lightControls.distance}
        intensity={lightControls.intensity}
        scale={lightControls.scale}
        power={lightControls.power}
        penumbra={lightControls.penumbra}
        attenuation={5}
        anglePower={4}
      />
      {/* <BradyComponent /> */}
    </>
  );
}
