import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import useStore from '../singleComponents/Hooks/useStore'

export function Brady(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/glbs/brady.glb')
  const { actions } = useAnimations(animations, group)

  const animationState = useStore((state) => state.animation)
  const previousAnimation = usePrevious(animationState)

  const bradyRef = useRef()

  useEffect(() => {
    actions['singing'].time = 8.7
    actions['singing'].timeScale = 1.15

    if(previousAnimation) {
      actions[previousAnimation].fadeOut(0.8)
      actions[previousAnimation].stop()
    }    
    actions[animationState].play()

    if(animationState == "falling") {
      actions[animationState].fadeIn(0.1)
    } else {
    actions[animationState].fadeIn(0.6)
    }
  }, [animationState])

  useEffect(() => {
    playSound()
  }, [])

  function playSound() {
    setTimeout(() => {
      const spotlight = document.getElementById("spotlight")
      const singing = document.getElementById("singing")
      //@ts-ignore
      spotlight.volume = .2
      //@ts-ignore
      spotlight?.play()
      //@ts-ignore
      singing.volume = .5
      //@ts-ignore
      setTimeout(() => {
        singing?.play()
      }, 200)
    }, 50)
  }

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="brady" ref={bradyRef} position={[0,-1.7,0]} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <group name="Ch40__mod_FIN__V01_01_Ch40">
            <skinnedMesh name="Mesh" geometry={nodes.Mesh.geometry} material={materials.Ch40_body} skeleton={nodes.Mesh.skeleton} />
            <skinnedMesh name="Mesh_1" geometry={nodes.Mesh_1.geometry} material={materials.Ch40_body1} skeleton={nodes.Mesh_1.skeleton} />
            <skinnedMesh name="Mesh_2" geometry={nodes.Mesh_2.geometry} material={materials['01']} skeleton={nodes.Mesh_2.skeleton} />
          </group>
          <skinnedMesh name="Ch40__mod_FIN__V01_01_Ch40_Beard" geometry={nodes.Ch40__mod_FIN__V01_01_Ch40_Beard.geometry} material={materials.Ch40_hair} skeleton={nodes.Ch40__mod_FIN__V01_01_Ch40_Beard.skeleton} />
          <skinnedMesh name="Ch40__mod_FIN__V01_01_Ch40_Hair" geometry={nodes.Ch40__mod_FIN__V01_01_Ch40_Hair.geometry} material={materials.Ch40_hair} skeleton={nodes.Ch40__mod_FIN__V01_01_Ch40_Hair.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/glbs/brady.glb')

function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}