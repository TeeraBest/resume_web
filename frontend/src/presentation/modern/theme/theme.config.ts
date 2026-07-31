export const THEME_ATTRIBUTE = 'data-theme'

export const THEMES = {
  MASTER: 'master',
  BEST_OFFICE: 'best-office',
  MY_LOVE_ENG: 'MY_LOVE_ENG',
} as const

export type ThemeName = (typeof THEMES)[keyof typeof THEMES]

// Single source of truth for the active site theme.
export const ACTIVE_THEME: ThemeName = THEMES.BEST_OFFICE

export function isThemeName(raw: string | null): raw is ThemeName {
  return raw === THEMES.MASTER || raw === THEMES.BEST_OFFICE || raw === THEMES.MY_LOVE_ENG
}

export function applyTheme(theme: ThemeName): void {
  document.documentElement.setAttribute(THEME_ATTRIBUTE, theme)
}

export function getThemeFromDom(): ThemeName {
  const raw = document.documentElement.getAttribute(THEME_ATTRIBUTE)
  return isThemeName(raw) ? raw : ACTIVE_THEME
}

export function getThemeFromQuery(search: string): ThemeName | null {
  const params = new URLSearchParams(search)
  const raw = params.get('theme')
  if (!raw) return null

  const normalized = raw.trim().toLowerCase().replace(/[-\s]/g, '_')
  if (normalized === THEMES.MASTER.toLowerCase()) return THEMES.MASTER
  if (normalized === THEMES.BEST_OFFICE.toLowerCase().replace(/-/g, '_')) return THEMES.BEST_OFFICE
  if (normalized === THEMES.MY_LOVE_ENG.toLowerCase()) return THEMES.MY_LOVE_ENG

  return null
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
  [THEMES.MY_LOVE_ENG]: {
    gradientTop: '#ffe8f3',
    gradientBottom: '#ffd7ec',
    fog: '#ffd3e8',
    hemisphereSky: '#fff4fa',
    hemisphereGround: '#f7c9e4',
    hemisphereIntensity: 1.55,
    ambient: '#ffeefe',
    ambientIntensity: 1.2,
    directional: '#fff8fc',
    directionalIntensity: 1.8,
    pointBlue: '#ff9ac5',
    pointBlueIntensity: 0.4,
    pointWarm: '#ffb9d6',
    pointWarmIntensity: 0.72,
    particle: '#ff7db8',
    particleOpacity: 0.28,
    notebookExperience: '#e197be',
    notebookBlog: '#d58ac9',
    deskSurface: '#d8a2c6',
    deskRim: '#ffd6eb',
    deskRimEmissive: '#ff78b4',
  },
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
