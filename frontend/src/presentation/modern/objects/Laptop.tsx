import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import type { Group, MeshStandardMaterial } from 'three'
import { useNarrativeStore } from '../state/narrativeStore'
import { afterStageProgress, remapWithinStage } from '../state/stageConfig'
import { useIdleFloat } from '../hooks/useIdleFloat'

interface LaptopProps {
  position: [number, number, number]
  profileName: string
  profileTitle: string
}

const CLOSED_ANGLE = -Math.PI / 2 // lid lying flat on the base
const OPEN_ANGLE = -Math.PI * 0.12 // lid tilted back like a real laptop

export function Laptop({ position, profileName, profileTitle }: LaptopProps) {
  const groupRef = useRef<Group>(null)
  const lidRef = useRef<Group>(null)
  const screenMatRef = useRef<MeshStandardMaterial>(null)

  useIdleFloat(groupRef, { speed: 0.3, amplitude: 0.25, phase: 1.1 })

  useFrame(() => {
    const { progress, stage } = useNarrativeStore.getState()

    // Lid opens during the "laptopOpen" stage and stays open afterward.
    const openAmount = afterStageProgress(progress, 'laptopOpen')
    if (lidRef.current) {
      lidRef.current.rotation.x = THREE.MathUtils.lerp(CLOSED_ANGLE, OPEN_ANGLE, openAmount)
    }

    // Screen glow ramps up shortly after the lid opens, then boots.
    if (screenMatRef.current) {
      const bootLocal = remapWithinStage(progress, 'enterLaptop')
      const glow = Math.max(openAmount > 0.85 ? 1 : 0, bootLocal)
      screenMatRef.current.emissiveIntensity = THREE.MathUtils.lerp(0, 1.4, glow) * (stage === 'intro' ? 0 : 1)
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Base */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[6.4, 0.35, 4.4]} />
        <meshStandardMaterial color="#c7cbd1" metalness={0.6} roughness={0.35} />
      </mesh>
      {/* Trackpad + keys hint on base (very simplified) */}
      <mesh position={[0, 0.19, 0.6]}>
        <boxGeometry args={[5.6, 0.02, 3.2]} />
        <meshStandardMaterial color="#9aa0aa" metalness={0.4} roughness={0.5} />
      </mesh>

      {/* Lid, hinged at the back edge */}
      <group ref={lidRef} position={[0, 0.17, -2.2]} rotation={[CLOSED_ANGLE, 0, 0]}>
        <mesh position={[0, 2.1, 0.08]} castShadow>
          <boxGeometry args={[6.4, 4.2, 0.18]} />
          <meshStandardMaterial color="#d6d9de" metalness={0.65} roughness={0.3} />
        </mesh>
        {/* Screen */}
        <mesh position={[0, 2.1, -0.02]}>
          <planeGeometry args={[5.9, 3.7]} />
          <meshStandardMaterial
            ref={screenMatRef}
            color="#03060c"
            emissive="#2aa7ff"
            emissiveIntensity={0}
            toneMapped={false}
          />
        </mesh>
        <Html
          transform
          distanceFactor={2.7}
          position={[0, 2.1, 0.001]}
          rotation={[0, 0, 0]}
          style={{ pointerEvents: 'none' }}
        >
          <LaptopBootScreen name={profileName} title={profileTitle} />
        </Html>
      </group>
    </group>
  )
}

function LaptopBootScreen({ name, title }: { name: string; title: string }) {
  return (
    <div
      style={{
        width: 560,
        height: 350,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontFamily: 'Inter, system-ui, sans-serif',
        textAlign: 'center',
        userSelect: 'none',
      }}
    >
      <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 0.5 }}>{name}</div>
      <div style={{ fontSize: 15, opacity: 0.7, marginTop: 10, letterSpacing: 2, textTransform: 'uppercase' }}>
        {title}
      </div>
      <div
        style={{
          width: 2,
          height: 20,
          background: '#7fd3ff',
          marginTop: 22,
          animation: 'modern-cursor-blink 1s steps(1) infinite',
        }}
      />
      <style>{`@keyframes modern-cursor-blink { 50% { opacity: 0; } }`}</style>
    </div>
  )
}
