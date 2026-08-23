import type { ReactNode } from 'react'
import { Navbar } from './Navbar'

interface PageShellProps {
  children?: ReactNode
  variant?: 'home' | 'content'
  currentPath?: string
}

export function PageShell({ children, variant = 'content', currentPath = '/' }: PageShellProps) {
  const isHome = variant === 'home'

  return (
    <div className={isHome ? 'page-shell page-shell--home' : 'page-shell'}>
      <Navbar currentPath={currentPath} />

      <main className="page-content">{children}</main>
    </div>
  )
}
