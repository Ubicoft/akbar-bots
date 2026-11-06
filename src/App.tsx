import { useEffect, useState } from 'react'
import { LANGS, copy, type Lang } from './i18n'
import { useReveal } from './hooks/useReveal'

const STORAGE_KEY = 'akbar-portfolio-lang'

function RevealSection({
  id,
  className = '',
  children,
}: {
  id?: string
  className?: string
  children: React.ReactNode
}) {
  const ref = useReveal<HTMLElement>()
  return (
    <section id={id} ref={ref} className={`section reveal ${className}`.trim()}>
      <div className="wrap">{children}</div>
    </section>
  )
}

export default function App() {
  const [lang, setLang] = useState<Lang>('ru')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const t = copy[lang]

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null
    if (saved && LANGS.some((l) => l.code === saved)) setLang(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang === 'tg' ? 'tg' : lang
  }, [lang])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const setLanguage = (code: Lang) => {
    setLang(code)
    setMenuOpen(false)
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="wrap header-inner">
          <a className="brand-mark" href="#top" onClick={closeMenu}>
            {t.hero.brand}
          </a>

          <nav className="nav-desktop" aria-label="Primary">
            <a href="#services">{t.nav.services}</a>
            <a href="#demos">{t.nav.demos}</a>
            <a href="#process">{t.nav.process}</a>
            <a href="#pricing">{t.nav.pricing}</a>
            <a href="#contact">{t.nav.contact}</a>
          </nav>

          <div className="header-actions">
            <div className="lang-switch" role="group" aria-label="Language">
              {LANGS.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  className={lang === item.code ? 'is-active' : ''}
                  onClick={() => setLanguage(item.code)}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              className={`menu-btn${menuOpen ? ' is-open' : ''}`}
              aria-expanded={menuOpen}
              aria-label="Menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span />
            </button>
          </div>
        </div>

        {menuOpen ? (
          <nav className="mobile-nav" aria-label="Mobile">
            <a href="#services" onClick={closeMenu}>
              {t.nav.services}
            </a>
            <a href="#demos" onClick={closeMenu}>
              {t.nav.demos}
            </a>
            <a href="#process" onClick={closeMenu}>
              {t.nav.process}
            </a>
            <a href="#pricing" onClick={closeMenu}>
              {t.nav.pricing}
            </a>
            <a href="#contact" onClick={closeMenu}>
              {t.nav.contact}
            </a>
          </nav>
        ) : null}
      </header>

      <main id="top">
        <section className="hero hero-enter">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <h1 className="hero-brand">{t.hero.brand}</h1>
              <p className="hero-offer">{t.hero.offer}</p>
              <p className="hero-support">{t.hero.support}</p>
              <div className="cta-row">
                <a className="btn btn-primary" href="#contact">
                  {t.hero.cta}
                </a>
                <a className="btn btn-ghost" href="#demos">
                  {t.hero.secondary}
                </a>
              </div>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <div className="orb orb-a" />
              <div className="orb orb-b" />
              <div className="chat-shell">
                <div className="chat-top">
                  <div className="chat-avatar" />
                  <div className="chat-meta">
                    <strong>Akbar Bot</strong>
                    <span>online</span>
                  </div>
                </div>
                <div className="bubble bubble-bot">
                  {lang === 'en'
                    ? 'Hi! Want to book a time or place an order?'
                    : lang === 'tg'
                      ? 'Салом! Сабти ном ё фармоиш мехоҳед?'
                      : 'Здравствуйте! Записать вас или принять заказ?'}
                </div>
                <div className="bubble bubble-user">
                  {lang === 'en'
                    ? 'Book for tomorrow, 15:00'
                    : lang === 'tg'
                      ? 'Барои фардо, соати 15:00'
                      : 'Запись на завтра, 15:00'}
                </div>
                <div className="bubble bubble-bot">
                  {lang === 'en'
                    ? 'Done. Reminder comes an hour before.'
                    : lang === 'tg'
                      ? 'Тайёр. Як соат пеш ёдрас мефиристам.'
                      : 'Готово. Напомню за час до визита.'}
                </div>
              </div>
            </div>
          </div>
        </section>

        <RevealSection id="services">
          <div className="section-head">
            <h2>{t.services.title}</h2>
            <p>{t.services.lead}</p>
          </div>
          <div className="services-list">
            {t.services.items.map((item) => (
              <article key={item.title} className="service-item">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </RevealSection>

        <RevealSection id="demos">
          <div className="section-head">
            <h2>{t.demos.title}</h2>
            <p>{t.demos.lead}</p>
          </div>
          <div className="demos-grid">
            {t.demos.items.map((item) => (
              <article key={item.title} className="demo-panel">
                <span className="demo-for">{item.for}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <p className="demo-help">{item.help}</p>
              </article>
            ))}
          </div>
        </RevealSection>

        <RevealSection id="process">
          <div className="section-head">
            <h2>{t.process.title}</h2>
            <p>{t.process.lead}</p>
          </div>
          <div className="process-track">
            {t.process.steps.map((step) => (
              <article key={step.title} className="process-step">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </RevealSection>

        <RevealSection id="pricing">
          <div className="section-head">
            <h2>{t.pricing.title}</h2>
            <p>{t.pricing.lead}</p>
          </div>
          <div className="pricing-grid">
            {t.pricing.packs.map((pack, index) => (
              <article
                key={pack.name}
                className={`price-panel${index === 1 ? ' is-featured' : ''}`}
              >
                <h3>{pack.name}</h3>
                <p className="price-value">{pack.price}</p>
                <p>{pack.text}</p>
                <ul>
                  {pack.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="pricing-note">{t.pricing.note}</p>
        </RevealSection>

        <RevealSection id="contact">
          <div className="section-head">
            <h2>{t.contact.title}</h2>
            <p>{t.contact.lead}</p>
          </div>
          <div className="contact-block">
            <div className="contact-list">
              <div className="contact-item">
                <span>{t.contact.telegram}</span>
                <strong>{t.contact.telegramValue}</strong>
              </div>
              <div className="contact-item">
                <span>{t.contact.email}</span>
                <strong>{t.contact.emailValue}</strong>
              </div>
            </div>
            <div>
              <a className="btn btn-primary" href="https://t.me/" target="_blank" rel="noreferrer">
                {t.contact.cta}
              </a>
            </div>
          </div>
        </RevealSection>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <span>{t.hero.brand}</span>
          <span>{t.footer.rights}</span>
        </div>
      </footer>
    </>
  )
}
