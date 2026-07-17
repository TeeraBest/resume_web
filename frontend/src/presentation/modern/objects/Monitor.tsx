import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, RoundedBox } from '@react-three/drei'
import type { Group, MeshStandardMaterial } from 'three'
import { useIdleFloat } from '../hooks/useIdleFloat'

export function Monitor({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<Group>(null)
  const screenMatRef = useRef<MeshStandardMaterial>(null)
  useIdleFloat(groupRef, { speed: 0.28, amplitude: 0.2, phase: 2.4 })

  useFrame((state) => {
    if (screenMatRef.current) {
      // Gentle always-on breathing glow — the workspace feels "alive"
      screenMatRef.current.emissiveIntensity = 0.9 + Math.sin(state.clock.elapsedTime * 0.8) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Wide flat foot, like a real monitor stand base */}
      <RoundedBox args={[3.4, 0.14, 2.1]} radius={0.08} smoothness={4} position={[0, -2.55, 0.3]} castShadow receiveShadow>
        <meshStandardMaterial color="#22242a" metalness={0.6} roughness={0.35} />
      </RoundedBox>
      {/* Slim neck */}
      <mesh position={[0, -1.55, -0.15]}>
        <boxGeometry args={[0.32, 1.9, 0.32]} />
        <meshStandardMaterial color="#26282e" metalness={0.6} roughness={0.35} />
      </mesh>
      {/* Hinge joint */}
      <mesh position={[0, -0.55, -0.15]} rotation-x={Math.PI / 2}>
        <cylinderGeometry args={[0.22, 0.22, 0.4, 16]} />
        <meshStandardMaterial color="#3a3d44" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Slim bezel panel, tilted back very slightly like a real display */}
      <group rotation={[-0.035, 0, 0]}>
        <RoundedBox args={[7.4, 4.3, 0.2]} radius={0.05} smoothness={4} castShadow>
          <meshStandardMaterial color="#111318" metalness={0.35} roughness={0.55} />
        </RoundedBox>
        {/* Screen */}
        <mesh position={[0, 0, 0.11]}>
          <planeGeometry args={[7.0, 3.95]} />
          <meshStandardMaterial
            ref={screenMatRef}
            color="#020409"
            emissive="#1c8bff"
            emissiveIntensity={0.9}
            toneMapped={false}
          />
        </mesh>
        <Html transform distanceFactor={3.1} position={[0, 0, 0.12]} style={{ pointerEvents: 'none' }}>
          <div
            style={{
              width: 660,
              height: 370,
              background: 'linear-gradient(160deg, rgba(10,16,28,0.9), rgba(6,10,18,0.95))',
              borderRadius: 6,
              padding: 18,
              fontFamily: 'Menlo, monospace',
              fontSize: 13,
              color: '#7fd3ff',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ opacity: 0.6, marginBottom: 10 }}>$ workspace --status</div>
            <div>✓ api gateway: healthy</div>
            <div>✓ cache layer: connected</div>
            <div>✓ database: synced</div>
            <div style={{ marginTop: 10, opacity: 0.5 }}>watching for changes...</div>
          </div>
        </Html>
      </group>
    </group>
  )
}
