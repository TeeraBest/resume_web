import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/**
 * Applies a slow, gentle floating bob + sway to whatever group ref is attached.
 * Used on the whole desk and on individual objects for a "floating workspace" feel.
 */
export function useIdleFloat(ref: React.RefObject<Group>, options?: { speed?: number; amplitude?: number; phase?: number }) {
  const { speed = 0.35, amplitude = 0.35, phase = 0 } = options ?? {}
  const t0 = useRef(phase)
  const baseY = useRef<number | null>(null)

  useFrame((_state, delta) => {
    if (!ref.current) return
    if (baseY.current === null) baseY.current = ref.current.position.y

    t0.current += delta * speed
    ref.current.position.y = baseY.current + Math.sin(t0.current) * amplitude
    ref.current.rotation.z = Math.sin(t0.current * 0.6) * 0.008
    ref.current.rotation.x = Math.cos(t0.current * 0.5) * 0.006
  })
}
