import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import type { Group, Mesh } from 'three'
import type { Skill } from '@core/models/resume.model'
import { useIdleFloat } from '../hooks/useIdleFloat'
import { useNarrativeStore } from '../state/narrativeStore'

interface KeyboardProps {
  position: [number, number, number]
  skills: Skill[]
}

const COLS = 5

export function Keyboard({ position, skills }: KeyboardProps) {
  const groupRef = useRef<Group>(null)
  useIdleFloat(groupRef, { speed: 0.32, amplitude: 0.15, phase: 0.6 })
  const activeSkillId = useNarrativeStore((s) => s.activeSkillId)

  const limited = useMemo(() => skills.slice(0, 20), [skills])

  return (
    <group ref={groupRef} position={position}>
      {/* Deck */}
      <mesh receiveShadow>
        <boxGeometry args={[7.5, 0.3, 3]} />
        <meshStandardMaterial color="#343b46" metalness={0.4} roughness={0.5} />
      </mesh>
      {limited.map((skill, i) => {
        const col = i % COLS
        const row = Math.floor(i / COLS)
        const x = (col - (COLS - 1) / 2) * 1.4
        const z = (row - 1.5) * 0.62
        const isActive = skill.id === activeSkillId

        return (
          <>
            <KeyCap key={skill.id} skill={skill} index={i} position={[x, 0.2, z]} />
            {isActive && (
              <Html key={`${skill.id}-label`} position={[x, 0.62, z]} center transform distanceFactor={10}>
                <div className="pointer-events-none rounded-full border border-cyan-300/30 bg-slate-950/85 px-3 py-1 text-[10px] font-semibold tracking-wide text-cyan-100 shadow-[0_0_18px_rgba(79,214,255,0.35)]">
                  {skill.name}
                </div>
              </Html>
            )}
          </>
        )
      })}
    </group>
  )
}

function KeyCap({ skill, index, position }: { skill: Skill; index: number; position: [number, number, number] }) {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const baseY = position[1]

  useFrame((state) => {
    if (!meshRef.current) return
    const mat = meshRef.current.material as THREE.MeshStandardMaterial

    // RGB breathing wave across the keyboard, offset per key
    const hue = ((state.clock.elapsedTime * 0.05 + index * 0.05) % 1 + 1) % 1
    const color = new THREE.Color().setHSL(hue, 0.65, hovered ? 0.6 : 0.4)
    mat.emissive.copy(color)
    mat.emissiveIntensity = hovered ? 1.4 : 0.55

    const targetY = baseY + (hovered ? 0.16 : 0)
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.2)
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setHovered(false)
        document.body.style.cursor = 'auto'
      }}
      onClick={(e) => {
        e.stopPropagation()
        useNarrativeStore.getState().openSkillDetail(skill.id)
      }}
    >
      <boxGeometry args={[1.15, 0.32, 0.52]} />
      <meshStandardMaterial color="#2a2e35" emissive="#1c8bff" emissiveIntensity={0.5} metalness={0.3} roughness={0.4} />
    </mesh>
  )
}
