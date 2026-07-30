import { createRoot } from 'react-dom/client'
import { AboutPage } from './pages/AboutPage'
import { BlogPage } from './pages/BlogPage'
import { BlogPostPage } from './pages/BlogPostPage'
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

  if (path.startsWith('/blog/')) {
    const slug = path.replace('/blog/', '')
    return <BlogPostPage slug={slug} />
  }

  if (path === '/blog') {
    return <BlogPage />
  }

  return <HomePage />
}

export function renderApp(container: HTMLElement) {
  const root = createRoot(container)
  root.render(getPage())
}
