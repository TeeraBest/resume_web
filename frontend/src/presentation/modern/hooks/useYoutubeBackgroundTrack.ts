import { useEffect, useRef } from 'react'

type YouTubePlayer = {
  mute: () => void
  unMute: () => void
  setVolume: (value: number) => void
  playVideo: () => void
  seekTo: (seconds: number, allowSeekAhead: boolean) => void
  getDuration: () => number
  destroy: () => void
}

type YouTubePlayerConstructor = new (container: HTMLElement, options: Record<string, unknown>) => YouTubePlayer

type YouTubeWindow = Window & {
  YT?: {
    Player: YouTubePlayerConstructor
  }
  onYouTubeIframeAPIReady?: (() => void) | null
}

interface UseYoutubeBackgroundTrackOptions {
  enabled?: boolean
  muted?: boolean
  videoId: string
  volume?: number
  startPercent?: number
}

let youtubeApiPromise: Promise<void> | null = null

function loadYouTubeIframeApi(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()

  const youtubeWindow = window as YouTubeWindow
  if (youtubeWindow.YT?.Player) return Promise.resolve()
  if (youtubeApiPromise) return youtubeApiPromise

  youtubeApiPromise = new Promise((resolve, reject) => {
    const existingCallback = youtubeWindow.onYouTubeIframeAPIReady ?? null
    youtubeWindow.onYouTubeIframeAPIReady = () => {
      existingCallback?.()
      resolve()
    }

    const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]')
    if (!existingScript) {
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      script.async = true
      script.onerror = () => {
        youtubeApiPromise = null
        reject(new Error('Failed to load YouTube iframe API'))
      }
      document.head.appendChild(script)
    }
  })

  return youtubeApiPromise
}

export function useYoutubeBackgroundTrack({
  enabled = true,
  muted = true,
  videoId,
  volume = 15,
  startPercent = 0.02,
}: UseYoutubeBackgroundTrackOptions) {
  const playerRef = useRef<YouTubePlayer | null>(null)
  const mutedRef = useRef(muted)

  useEffect(() => {
    mutedRef.current = muted
  }, [muted])

  useEffect(() => {
    if (!enabled || typeof window === 'undefined' || !videoId.trim()) return

    let cancelled = false
    const host = document.createElement('div')
    host.setAttribute('aria-hidden', 'true')
    host.style.position = 'fixed'
    host.style.left = '-9999px'
    host.style.top = '0'
    host.style.width = '1px'
    host.style.height = '1px'
    host.style.overflow = 'hidden'
    document.body.appendChild(host)

    const createPlayer = async () => {
      try {
        await loadYouTubeIframeApi()
        if (cancelled) return

        const youtubeWindow = window as YouTubeWindow
        if (!youtubeWindow.YT?.Player) return

        const player = new youtubeWindow.YT.Player(host, {
          videoId,
          playerVars: {
            autoplay: 1,
            controls: 0,
            loop: 1,
            playlist: videoId,
            playsinline: 1,
            rel: 0,
            modestbranding: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: (event: { target: YouTubePlayer }) => {
              const percent = Math.min(0.8, Math.max(0.02, startPercent))
              const duration = event.target.getDuration()
              const startSeconds = duration > 0 ? duration * percent : 0

              if (mutedRef.current) {
                event.target.mute()
                event.target.setVolume(0)
              } else {
                event.target.unMute()
                event.target.setVolume(volume)
              }

              if (startSeconds > 0) {
                event.target.seekTo(startSeconds, true)
              }

              event.target.playVideo()
              playerRef.current = event.target
            },
            onStateChange: (event: { data: number; target: YouTubePlayer }) => {
              if (event.data === 0) {
                event.target.playVideo()
              }
            },
          },
        })

        playerRef.current = player
      } catch (error) {
        console.error('Failed to start YouTube background track', error)
      }
    }

    void createPlayer()

    return () => {
      cancelled = true
      try {
        playerRef.current?.destroy()
      } catch {
        // Ignore destroy errors from partially initialized players.
      }
      playerRef.current = null
      host.remove()
    }
  }, [enabled, videoId, startPercent, volume])

  useEffect(() => {
    const player = playerRef.current
    if (!player) return

    if (muted) {
      player.mute()
      player.setVolume(0)
      return
    }

    player.unMute()
    player.setVolume(volume)
    player.playVideo()
  }, [muted, volume])
}