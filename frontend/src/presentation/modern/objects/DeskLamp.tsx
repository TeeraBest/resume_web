import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group, PointLight } from 'three'

export function DeskLamp({ position }: { position: [number, number, number] }) {
  const lightRef = useRef<PointLight>(null)
  const groupRef = useRef<Group>(null)
  const flickered = useRef(false)
  const startTime = useRef<number | null>(null)

  useFrame((state) => {
    if (!lightRef.current) return
    if (startTime.current === null) startTime.current = state.clock.elapsedTime

    const t = state.clock.elapsedTime - startTime.current
    if (!flickered.current && t < 1.4) {
      // One soft flicker near the very start, per brief
      const flicker = t < 0.15 ? 0.2 : t < 0.3 ? 1 : t < 0.4 ? 0.3 : 1
      lightRef.current.intensity = flicker * 6
      if (t >= 0.4) flickered.current = true
    } else {
      lightRef.current.intensity = 6
    }
  })

  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[0.6, 0.7, 0.15, 16]} />
        <meshStandardMaterial color="#2a2e35" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 2.4, 8]} />
        <meshStandardMaterial color="#3a3f47" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0.5, 0.3, 0]} rotation={[0, 0, Math.PI / 4]}>
        <coneGeometry args={[0.5, 0.9, 20, 1, true]} />
        <meshStandardMaterial color="#eee8dd" emissive="#ffdca8" emissiveIntensity={0.6} side={2} />
      </mesh>
      <pointLight ref={lightRef} position={[0.7, 0.1, 0]} color="#ffdca8" intensity={6} distance={18} decay={2} />
    </group>
  )
}
