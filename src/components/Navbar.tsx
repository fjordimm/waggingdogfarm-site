import { useEffect, useState } from 'react'

interface NavbarProps {
  currentPath: string
}

export function Navbar({ currentPath }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showNewsPosts, setShowNewsPosts] = useState(true)
  const selectedPath = currentPath.startsWith('/news/') ? '/news' : currentPath

  useEffect(() => {
    fetch('/news-config.json')
      .then((response) => response.json() as Promise<{ showNewsPosts?: boolean }>)
      .then((config) => setShowNewsPosts(config.showNewsPosts !== false))
      .catch(() => setShowNewsPosts(true))
  }, [])

  const isSelected = (path: string) => selectedPath === path
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="site-header">
      <a className="brand" href="/">
        <img className="brand__logo" src="/images/dog_logo.png" alt="" />
        <span className="brand__copy">
          <span className="brand__name">
            wagging dog <span className="brand__flower">flower</span> farm
          </span>
          <span className="brand__tagline">sisters, or</span>
        </span>
      </a>
      <button
        className="site-menu-toggle"
        type="button"
        aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isMenuOpen}
        aria-controls="site-navigation"
        onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav id="site-navigation" className={isMenuOpen ? 'site-nav site-nav--open' : 'site-nav'} aria-label="Main navigation">
        <a className="site-nav__link" aria-current={isSelected('/') ? 'page' : undefined} href="/" onClick={closeMenu}>
          welcome
        </a>
        <a className="site-nav__link" aria-current={isSelected('/about') ? 'page' : undefined} href="/about" onClick={closeMenu}>
          about
        </a>
        <a className="site-nav__link" aria-current={isSelected('/our-flowers') ? 'page' : undefined} href="/our-flowers" onClick={closeMenu}>
          our flowers
        </a>
        {showNewsPosts && (
          <a className="site-nav__link" aria-current={isSelected('/news') ? 'page' : undefined} href="/news" onClick={closeMenu}>
            news
          </a>
        )}
      </nav>
    </header>
  )
}
