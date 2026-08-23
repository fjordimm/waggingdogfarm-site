import { createRoot } from 'react-dom/client'
import { PageShell } from './components/PageShell'
import { AboutPage } from './pages/AboutPage'
import { HomePage } from './pages/HomePage'
import { NewsPage } from './pages/NewsPage'
import { NewsPostPage } from './pages/NewsPostPage'

function OurFlowersPage() {
  return <PageShell currentPath="/our-flowers" />
}

function getPage() {
  const path = window.location.pathname

  if (path === '/about') {
    return <AboutPage />
  }

  if (path === '/news') {
    return <NewsPage />
  }

  if (path === '/our-flowers') {
    return <OurFlowersPage />
  }

  if (path.startsWith('/news/')) {
    const slug = path.replace('/news/', '')
    return <NewsPostPage slug={slug} />
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
