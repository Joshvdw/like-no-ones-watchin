import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import {
  Float,
  Circle,
  MeshReflectorMaterial,
  Icosahedron,
  OrbitControls,
  Stats,
  useHelper,
  SpotLight,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import useStore from "../singleComponents/Hooks/useStore";
import { useTimeline } from "../singleComponents/Hooks/useTimeLine";
import { Brady } from "../canvasComponents/Brady";
import { SpotLightHelper } from "three";
import { useControls } from 'leva'
import Smoke from '../canvasComponents/Smoke'

export default function ExampleScene(props: {
  setReveal: Dispatch<SetStateAction<boolean>>;
}) {
  let meshRef = useRef<THREE.Mesh>();
  const { viewport, mouse } = useThree();

  const lightRef = useRef<THREE.SpotLight>(null);
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

  useFrame(() => {
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
  });

  useEffect(() => {
    props.setReveal(true);
  }, []);

  const lightControls = useControls("spotLight", {
    angle: .3,
    position: [0,5,0],
    color: '#FFFFFF',
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
      <Circle
        args={[12.75, 36, 36]}
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
      </Circle>
      <Brady />
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
      <OrbitControls />
      {/* <Stats /> */}
    {/* LIGHTS */}
      <spotLight
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
      />
      <pointLight position={[10, 10, 10]} power={50} />
    </>
  );
}
