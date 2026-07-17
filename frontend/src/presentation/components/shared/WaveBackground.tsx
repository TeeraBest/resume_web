import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface Ripple {
  x: number
  z: number
  startTime: number
}

export function WaveBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const width = window.innerWidth
    const height = window.innerHeight

    // Scene, camera & fog (fog blends the far edge of the river into the black background)
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x000000, 0.0035)

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000)
    camera.position.set(0, 90, 200)
    camera.lookAt(0, -10, 0)

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    container.appendChild(renderer.domElement)

    // --- River surface -------------------------------------------------
    const planeSize = 1000
    const segments = 240
    const waterLevel = 10

    const riverGeometry = new THREE.PlaneGeometry(planeSize, planeSize, segments, segments)
    riverGeometry.rotateX(-Math.PI / 2)

    const riverPosition = riverGeometry.getAttribute('position') as THREE.BufferAttribute
    const basePositions = riverPosition.array.slice() as Float32Array

    const riverMaterial = new THREE.MeshBasicMaterial({
      color: 0x2299ff,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    })
    const river = new THREE.Mesh(riverGeometry, riverMaterial)
    scene.add(river)

    // --- Ripples ---------------------------------------------------------
    const ripples: Ripple[] = []
    const rippleSpeed = 0.00006 // world units per ms
    const rippleDecay = 0.00009 // per ms
    const ringWidth = 30
    const rippleLifespan = 950 // ms

    // --- Rain streaks ------------------------------------------------------
    const dropCount = 10
    const dropSpawnHeightMin = 100
    const dropSpawnHeightMax = 260
    const streakLength = 7

    const dropData: { x: number; z: number; y: number; speed: number }[] = []
    const rainPositions = new Float32Array(dropCount * 2 * 3)

    const randomInPlane = () => (Math.random() - 0.5) * planeSize * 0.9

    for (let i = 0; i < dropCount; i++) {
      dropData.push({
        x: randomInPlane(),
        z: randomInPlane(),
        y: dropSpawnHeightMin + Math.random() * (dropSpawnHeightMax - dropSpawnHeightMin),
        speed: 2.5 + Math.random() * 2.5,
      })
    }

    const rainGeometry = new THREE.BufferGeometry()
    rainGeometry.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3))
    const rainMaterial = new THREE.LineBasicMaterial({
      color: 0x99ddff,
      transparent: true,
      opacity: 0.5,
    })
    const rain = new THREE.LineSegments(rainGeometry, rainMaterial)
    scene.add(rain)

    let animationId: number
    let lastTime = performance.now()

    const animate = () => {
      const now = performance.now()
      const delta = now - lastTime
      lastTime = now

      // Update rain drops
      const rainPos = rainGeometry.getAttribute('position').array as Float32Array
      for (let i = 0; i < dropCount; i++) {
        const drop = dropData[i]
        drop.y -= drop.speed * (delta / 16.7)

        if (drop.y <= waterLevel + streakLength) {
          ripples.push({ x: drop.x, z: drop.z, startTime: now })
          if (ripples.length > 40) ripples.shift()

          drop.x = randomInPlane()
          drop.z = randomInPlane()
          drop.y = dropSpawnHeightMin + Math.random() * (dropSpawnHeightMax - dropSpawnHeightMin)
        }

        const base = i * 6
        rainPos[base] = drop.x
        rainPos[base + 1] = drop.y
        rainPos[base + 2] = drop.z
        rainPos[base + 3] = drop.x
        rainPos[base + 4] = drop.y - streakLength
        rainPos[base + 5] = drop.z
      }
      rainGeometry.getAttribute('position').needsUpdate = true

      // Remove expired ripples
      while (ripples.length && now - ripples[0].startTime > rippleLifespan) {
        ripples.shift()
      }

      // Update river surface height from active ripples
      const positions = riverPosition.array as Float32Array
      for (let v = 0; v < positions.length; v += 3) {
        const x = basePositions[v]
        const z = basePositions[v + 2]
        let y = 0

        for (const ripple of ripples) {
          const age = now - ripple.startTime
          const dx = x - ripple.x
          const dz = z - ripple.z
          const dist = Math.sqrt(dx * dx + dz * dz)
          const waveFront = age * rippleSpeed

          const ringFalloff = Math.exp(-((dist - waveFront) ** 2) / (2 * ringWidth * ringWidth))
          const decay = Math.exp(-rippleDecay * age)
          y += Math.sin(dist * 0.4 - age * 0.02) * ringFalloff * decay * 6
        }

        positions[v + 1] = y
      }
      riverPosition.needsUpdate = true

      renderer.render(scene, camera)
      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      riverGeometry.dispose()
      riverMaterial.dispose()
      rainGeometry.dispose()
      rainMaterial.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#000000',
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    />
  )
}
