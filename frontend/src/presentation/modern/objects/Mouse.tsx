import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

export function Mouse({ position }: { position: [number, number, number] }) {
  const ledRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (!ledRef.current) return
    const mat = ledRef.current.material as import('three').MeshStandardMaterial
    mat.emissiveIntensity = 0.6 + Math.sin(state.clock.elapsedTime * 2) * 0.5
  })

  return (
    <group position={position} rotation={[0, Math.PI, 0]}>
      {/* Smooth ergonomic body: an elongated, flattened dome (no visible button seams) */}
      <mesh castShadow scale={[0.62, 0.42, 0.95]}>
        <sphereGeometry args={[1, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.58]} />
        <meshStandardMaterial color="#1c1d20" metalness={0.15} roughness={0.35} />
      </mesh>
      {/* Subtle flat underside so it sits flush on the desk */}
      <mesh position={[0, -0.105, 0]}>
        <cylinderGeometry args={[0.58, 0.58, 0.02, 32]} />
        <meshStandardMaterial color="#0c0c0d" roughness={0.6} />
      </mesh>
      {/* Faint center seam suggesting left/right click split */}
      <mesh position={[0, 0.415, 0.15]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.006, 0.006, 0.9, 6]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.8} />
      </mesh>
      {/* Scroll wheel */}
      <mesh position={[0, 0.44, 0.42]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.14, 20]} />
        <meshStandardMaterial color="#050505" roughness={0.4} />
      </mesh>
      {/* Status LED */}
      <mesh ref={ledRef} position={[0, 0.32, 0.75]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color="#0a0a0a" emissive="#00e0ff" emissiveIntensity={0.6} toneMapped={false} />
      </mesh>
    </group>
  )
}
