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
}) {
  let meshRef = useRef<THREE.Mesh>();
  const { viewport, mouse } = useThree();

  const lightRef = useRef<THREE.SpotLight>(null!);
  // useHelper(lightRef, SpotLightHelper, 'red')

  //Importing global scroll function
  const scroll = useStore((state) => state.scroll);

  const GPUTier = useStore((state) => state.GPUTier);

  //Keyframes for scroll based animations
  const keyframes = {
    rotation: [
      { time: 0, val: 0 },
      { time: 500, val: -100, easing: "easeInSine" },
      { time: 1000, val: 100, easing: "easeInSine" },
    ],
  };

  const remapKeyframes = {
    frame: [
      { time: 0, val: 0 },
      { time: 1000, val: 1000, easing: "linear" },
    ],
  };

  const [timeline, axes] = useTimeline(keyframes);
  const [timeRemap, timeAxe] = useTimeline(remapKeyframes);

  const vec = new THREE.Vector3()

  useFrame((state) => {
    if (meshRef.current !== undefined) {
      meshRef.current.rotateY((mouse.x * viewport.width) / 1500);
      meshRef.current.rotateZ((mouse.y * viewport.height) / 1500);
    }

    // scrubbing through the keyframes using the interpolated scroll value
    if (scroll?.animation.changed) {
      const y = scroll.get()[0];
      // @ts-ignore
      timeRemap.seek(timeRemap.duration * y);
      // @ts-ignore
      timeline.seek(timeAxe.current.frame);
      // @ts-ignore
      // meshRef.current?.rotateY(axes.current.rotation / 1500);
    }
    if ((lightRef.current !== undefined) && (lightRef.current !== null)) {
      lightRef.current.target.position.lerp(vec.set((state.mouse.x * viewport.width) / 12, (state.mouse.y * viewport.height) / 12, 0), 0.1)
      lightRef.current.target.updateMatrixWorld()
    }
  });

  useEffect(() => {
    props.setReveal(true);
  }, []);

  const [renderState, setrenderState] = useState(false)

  setTimeout(() => {
    setrenderState(true)
  }, 500);

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
      <BradyComponent />
      {/* <color attach="background" args={['#202020']} /> */}
      {/* <fog attach="fog" args={['#616161', 5, 30]} /> */}
    
      {/* <Smoke /> */}
      {/* <Circle/> */}
      {/* <Float floatIntensity={3}>
        <Icosahedron
          args={[1.5]}
          castShadow={true}
          ref={meshRef}
          onClick={() => {
            console.log(mouse);
          }}
        >
          <MeshReflectorMaterial
            resolution={1024}
            blur={[400, 50]}
            mirror={0}
            mixBlur={0.75}
            mixStrength={10}
            transparent
            opacity={1}
            color="orange"
            metalness={2}
            roughness={1}
          />
        </Icosahedron>
      </Float> */}

      {/* DEVELOPMENT */}
      {/* <OrbitControls /> */}
      {/* <Stats /> */}
    {/* LIGHTS */}

      {/* <pointLight position={[10, 10, 10]} power={50} /> */}
    </>
  );
}
