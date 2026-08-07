import type { ReactNode } from 'react'

interface PageShellProps {
  children?: ReactNode
  variant?: 'home' | 'content'
  currentPath?: string
}

export function PageShell({ children, variant = 'content', currentPath = '/' }: PageShellProps) {
  const isHome = variant === 'home'
  const isAbout = currentPath === '/about'
  const isBlog = currentPath === '/blog'

  return (
    <div className={isHome ? 'page-shell page-shell--home' : 'page-shell'}>
      <header className="site-header">
        <nav className="site-nav" aria-label="Main navigation">
          <a className={currentPath === '/' ? 'site-nav__link site-nav__link--active' : 'site-nav__link'} href="/">
            Home
          </a>
          <a className={isAbout ? 'site-nav__link site-nav__link--active' : 'site-nav__link'} href="/about">
            About
          </a>
          <a className={isBlog ? 'site-nav__link site-nav__link--active' : 'site-nav__link'} href="/blog">
            Blog
          </a>
        </nav>
      </header>

      <main className="page-content">{children}</main>
    </div>
  )
}
