import { Suspense } from 'react'
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

interface WorkspaceSceneProps {
  profile: Profile | null
  skills: Skill[]
}

export function WorkspaceScene({ profile, skills }: WorkspaceSceneProps) {
  return (
    <>
      <GradientBackground />
      <fog attach="fog" args={['#233052', 110, 300]} />

      <CameraRig />

      <hemisphereLight args={['#a8cbff', '#2a3348', 1.3]} />
      <ambientLight intensity={1.05} color="#b8d2ff" />
      <directionalLight
        position={[30, 50, 20]}
        intensity={1.6}
        color="#f2f6ff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-20, 20, 20]} intensity={1} color="#5a97ff" distance={90} />
      <pointLight position={[15, 12, 25]} intensity={0.5} color="#ffe0b0" distance={70} />

      <ParticleField />

      <Suspense fallback={null}>
        <Desk position={LAYOUT.desk.position}>
          <Laptop
            position={LAYOUT.laptop.position}
            profileName={profile?.fullName ?? ''}
            profileTitle={profile?.title ?? ''}
          />
          <Monitor position={LAYOUT.monitor.position} />
          <Keyboard position={LAYOUT.keyboard.position} skills={skills} />
          <Mouse position={LAYOUT.mouse.position} />
          <CoffeeCup position={LAYOUT.coffee.position} />
          <Notebook position={LAYOUT.notebookExperience.position} openDuringStage="experience" color="#3a4250" />
          <Notebook position={LAYOUT.notebookBlog.position} openDuringStage="blog" color="#4a3a50" />
          <Phone position={LAYOUT.phone.position} profile={profile} />
          <DeskLamp position={LAYOUT.lamp.position} />
          <DeskAccessories position={[19, 4.75, -4]} />
        </Desk>
        <ServerRack position={LAYOUT.serverRack.position} />
      </Suspense>
    </>
  )
}
