import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Force dark theme before app renders (no toggle)
try {
  const rootEl = document.documentElement
  rootEl.classList.remove('light')
  rootEl.classList.add('dark')
  // clear any previously stored theme preference
  localStorage.removeItem('theme')
  // enable smooth transitions for any dynamic UI (not for initial paint)
  queueMicrotask(() => rootEl.classList.add('theme-ready'))
} catch (_) {
  // no-op
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
