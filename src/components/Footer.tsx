export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__content">
        <a className="site-footer__email" href="mailto:waggingdogfarm@gmail.com">
          waggingdogfarm@gmail.com
        </a>

        <div className="site-footer__socials" aria-label="Social media links">
          <a
            className="site-footer__icon"
            href="https://www.facebook.com/p/Wagging-Dog-Farm-61567452277819/"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M13.6 22v-8h2.6l.4-3h-3V7.4c0-.9.3-1.5 1.6-1.5H17V3.3c-.7-.1-1.9-.2-3.1-.2-3.1 0-5.2 1.9-5.2 5.4V11H6.9v3h1.8v8h4.9Z" />
            </svg>
          </a>

          <a
            className="site-footer__icon"
            href="https://www.instagram.com/waggingdogfarm/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm9.5 1.8a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 6.5A5.5 5.5 0 1 1 12 17.5A5.5 5.5 0 0 1 12 6.5Zm0 2A3.5 3.5 0 1 0 12 15.5A3.5 3.5 0 0 0 12 8.5Z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
