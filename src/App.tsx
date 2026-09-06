import { Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AccessPage } from './pages/AccessPage'
import { ConfigPage } from './pages/ConfigPage'
import { PrototypePage } from './pages/PrototypePage'
import { ShowcasePage } from './pages/ShowcasePage'

export const App = () => (
  <Routes>
    <Route path="/" element={<ShowcasePage />} />
    <Route path="/showcase" element={<ShowcasePage />} />
    <Route path="/access" element={<AccessPage />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/prototype/:screenId?" element={<PrototypePage />} />
      <Route path="/config" element={<ConfigPage />} />
    </Route>
    <Route path="*" element={<Navigate replace to="/" />} />
  </Routes>
)
