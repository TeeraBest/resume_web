import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Group, InstancedMesh } from 'three'
import { useIdleFloat } from '../hooks/useIdleFloat'

const UNITS = 6
const LEDS_PER_UNIT = 3

export function ServerRack({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<Group>(null)
  const ledRef = useRef<InstancedMesh>(null)
  const fan1 = useRef<Group>(null)
  const fan2 = useRef<Group>(null)
  useIdleFloat(groupRef, { speed: 0.25, amplitude: 0.2, phase: 4.1 })

  const ledPhases = useMemo(
    () => Array.from({ length: UNITS * LEDS_PER_UNIT }, () => Math.random() * Math.PI * 2),
    [],
  )

  useFrame((state) => {
    if (fan1.current) fan1.current.rotation.z += 0.06
    if (fan2.current) fan2.current.rotation.z -= 0.05

    if (ledRef.current) {
      const dummy = new THREE.Object3D()
      let i = 0
      for (let u = 0; u < UNITS; u++) {
        for (let l = 0; l < LEDS_PER_UNIT; l++) {
          const blink = 0.4 + 0.6 * Math.max(0, Math.sin(state.clock.elapsedTime * 3 + ledPhases[i]))
          dummy.position.set(-2.6 + l * 0.5, 3.4 - u * 1.05, 1.02)
          dummy.scale.setScalar(0.5 + blink * 0.5)
          dummy.updateMatrix()
          ledRef.current.setMatrixAt(i, dummy.matrix)
          ledRef.current.setColorAt(i, new THREE.Color(l === 0 ? '#33ff88' : l === 1 ? '#3aa7ff' : '#ffb020'))
          i++
        }
      }
      ledRef.current.instanceMatrix.needsUpdate = true
      if (ledRef.current.instanceColor) ledRef.current.instanceColor.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Cabinet */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[6, 8, 2]} />
        <meshStandardMaterial color="#2b3038" metalness={0.4} roughness={0.55} />
      </mesh>
      {/* Unit seams */}
      {Array.from({ length: UNITS }).map((_, i) => (
        <mesh key={i} position={[0, 3.4 - i * 1.05, 1.01]}>
          <boxGeometry args={[5.6, 0.9, 0.02]} />
          <meshStandardMaterial color="#383e48" metalness={0.35} roughness={0.6} />
        </mesh>
      ))}
      {/* Blinking LEDs (instanced) */}
      <instancedMesh ref={ledRef} args={[undefined, undefined, UNITS * LEDS_PER_UNIT]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial toneMapped={false} emissive="#ffffff" emissiveIntensity={1.5} />
      </instancedMesh>
      {/* Cooling fans on the side */}
      <group position={[3.02, 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <torusGeometry args={[0.6, 0.08, 8, 20]} />
          <meshStandardMaterial color="#2a2e35" />
        </mesh>
        <group ref={fan1}>
          {[0, 1, 2, 3].map((i) => (
            <mesh key={i} rotation={[0, 0, (Math.PI / 2) * i]} position={[0.3, 0, 0]}>
              <boxGeometry args={[0.55, 0.12, 0.03]} />
              <meshStandardMaterial color="#454b55" />
            </mesh>
          ))}
        </group>
      </group>
      <group position={[3.02, -1.2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <torusGeometry args={[0.6, 0.08, 8, 20]} />
          <meshStandardMaterial color="#2a2e35" />
        </mesh>
        <group ref={fan2}>
          {[0, 1, 2, 3].map((i) => (
            <mesh key={i} rotation={[0, 0, (Math.PI / 2) * i]} position={[0.3, 0, 0]}>
              <boxGeometry args={[0.55, 0.12, 0.03]} />
              <meshStandardMaterial color="#454b55" />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  )
}
