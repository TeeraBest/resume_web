import * as THREE from 'three'
import { STAGES, type StageId } from './narrativeStore'

/**
 * Each stage occupies an equal slice of the master scroll timeline.
 * `remapWithinStage` converts overall progress into a local 0..1 value
 * for animating something that only happens during that stage
 * (e.g. the laptop lid opening during the "laptopOpen" stage).
 */
const STEP = 1 / STAGES.length

export function getStageRange(stage: StageId): [number, number] {
  const i = STAGES.indexOf(stage)
  return [i * STEP, (i + 1) * STEP]
}

export function getStageForProgress(progress: number): StageId {
  const i = Math.min(STAGES.length - 1, Math.floor(progress / STEP))
  return STAGES[Math.max(0, i)]
}

/** Remaps `progress` into a clamped 0..1 value local to a stage's own window. */
export function remapWithinStage(progress: number, stage: StageId): number {
  const [start, end] = getStageRange(stage)
  return THREE.MathUtils.clamp((progress - start) / (end - start), 0, 1)
}

/**
 * A one-shot animation value that is 0 before `stage` starts, eases 0->1
 * while `stage` plays, and stays at 1 for every stage after it.
 * Useful for things like "the laptop lid opens during laptopOpen and
 * stays open for the rest of the experience".
 */
export function afterStageProgress(progress: number, stage: StageId): number {
  const [start, end] = getStageRange(stage)
  if (progress <= start) return 0
  if (progress >= end) return 1
  return ease((progress - start) / (end - start))
}

export function clamp01(v: number) {
  return THREE.MathUtils.clamp(v, 0, 1)
}

/** Smoothstep-style ease used for local, stage-scoped animations (power2.inOut-ish). */
export function ease(t: number) {
  const c = clamp01(t)
  return c * c * (3 - 2 * c)
}

export interface CameraKeyframe {
  stage: StageId
  position: [number, number, number]
  lookAt: [number, number, number]
  /** Field of view for this keyframe, degrees */
  fov?: number
}

// Rough world layout of the floating desk (tweak freely, all objects read from here):
// NOTE: the desk surface sits at world y = 4.25. Each object's Y below is
// offset so its own base/foot rests just above that surface instead of
// clipping into it (every object's internal geometry has its own pivot).
export const LAYOUT = {
  desk: { position: [0, 0, 0] as [number, number, number] },
  laptop: { position: [-10, 4.45, 8] as [number, number, number] },
  monitor: { position: [10, 6.9, -2] as [number, number, number] },
  keyboard: { position: [-2, 4.42, 16] as [number, number, number] },
  mouse: { position: [8, 4.37, 17] as [number, number, number] },
  coffee: { position: [14, 4.65, 12] as [number, number, number] },
  notebookExperience: { position: [17, 4.32, 2] as [number, number, number] },
  notebookBlog: { position: [-20, 4.32, 2] as [number, number, number] },
  serverRack: { position: [0, 8, -12] as [number, number, number] },
  phone: { position: [3, 4.9, 20] as [number, number, number] },
  lamp: { position: [-18, 6.35, -6] as [number, number, number] },
}

// Camera keyframes: one per stage START. The camera position/lookAt is linearly
// interpolated between the keyframe for the current stage and the next one,
// using the local (stage-scoped) progress as the blend factor.
export const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  { stage: 'intro', position: [0, 26, 95], lookAt: [0, 5, 0], fov: 42 },
  { stage: 'laptopOpen', position: [-4, 14, 40], lookAt: [-10, 6, 8], fov: 38 },
  { stage: 'enterLaptop', position: [-10, 9.5, 18], lookAt: [-10, 8.8, 8], fov: 34 },
  { stage: 'home', position: [-10, 9, 6], lookAt: [-10, 8.8, -20], fov: 50 },
  { stage: 'experience', position: [22, 9, 14], lookAt: [17, 5, 2], fov: 40 },
  { stage: 'projects', position: [0, 11, -2], lookAt: [0, 8, -22], fov: 45 },
  { stage: 'skills', position: [-2, 10, 30], lookAt: [-2, 4.5, 16], fov: 38 },
  { stage: 'blog', position: [-25, 9, 14], lookAt: [-20, 5, 2], fov: 40 },
  { stage: 'contact', position: [7, 9, 30], lookAt: [3, 5, 20], fov: 38 },
  { stage: 'ending', position: [0, 28, 100], lookAt: [0, 5, 0], fov: 42 },
]

export function getCameraTarget(progress: number) {
  const idx = Math.min(CAMERA_KEYFRAMES.length - 1, Math.floor(progress / STEP))
  const nextIdx = Math.min(CAMERA_KEYFRAMES.length - 1, idx + 1)
  const local = ease(clamp01((progress - idx * STEP) / STEP))

  const a = CAMERA_KEYFRAMES[idx]
  const b = CAMERA_KEYFRAMES[nextIdx]

  const position = new THREE.Vector3(...a.position).lerp(new THREE.Vector3(...b.position), local)
  const lookAt = new THREE.Vector3(...a.lookAt).lerp(new THREE.Vector3(...b.lookAt), local)
  const fov = THREE.MathUtils.lerp(a.fov ?? 45, b.fov ?? 45, local)

  return { position, lookAt, fov }
}
