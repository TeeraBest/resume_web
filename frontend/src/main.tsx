import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ACTIVE_THEME, applyTheme } from './presentation/modern/theme/theme.config'

applyTheme(ACTIVE_THEME)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
