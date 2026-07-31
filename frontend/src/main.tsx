import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ACTIVE_THEME, applyTheme, getThemeFromQuery } from './presentation/modern/theme/theme.config'

applyTheme(getThemeFromQuery(window.location.search) ?? ACTIVE_THEME)

// Suppress THREE.Clock deprecation emitted by @react-three/fiber internals.
// Upstream fix: https://github.com/pmndrs/react-three-fiber/issues/3741
// Remove this block once @react-three/fiber v10 is adopted.
const _warn = console.warn
console.warn = (...args: unknown[]) => {
  if (typeof args[0] === 'string' && args[0].includes('THREE.Clock')) return
  _warn(...args)
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
