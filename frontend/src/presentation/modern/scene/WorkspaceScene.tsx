import { Suspense, useEffect, useState } from 'react'
import type { Profile, Skill } from '@core/models/resume.model'
import { CameraRig } from './CameraRig'
import { ParticleField } from './ParticleField'
import { GradientBackground } from './GradientBackground'
import { Desk } from '../objects/Desk'
import { Laptop } from '../objects/Laptop'
import { Monitor } from '../objects/Monitor'
import { Keyboard } from '../objects/Keyboard'
import { Mouse } from '../objects/Mouse'
import { CoffeeCup } from '../objects/CoffeeCup'
import { Notebook } from '../objects/Notebook'
import { ServerRack } from '../objects/ServerRack'
import { Phone } from '../objects/Phone'
import { DeskLamp } from '../objects/DeskLamp'
import { DeskAccessories } from '../objects/DeskAccessories'
import { LAYOUT } from '../state/stageConfig'
import { getThemeFromDom, SCENE_THEME_PALETTES, THEME_ATTRIBUTE } from '../theme/theme.config'

interface WorkspaceSceneProps {
  profile: Profile | null
  skills: Skill[]
  enableShadows?: boolean
}

export function WorkspaceScene({ profile, skills, enableShadows = true }: WorkspaceSceneProps) {
  const [themeName, setThemeName] = useState(() => getThemeFromDom())

  useEffect(() => {
    const root = document.documentElement
    const observer = new MutationObserver(() => {
      setThemeName(getThemeFromDom())
    })

    observer.observe(root, { attributes: true, attributeFilter: [THEME_ATTRIBUTE] })
    return () => observer.disconnect()
  }, [])

  const sceneColors = SCENE_THEME_PALETTES[themeName]

  return (
    <>
      <GradientBackground topColor={sceneColors.gradientTop} bottomColor={sceneColors.gradientBottom} />
      <fog attach="fog" args={[sceneColors.fog, 110, 300]} />

      <CameraRig />

      <hemisphereLight args={[sceneColors.hemisphereSky, sceneColors.hemisphereGround, sceneColors.hemisphereIntensity]} />
      <ambientLight intensity={sceneColors.ambientIntensity} color={sceneColors.ambient} />
      <directionalLight
        position={[30, 50, 20]}
        intensity={sceneColors.directionalIntensity}
        color={sceneColors.directional}
        castShadow={enableShadows}
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />
      <pointLight position={[-20, 20, 20]} intensity={sceneColors.pointBlueIntensity} color={sceneColors.pointBlue} distance={90} />
      <pointLight position={[15, 12, 25]} intensity={sceneColors.pointWarmIntensity} color={sceneColors.pointWarm} distance={70} />

      <ParticleField color={sceneColors.particle} opacity={sceneColors.particleOpacity} />

      <Suspense fallback={null}>
        <Desk
          position={LAYOUT.desk.position}
          surfaceColor={sceneColors.deskSurface}
          rimColor={sceneColors.deskRim}
          rimEmissive={sceneColors.deskRimEmissive}
        >
          <Laptop
            position={LAYOUT.laptop.position}
            profileName={profile?.fullName ?? ''}
            profileTitle={profile?.title ?? ''}
          />
          <Monitor position={LAYOUT.monitor.position} />
          <Keyboard position={LAYOUT.keyboard.position} skills={skills} />
          <Mouse position={LAYOUT.mouse.position} />
          <CoffeeCup position={LAYOUT.coffee.position} />
          <Notebook position={LAYOUT.notebookExperience.position} openDuringStage="experience" color={sceneColors.notebookExperience} />
          <Notebook position={LAYOUT.notebookBlog.position} openDuringStage="blog" color={sceneColors.notebookBlog} />
          <Phone position={LAYOUT.phone.position} profile={profile} />
          <DeskLamp position={LAYOUT.lamp.position} />
          <DeskAccessories position={[19, 4.75, -4]} />
        </Desk>
        <ServerRack position={LAYOUT.serverRack.position} />
      </Suspense>
    </>
  )
}
