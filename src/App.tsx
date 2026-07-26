import { createRoot } from 'react-dom/client'
import { AboutPage } from './pages/AboutPage'
import { HomePage } from './pages/HomePage'
import { NewsPage } from './pages/NewsPage'

function getPage() {
  const path = window.location.pathname

  if (path === '/about') {
    return <AboutPage />
  }

  if (path === '/news') {
    return <NewsPage />
  }

  return <HomePage />
}

export function renderApp(container: HTMLElement) {
  const root = createRoot(container)
  root.render(getPage())
}
