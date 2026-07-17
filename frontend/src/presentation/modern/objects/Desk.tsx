import { useRef } from 'react'
import type { Group } from 'three'
import { useIdleFloat } from '../hooks/useIdleFloat'

/** The floating desk slab that every other object sits on top of. */
export function Desk({ position, children }: { position: [number, number, number]; children?: React.ReactNode }) {
  const groupRef = useRef<Group>(null)
  useIdleFloat(groupRef, { speed: 0.22, amplitude: 0.3, phase: 0 })

  return (
    <group ref={groupRef} position={position}>
      <mesh receiveShadow castShadow position={[0, 4, 0]}>
        <boxGeometry args={[44, 0.5, 34]} />
        <meshStandardMaterial color="#3a4152" metalness={0.3} roughness={0.5} />
      </mesh>
      {/* Thin glowing rim underneath, sells the "floating" sci-fi feel */}
      <mesh position={[0, 3.72, 0]}>
        <boxGeometry args={[43.6, 0.04, 33.6]} />
        <meshStandardMaterial color="#0a1c2e" emissive="#1c8bff" emissiveIntensity={0.6} toneMapped={false} />
      </mesh>
      {children}
    </group>
  )
}
