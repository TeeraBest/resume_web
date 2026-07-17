import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Group } from 'three'
import { useNarrativeStore } from '../state/narrativeStore'
import { afterStageProgress } from '../state/stageConfig'
import type { StageId } from '../state/narrativeStore'
import { useIdleFloat } from '../hooks/useIdleFloat'

interface NotebookProps {
  position: [number, number, number]
  openDuringStage: StageId
  color?: string
}

export function Notebook({ position, openDuringStage, color = '#3a4250' }: NotebookProps) {
  const groupRef = useRef<Group>(null)
  const coverRef = useRef<Group>(null)
  useIdleFloat(groupRef, { speed: 0.3, amplitude: 0.18, phase: 3.2 })

  useFrame(() => {
    const { progress } = useNarrativeStore.getState()
    const openAmount = afterStageProgress(progress, openDuringStage)
    if (coverRef.current) {
      coverRef.current.rotation.x = THREE.MathUtils.lerp(0, -Math.PI * 0.92, openAmount)
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Pages */}
      <mesh position={[0, 0.06, 0]} receiveShadow>
        <boxGeometry args={[2.6, 0.14, 3.4]} />
        <meshStandardMaterial color="#f2efe8" roughness={0.9} />
      </mesh>
      {/* Back cover (static) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.7, 0.1, 3.5]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      {/* Front cover, hinges open along the back edge */}
      <group ref={coverRef} position={[0, 0.1, 1.7]}>
        <mesh position={[0, 0, -1.7]}>
          <boxGeometry args={[2.7, 0.1, 3.5]} />
          <meshStandardMaterial color={color} roughness={0.55} metalness={0.05} />
        </mesh>
      </group>
    </group>
  )
}
