import '@fontsource-variable/geist'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { ShellConfigProvider } from './ShellConfigContext'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ShellConfigProvider><App /></ShellConfigProvider>
    </BrowserRouter>
  </StrictMode>,
)
