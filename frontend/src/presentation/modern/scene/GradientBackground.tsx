import { useMemo } from 'react'
import * as THREE from 'three'

/**
 * A large inverted sphere with a vertical gradient shader, used instead of a
 * flat background color so the scene reads as a soft dark-navy space rather
 * than pure black.
 */
export function GradientBackground() {
  const uniforms = useMemo(
    () => ({
      topColor: { value: new THREE.Color('#3d5a8a') },
      bottomColor: { value: new THREE.Color('#161c30') },
    }),
    [],
  )

  return (
    <mesh scale={[1, 1, 1]}>
      <sphereGeometry args={[500, 32, 32]} />
      <shaderMaterial
        uniforms={uniforms}
        side={THREE.BackSide}
        depthWrite={false}
        vertexShader={`
          varying vec3 vWorldPosition;
          void main() {
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 topColor;
          uniform vec3 bottomColor;
          varying vec3 vWorldPosition;
          void main() {
            float h = normalize(vWorldPosition).y * 0.5 + 0.5;
            gl_FragColor = vec4(mix(bottomColor, topColor, h), 1.0);
          }
        `}
      />
    </mesh>
  )
}
