import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Very subtle floating dust/ambient particles for the space environment.
 * Deliberately sparse and slow — "no excessive particles" per brief.
 */
export function ParticleField({
  count = 220,
  radius = 90,
  color = '#6fb7ff',
  opacity = 0.35,
}: {
  count?: number
  radius?: number
  color?: string
  opacity?: number
}) {
  const pointsRef = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * radius * 2
      arr[i * 3 + 1] = Math.random() * 60 - 10
      arr[i * 3 + 2] = (Math.random() - 0.5) * radius * 2
    }
    return arr
  }, [count, radius])

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.006
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.22}
        sizeAttenuation
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </points>
  )
}
