import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Points } from 'three'

export function CoffeeCup({ position }: { position: [number, number, number] }) {
  const steamRef = useRef<Points>(null)

  const steamPositions = useMemo(() => {
    const count = 24
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 0.3
      arr[i * 3 + 1] = Math.random() * 1.6
      arr[i * 3 + 2] = (Math.random() - 0.5) * 0.3
    }
    return arr
  }, [])

  useFrame((state, delta) => {
    if (!steamRef.current) return
    const posAttr = steamRef.current.geometry.getAttribute('position') as THREE.BufferAttribute
    const arr = posAttr.array as Float32Array
    for (let i = 0; i < arr.length; i += 3) {
      arr[i + 1] += delta * 0.35
      if (arr[i + 1] > 1.6) arr[i + 1] = 0
      arr[i] += Math.sin(state.clock.elapsedTime + i) * 0.001
    }
    posAttr.needsUpdate = true
  })

  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.45, 0.38, 0.7, 20]} />
        <meshStandardMaterial color="#e8e4de" roughness={0.4} />
      </mesh>
      <mesh position={[0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.22, 0.06, 10, 20, Math.PI]} />
        <meshStandardMaterial color="#e8e4de" roughness={0.4} />
      </mesh>
      <points ref={steamRef} position={[0, 0.4, 0]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[steamPositions, 3]} count={24} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#ffffff" size={0.12} transparent opacity={0.25} depthWrite={false} />
      </points>
    </group>
  )
}
