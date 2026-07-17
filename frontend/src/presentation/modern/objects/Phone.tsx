import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import type { Group, MeshStandardMaterial } from 'three'
import { useNarrativeStore } from '../state/narrativeStore'
import { afterStageProgress } from '../state/stageConfig'
import { useIdleFloat } from '../hooks/useIdleFloat'
import type { Profile } from '@core/models/resume.model'

export function Phone({ position, profile }: { position: [number, number, number]; profile: Profile | null }) {
  const groupRef = useRef<Group>(null)
  const screenMatRef = useRef<MeshStandardMaterial>(null)
  useIdleFloat(groupRef, { speed: 0.34, amplitude: 0.12, phase: 5.5 })

  useFrame(() => {
    const { progress } = useNarrativeStore.getState()
    const wake = afterStageProgress(progress, 'contact')
    if (screenMatRef.current) {
      screenMatRef.current.emissiveIntensity = THREE.MathUtils.lerp(0.05, 1.1, wake)
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Chunky faceted wooden dock */}
      <mesh position={[0, 0, 0]} rotation={[0.25, 0.5, 0.08]} scale={[1.05, 0.62, 1.05]} castShadow receiveShadow>
        <dodecahedronGeometry args={[0.95, 0]} />
        <meshStandardMaterial color="#c9975a" roughness={0.85} metalness={0.05} />
      </mesh>
      {/* Slot groove where the phone sits */}
      <mesh position={[0, 0.4, 0.03]} rotation={[-0.16, 0, 0]}>
        <boxGeometry args={[0.26, 0.4, 0.9]} />
        <meshStandardMaterial color="#1c1c1c" roughness={0.9} />
      </mesh>

      {/* Phone standing upright in the dock, slight recline */}
      <group position={[0, 0.85, -0.06]} rotation={[-0.16, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.5, 3, 0.16]} />
          <meshStandardMaterial color="#2b2e36" metalness={0.5} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0, 0.09]}>
          <planeGeometry args={[1.3, 2.7]} />
          <meshStandardMaterial
            ref={screenMatRef}
            color="#04070c"
            emissive="#38b6ff"
            emissiveIntensity={0.05}
            toneMapped={false}
          />
        </mesh>
        <Html transform distanceFactor={1.5} position={[0, 0, 0.1]} style={{ pointerEvents: 'none' }}>
          <div
            style={{
              width: 220,
              height: 460,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              fontFamily: 'Inter, system-ui, sans-serif',
              color: 'white',
            }}
          >
            <div style={{ fontSize: 14, opacity: 0.7 }}>{profile?.fullName ?? ''}</div>
            <div style={{ fontSize: 11, opacity: 0.45 }}>{profile?.email ?? ''}</div>
          </div>
        </Html>
      </group>
    </group>
  )
}
