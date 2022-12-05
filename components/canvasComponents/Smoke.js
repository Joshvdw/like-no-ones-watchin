import React, { Suspense, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three'
import { useTexture } from "@react-three/drei";

export default function Smoke() {
  const tempObject = useMemo(() => new THREE.Object3D(), []);
  const ref = useRef();
  const texture = useTexture('/images/smoke.png');

  const particles = useMemo(() => {
    const cloudParticles = [];
    for (let p = 0; p < 50; p++) {
      const positionX = Math.random() * 800 - 400;
      const positionZ = Math.random() * 500 - 500;
      const rotationZ = Math.random() * 2 * Math.PI;
      
      cloudParticles.push({
        positionX,
        positionZ,
        rotationZ,
      });
    }
    return cloudParticles;
  },[]);

  useFrame(() => {
    particles.forEach((particle, i) => {
      let { positionX, positionZ, rotationZ } = particle;
      tempObject.position.set(positionX, 0, positionZ);
      tempObject.rotation.set(0, 0, rotationZ);
      tempObject.updateMatrix();
      ref.current.setMatrixAt(i, tempObject.matrix);
    });
    particles.forEach((particle) => (particle.rotationZ -= 0.001));
    ref.current.instanceMatrix.needsUpdate = true;
  });


  return (
    <instancedMesh ref={ref} args={[null, null, 40]}>
      <planeBufferGeometry attach="geometry" args={[500, 500]} />
      <meshLambertMaterial
        attach="material"
        map={texture}
        depthWrite={false}
        transparent
        opacity={0.5}
        // position={[0,0,-10]}
      />
    </instancedMesh>
  );
}