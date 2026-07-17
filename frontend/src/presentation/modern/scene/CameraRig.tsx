import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useNarrativeStore } from '../state/narrativeStore'
import { getCameraTarget } from '../state/stageConfig'

/**
 * Drives the camera every frame from the current scroll progress.
 * Reads the zustand store imperatively (no React re-renders) and
 * damps toward the target position/lookAt/fov for a smooth, cinematic
 * "power2.inOut"-like feel with no abrupt jumps.
 */
export function CameraRig() {
  const { camera } = useThree()
  const lookAtRef = useRef(new THREE.Vector3(0, 5, 0))
  const idleOffset = useRef(new THREE.Vector3())

  useFrame((state, delta) => {
    const { progress, detail } = useNarrativeStore.getState()
    const { position, lookAt, fov } = getCameraTarget(progress)

    // Small camera parallax while idle (subtle, per brief "idle parallax")
    const pointer = state.pointer
    idleOffset.current.set(pointer.x * 1.2, pointer.y * 0.7, 0)

    // When drilling into a project/skill/article, push the camera in closer
    const zoom = detail ? 0.72 : 1
    const targetPos = position.clone().lerp(lookAt, 1 - zoom).add(idleOffset.current)

    const dampFactor = 1 - Math.pow(0.0025, delta)
    camera.position.lerp(targetPos, dampFactor)
    lookAtRef.current.lerp(lookAt, dampFactor)
    camera.lookAt(lookAtRef.current)

    const persp = camera as THREE.PerspectiveCamera
    const targetFov = detail ? fov - 8 : fov
    persp.fov = THREE.MathUtils.lerp(persp.fov, targetFov, dampFactor)
    persp.updateProjectionMatrix()
  })

  return null
}
