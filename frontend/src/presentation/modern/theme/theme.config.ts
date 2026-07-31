export const THEME_ATTRIBUTE = 'data-theme'

export const THEMES = {
  MASTER: 'master',
  BEST_OFFICE: 'best-office',
} as const

export type ThemeName = (typeof THEMES)[keyof typeof THEMES]

// Single source of truth for the active site theme.
export const ACTIVE_THEME: ThemeName = THEMES.BEST_OFFICE

export function applyTheme(theme: ThemeName): void {
  document.documentElement.setAttribute(THEME_ATTRIBUTE, theme)
}

export function getThemeFromDom(): ThemeName {
  const raw = document.documentElement.getAttribute(THEME_ATTRIBUTE)
  return raw === THEMES.MASTER || raw === THEMES.BEST_OFFICE ? raw : ACTIVE_THEME
}

export interface SceneThemePalette {
  gradientTop: string
  gradientBottom: string
  fog: string
  hemisphereSky: string
  hemisphereGround: string
  hemisphereIntensity: number
  ambient: string
  ambientIntensity: number
  directional: string
  directionalIntensity: number
  pointBlue: string
  pointBlueIntensity: number
  pointWarm: string
  pointWarmIntensity: number
  particle: string
  particleOpacity: number
  notebookExperience: string
  notebookBlog: string
  deskSurface: string
  deskRim: string
  deskRimEmissive: string
}

export const SCENE_THEME_PALETTES: Record<ThemeName, SceneThemePalette> = {
  [THEMES.BEST_OFFICE]: {
    gradientTop: '#edf4ff',
    gradientBottom: '#dfe9f7',
    fog: '#dbe7f6',
    hemisphereSky: '#f8fbff',
    hemisphereGround: '#cad7eb',
    hemisphereIntensity: 1.55,
    ambient: '#eef4ff',
    ambientIntensity: 1.2,
    directional: '#ffffff',
    directionalIntensity: 1.85,
    pointBlue: '#85b7ff',
    pointBlueIntensity: 0.75,
    pointWarm: '#ffe5bf',
    pointWarmIntensity: 0.35,
    particle: '#8db4e8',
    particleOpacity: 0.22,
    notebookExperience: '#8b9cb4',
    notebookBlog: '#aa95ba',
    deskSurface: '#8f9eb8',
    deskRim: '#d7e2f3',
    deskRimEmissive: '#7ea3de',
  },
  [THEMES.MASTER]: {
    gradientTop: '#3d5a8a',
    gradientBottom: '#161c30',
    fog: '#233052',
    hemisphereSky: '#a8cbff',
    hemisphereGround: '#2a3348',
    hemisphereIntensity: 1.3,
    ambient: '#b8d2ff',
    ambientIntensity: 1.05,
    directional: '#f2f6ff',
    directionalIntensity: 1.6,
    pointBlue: '#5a97ff',
    pointBlueIntensity: 1,
    pointWarm: '#ffe0b0',
    pointWarmIntensity: 0.5,
    particle: '#6fb7ff',
    particleOpacity: 0.35,
    notebookExperience: '#3a4250',
    notebookBlog: '#4a3a50',
    deskSurface: '#3a4152',
    deskRim: '#0a1c2e',
    deskRimEmissive: '#1c8bff',
  },
}
