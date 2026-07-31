import { useEffect, useRef } from 'react'

const TRACK_SECONDS = 60
const ACTIVE_VOLUME = 0.13

function hashString(input: string): number {
  let hash = 2166136261
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function makeRng(seed: number) {
  let s = seed || 1
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

function midiToHz(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12)
}

function pick<T>(rng: () => number, arr: T[]): T {
  return arr[Math.floor(rng() * arr.length)]
}

function pickDifferentDegree(rng: () => number, degrees: number[], previous: number): number {
  if (degrees.length <= 1) return degrees[0]
  const candidates = degrees.filter((d) => d !== previous)
  return pick(rng, candidates.length ? candidates : degrees)
}

function mutatePattern(pattern: number[], rng: () => number, mutationRate: number): number[] {
  return pattern.map((step) => {
    if (rng() > mutationRate) return step
    return step ? 0 : 1
  })
}

function clampAudioTime(time: number): number {
  return Math.max(0, Math.min(TRACK_SECONDS - 0.001, time))
}

async function renderTrack(seedInput: string): Promise<AudioBuffer> {
  const sampleRate = 48000
  const frameCount = sampleRate * TRACK_SECONDS
  const offline = new OfflineAudioContext(2, frameCount, sampleRate)

  const seed = hashString(seedInput)
  const rng = makeRng(seed)

  const tempo = 104 + Math.floor(rng() * 22)
  const beat = 60 / tempo
  const bar = beat * 4

  const rootMidi = 48 + Math.floor(rng() * 6)
  const funScale = [0, 2, 4, 7, 9, 11]
  const progression = [0, 5, 7, 4]

  const master = offline.createGain()
  master.gain.value = 0.9
  master.connect(offline.destination)

  const lowpass = offline.createBiquadFilter()
  lowpass.type = 'lowpass'
  lowpass.frequency.value = 3600
  lowpass.Q.value = 0.5
  lowpass.connect(master)

  const schedulePad = (start: number, duration: number, freq: number) => {
    const padGain = offline.createGain()
    padGain.gain.setValueAtTime(0.0001, start)
    padGain.gain.exponentialRampToValueAtTime(0.045, start + 0.12)
    padGain.gain.exponentialRampToValueAtTime(0.022, start + duration * 0.5)
    padGain.gain.exponentialRampToValueAtTime(0.0001, start + duration)
    padGain.connect(lowpass)

    const oscA = offline.createOscillator()
    oscA.type = 'sine'
    oscA.frequency.setValueAtTime(freq, start)
    oscA.detune.setValueAtTime(-4, start)

    const oscB = offline.createOscillator()
    oscB.type = 'triangle'
    oscB.frequency.setValueAtTime(freq * 2, start)
    oscB.detune.setValueAtTime(4, start)

    oscA.connect(padGain)
    oscB.connect(padGain)
    oscA.start(start)
    oscB.start(start)
    oscA.stop(start + duration)
    oscB.stop(start + duration)
  }

  const schedulePluck = (start: number, freq: number, gainLevel: number, decaySeconds = 0.095) => {
    const g = offline.createGain()
    g.gain.setValueAtTime(0.0001, start)
    g.gain.exponentialRampToValueAtTime(gainLevel, start + 0.008)
    g.gain.exponentialRampToValueAtTime(0.0001, start + decaySeconds)
    g.connect(lowpass)

    const osc = offline.createOscillator()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(freq, start)
    osc.connect(g)
    osc.start(start)
    osc.stop(start + decaySeconds + 0.015)
  }

  const scheduleBass = (start: number, freq: number, gainLevel: number, decaySeconds = 0.13) => {
    const g = offline.createGain()
    g.gain.setValueAtTime(0.0001, start)
    g.gain.exponentialRampToValueAtTime(gainLevel, start + 0.006)
    g.gain.exponentialRampToValueAtTime(0.0001, start + decaySeconds)
    g.connect(lowpass)

    const osc = offline.createOscillator()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, start)
    osc.connect(g)
    osc.start(start)
    osc.stop(start + decaySeconds + 0.02)
  }

  const scheduleHat = (start: number, gainLevel: number) => {
    const noiseBuffer = offline.createBuffer(1, Math.floor(sampleRate * 0.04), sampleRate)
    const data = noiseBuffer.getChannelData(0)
    for (let i = 0; i < data.length; i += 1) data[i] = (rng() * 2 - 1) * 0.5

    const src = offline.createBufferSource()
    src.buffer = noiseBuffer

    const hp = offline.createBiquadFilter()
    hp.type = 'highpass'
    hp.frequency.setValueAtTime(6500, start)

    const g = offline.createGain()
    g.gain.setValueAtTime(0.0001, start)
    g.gain.exponentialRampToValueAtTime(gainLevel, start + 0.002)
    g.gain.exponentialRampToValueAtTime(0.0001, start + 0.04)

    src.connect(hp)
    hp.connect(g)
    g.connect(lowpass)

    src.start(start)
    src.stop(start + 0.05)
  }

  const scheduleKick = (start: number) => {
    const g = offline.createGain()
    g.gain.setValueAtTime(0.0001, start)
    g.gain.exponentialRampToValueAtTime(0.2, start + 0.004)
    g.gain.exponentialRampToValueAtTime(0.0001, start + 0.22)
    g.connect(lowpass)

    const osc = offline.createOscillator()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(130, start)
    osc.frequency.exponentialRampToValueAtTime(48, start + 0.18)
    osc.connect(g)
    osc.start(start)
    osc.stop(start + 0.24)
  }

  const scheduleSnare = (start: number) => {
    const noiseBuffer = offline.createBuffer(1, Math.floor(sampleRate * 0.12), sampleRate)
    const data = noiseBuffer.getChannelData(0)
    for (let i = 0; i < data.length; i += 1) data[i] = (rng() * 2 - 1) * 0.9

    const src = offline.createBufferSource()
    src.buffer = noiseBuffer

    const bp = offline.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.setValueAtTime(1900, start)
    bp.Q.value = 0.7

    const g = offline.createGain()
    g.gain.setValueAtTime(0.0001, start)
    g.gain.exponentialRampToValueAtTime(0.06, start + 0.005)
    g.gain.exponentialRampToValueAtTime(0.0001, start + 0.14)

    src.connect(bp)
    bp.connect(g)
    g.connect(lowpass)
    src.start(start)
    src.stop(start + 0.16)
  }

  const scheduleClap = (start: number) => {
    for (const offset of [0, 0.012, 0.024]) {
      const noiseBuffer = offline.createBuffer(1, Math.floor(sampleRate * 0.04), sampleRate)
      const data = noiseBuffer.getChannelData(0)
      for (let i = 0; i < data.length; i += 1) data[i] = (rng() * 2 - 1) * 0.8

      const src = offline.createBufferSource()
      src.buffer = noiseBuffer

      const bp = offline.createBiquadFilter()
      bp.type = 'bandpass'
      bp.frequency.setValueAtTime(2400, start + offset)
      bp.Q.value = 0.8

      const g = offline.createGain()
      g.gain.setValueAtTime(0.0001, start + offset)
      g.gain.exponentialRampToValueAtTime(0.03, start + offset + 0.004)
      g.gain.exponentialRampToValueAtTime(0.0001, start + offset + 0.07)

      src.connect(bp)
      bp.connect(g)
      g.connect(lowpass)
      src.start(start + offset)
      src.stop(start + offset + 0.08)
    }
  }

  const melodicPatternPool: number[][] = [
    [1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0],
    [1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0],
    [1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1],
    [1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0],
  ]
  const kickPatternPool: number[][] = [
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0],
    [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
  ]
  const snarePatternPool: number[][] = [
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
  ]
  const hatPatternPool: number[][] = [
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0],
    [1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0],
    [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1],
  ]

  let currentMelodicPattern = pick(rng, melodicPatternPool)
  let currentKickPattern = pick(rng, kickPatternPool)
  let currentSnarePattern = pick(rng, snarePatternPool)
  let currentHatPattern = pick(rng, hatPatternPool)
  let previousDegree = pick(rng, funScale)

  let barIndex = 0
  for (let t = 0; t < TRACK_SECONDS; t += bar) {
    const cycleIndex = barIndex % 8
    const isFillBar = cycleIndex === 7
    const isSlowSection = cycleIndex <= 1
    const isFastSection = cycleIndex >= 5 || isFillBar
    const melodicSkipChance = isSlowSection ? 0.42 : isFastSection ? 0.05 : 0.2
    const pluckDecay = isSlowSection ? 0.16 : isFastSection ? 0.07 : 0.095
    const bassDecay = isSlowSection ? 0.2 : isFastSection ? 0.11 : 0.13
    const swingAmount = isSlowSection ? 0.04 : isFastSection ? 0.014 : 0.028

    if (barIndex > 0 && barIndex % 2 === 0) {
      if (rng() > 0.55) {
        currentMelodicPattern = mutatePattern(currentMelodicPattern, rng, 0.18)
      } else {
        currentMelodicPattern = pick(rng, melodicPatternPool)
      }
      if (rng() > 0.5) {
        currentKickPattern = mutatePattern(currentKickPattern, rng, 0.12)
      } else {
        currentKickPattern = pick(rng, kickPatternPool)
      }
      if (rng() > 0.5) {
        currentSnarePattern = mutatePattern(currentSnarePattern, rng, 0.08)
      } else {
        currentSnarePattern = pick(rng, snarePatternPool)
      }
      if (rng() > 0.45) {
        currentHatPattern = mutatePattern(currentHatPattern, rng, 0.2)
      } else {
        currentHatPattern = pick(rng, hatPatternPool)
      }
    }

    const chordShift = progression[Math.floor((t / bar) % progression.length)]
    const chordRoot = rootMidi + chordShift
    const chord = [0, 4, 7, 11].map((n) => chordRoot + n)

    // Split harmony into two shorter chord stabs per bar to avoid long static notes.
    const stabDuration = Math.min(bar * 0.78, TRACK_SECONDS - t)
    const secondStabStart = t + beat * 2
    const secondStabDuration = Math.min(bar * 0.7, TRACK_SECONDS - secondStabStart)

    chord.forEach((midi, idx) => {
      const octave = idx < 2 ? 0 : 12
      schedulePad(t, stabDuration, midiToHz(midi - 12 + octave))
      if (secondStabDuration > 0) {
        schedulePad(secondStabStart, secondStabDuration, midiToHz(midi - 12 + octave))
      }
    })

    const motifDegrees: number[] = []
    for (let i = 0; i < 8; i += 1) {
      const nextDegree = pickDifferentDegree(rng, funScale, previousDegree)
      motifDegrees.push(nextDegree)
      previousDegree = nextDegree
    }
    const responseDegrees = motifDegrees.map((d, i) => {
      if (i % 3 === 0) return d
      const shifted = d + pick(rng, [2, -2, 4])
      return pick(rng, [shifted, d, shifted + 1])
    })

    for (let step = 0; step < 16; step += 1) {
      if (currentMelodicPattern[step] === 0 && rng() > melodicSkipChance) continue

      const swing = step % 2 === 1 ? beat * swingAmount : 0
      const noteStart = clampAudioTime(
        t + step * (beat * 0.25) + swing + (rng() - 0.5) * beat * (isFastSection ? 0.026 : 0.015),
      )
      if (noteStart >= TRACK_SECONDS) break

      const melodicDegree = step < 8 ? motifDegrees[step] : responseDegrees[step - 8]
      const melodicMidi = chordRoot + 12 + melodicDegree
      const accent = step % 4 === 0 ? 1.25 : 1
      const cycleDensity = cycleIndex <= 1 ? 0.75 : cycleIndex <= 4 ? 1 : 0.9
      const fillBoost = isFillBar ? 1.2 : 1
      const velocity = (0.009 + rng() * 0.012) * accent * cycleDensity * fillBoost
      schedulePluck(noteStart, midiToHz(melodicMidi), velocity, pluckDecay)

      if (isFastSection && rng() > 0.52) {
        const ghostStart = clampAudioTime(noteStart + beat * 0.125)
        if (ghostStart < TRACK_SECONDS) {
          const ghostDegree = pick(rng, [melodicDegree - 2, melodicDegree + 2, melodicDegree])
          schedulePluck(ghostStart, midiToHz(chordRoot + 12 + ghostDegree), velocity * 0.45, 0.052)
        }
      }

      if (step % 2 === 0 || rng() > 0.6) {
        const bassStart = clampAudioTime(noteStart + beat * 0.04)
        scheduleBass(bassStart, midiToHz(chordRoot - 17), 0.034 + rng() * 0.01, bassDecay)
      }

      if (rng() > 0.42) {
        const harmonyMidi = melodicMidi - 12
        const harmonyStart = clampAudioTime(noteStart + beat * 0.1)
        schedulePluck(harmonyStart, midiToHz(harmonyMidi), velocity * 0.35, Math.max(0.05, pluckDecay * 0.85))
      }

      const hatChance = isSlowSection ? 0.94 : isFastSection ? 0.64 : 0.82
      if (currentHatPattern[step] === 1 || rng() > hatChance) {
        const hatStart = clampAudioTime(noteStart + beat * 0.02 + (rng() - 0.5) * beat * 0.01)
        scheduleHat(hatStart, 0.012 + rng() * 0.012)
      }

      if (isFastSection && step % 2 === 1 && rng() > 0.46) {
        const hatRushStart = clampAudioTime(noteStart + beat * 0.09)
        if (hatRushStart < TRACK_SECONDS) {
          scheduleHat(hatRushStart, 0.011 + rng() * 0.008)
        }
      }
    }

    for (let step = 0; step < 16; step += 1) {
      const stepTime = t + step * (beat * 0.25)
      if (isSlowSection && step % 2 === 1) continue

      if (currentKickPattern[step] === 1) {
        const kickStart = clampAudioTime(stepTime + (rng() - 0.5) * beat * 0.012)
        scheduleKick(kickStart)
        if (isFastSection && step < 15 && rng() > 0.58) {
          const kickDoubleStart = clampAudioTime(stepTime + beat * 0.125)
          scheduleKick(kickDoubleStart)
        }
      }
      if (currentSnarePattern[step] === 1) {
        const snareStart = clampAudioTime(stepTime + (rng() - 0.5) * beat * 0.008)
        const clapStart = clampAudioTime(stepTime)
        scheduleSnare(snareStart)
        scheduleClap(clapStart)
      }
    }

    if (isFillBar) {
      for (let fillStep = 12; fillStep < 16; fillStep += 1) {
        const fillTime = clampAudioTime(t + fillStep * (beat * 0.25))
        scheduleSnare(fillTime)
        scheduleHat(fillTime, 0.025 + rng() * 0.008)
      }
    }

    barIndex += 1
  }

  return offline.startRendering()
}

interface UseResumeBackgroundTrackOptions {
  enabled?: boolean
  muted?: boolean
}

export function useResumeBackgroundTrack(
  seedInput: string,
  { enabled = true, muted = false }: UseResumeBackgroundTrackOptions = {},
) {
  const contextRef = useRef<AudioContext | null>(null)
  const sourceRef = useRef<AudioBufferSourceNode | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)
  const mutedRef = useRef(muted)

  useEffect(() => {
    mutedRef.current = muted
  }, [muted])

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return

    const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AudioContextClass || typeof OfflineAudioContext === 'undefined') return

    let cancelled = false
    let interactionRequested = false

    const interactionEvents: Array<keyof WindowEventMap> = ['pointerdown', 'keydown', 'touchstart']

    const unlockAudio = async () => {
      const context = contextRef.current
      if (!context || context.state === 'running') return
      try {
        await context.resume()
      } catch {
        // Ignore resume errors from autoplay policies.
      }
    }

    const onFirstInteraction = () => {
      interactionRequested = true
      void unlockAudio()
      if (contextRef.current?.state === 'running') {
        interactionEvents.forEach((eventName) => window.removeEventListener(eventName, onFirstInteraction))
      }
    }

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        void unlockAudio()
      }
    }

    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, onFirstInteraction, { passive: true })
    })
    document.addEventListener('visibilitychange', onVisibilityChange)

    const setup = async () => {
      try {
        const buffer = await renderTrack(seedInput)
        if (cancelled) return

        const context = new AudioContextClass()
        contextRef.current = context

        const source = context.createBufferSource()
        sourceRef.current = source
        source.buffer = buffer
        source.loop = true

        const masterGain = context.createGain()
        masterGainRef.current = masterGain
        masterGain.gain.value = 0.0001

        const compressor = context.createDynamicsCompressor()
        compressor.threshold.value = -26
        compressor.knee.value = 24
        compressor.ratio.value = 3
        compressor.attack.value = 0.03
        compressor.release.value = 0.25

        source.connect(compressor)
        compressor.connect(masterGain)
        masterGain.connect(context.destination)

        source.start()

        const now = context.currentTime
        masterGain.gain.setValueAtTime(0.0001, now)
        masterGain.gain.exponentialRampToValueAtTime(mutedRef.current ? 0.0001 : ACTIVE_VOLUME, now + 2.4)

        await unlockAudio()
        if ((interactionRequested || document.visibilityState === 'visible') && context.state !== 'running') {
          await unlockAudio()
        }

        if (context.state === 'running') {
          interactionEvents.forEach((eventName) => window.removeEventListener(eventName, onFirstInteraction))
        }
      } catch (error) {
        console.error('Failed to initialize background track', error)
      }
    }

    void setup()

    return () => {
      cancelled = true
      interactionEvents.forEach((eventName) => window.removeEventListener(eventName, onFirstInteraction))
      document.removeEventListener('visibilitychange', onVisibilityChange)
      try {
        sourceRef.current?.stop()
      } catch {
        // Source may already be stopped.
      }
      sourceRef.current?.disconnect()
      masterGainRef.current?.disconnect()
      void contextRef.current?.close()
      sourceRef.current = null
      masterGainRef.current = null
      contextRef.current = null
    }
  }, [enabled, seedInput])

  useEffect(() => {
    const context = contextRef.current
    const masterGain = masterGainRef.current
    if (!context || !masterGain) return

    const now = context.currentTime
    masterGain.gain.cancelScheduledValues(now)
    masterGain.gain.setValueAtTime(masterGain.gain.value, now)
    masterGain.gain.exponentialRampToValueAtTime(muted ? 0.0001 : ACTIVE_VOLUME, now + 0.2)
  }, [muted])
}
