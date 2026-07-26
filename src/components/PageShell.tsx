import type { ReactNode } from 'react'

interface PageShellProps {
  children: ReactNode
  variant?: 'home' | 'content'
}

export function PageShell({ children, variant = 'content' }: PageShellProps) {
  const isHome = variant === 'home'

  return (
    <div className={isHome ? 'page-shell page-shell--home' : 'page-shell'}>
      <header className="site-header">
        <a className="brand" href="/">
          Wagging Dog Farm
        </a>
        <nav className="site-nav" aria-label="Main navigation">
          <a href="/about">About</a>
          <a href="/news">News</a>
        </nav>
      </header>

      <main className="page-content">{children}</main>
    </div>
  )
}
