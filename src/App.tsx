import { useEffect, useState } from 'react'
import { LANGS, copy, type Lang } from './i18n'
import { THEMES, THEME_STORAGE_KEY, type ThemeId } from './themes'
import { getDemoScripts } from './demos'
import { pricingByLang } from './pricing'
import { faqByLang } from './faq'
import { useReveal } from './hooks/useReveal'
import { LivingBg } from './components/LivingBg'
import { CustomCursor } from './components/CustomCursor'
import { DemoChat } from './components/DemoChat'
import { FaqList } from './components/FaqList'

const LANG_KEY = 'akbar-portfolio-lang'

function Reveal({
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
      {children}
    </section>
  )
}

export default function App() {
  const [lang, setLang] = useState<Lang>('ru')
  const [theme, setTheme] = useState<ThemeId>('blue')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const t = copy[lang]
  const demos = getDemoScripts(lang)
  const pricing = pricingByLang[lang]
  const faq = faqByLang[lang]

  useEffect(() => {
    const savedLang = localStorage.getItem(LANG_KEY) as Lang | null
    if (savedLang && LANGS.some((l) => l.code === savedLang)) setLang(savedLang)
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeId | null
    if (savedTheme && THEMES.some((th) => th.id === savedTheme)) setTheme(savedTheme)
  }, [])

  useEffect(() => {
    localStorage.setItem(LANG_KEY, lang)
    document.documentElement.lang = lang === 'tg' ? 'tg' : lang
  }, [lang])

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      document.querySelector('.hero-enter')?.classList.add('is-settled')
    }, 1600)
    return () => window.clearTimeout(timer)
  }, [])

  const setLanguage = (code: Lang) => {
    setLang(code)
    setMenuOpen(false)
  }

  const closeMenu = () => setMenuOpen(false)

  const chat = {
    hello:
      lang === 'en'
        ? 'Hi! Want to book a time or place an order?'
        : lang === 'tg'
          ? 'Салом! Сабти ном ё фармоиш мехоҳед?'
          : 'Здравствуйте! Записать вас или принять заказ?',
    user:
      lang === 'en'
        ? 'Book for tomorrow, 15:00'
        : lang === 'tg'
          ? 'Барои фардо, соати 15:00'
          : 'Запись на завтра, 15:00',
    done:
      lang === 'en'
        ? 'Done. Reminder comes an hour before.'
        : lang === 'tg'
          ? 'Тайёр. Як соат пеш ёдрас мефиристам.'
          : 'Готово. Напомню за час до визита.',
  }

  return (
    <>
      <LivingBg />
      <CustomCursor />

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
            <a href="#faq">{t.nav.faq}</a>
            <a href="#contact">{t.nav.contact}</a>
          </nav>

          <div className="header-actions">
            <div className="theme-switch" role="group" aria-label="Theme">
              {THEMES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={theme === item.id ? 'is-active' : ''}
                  title={item.label}
                  aria-label={item.label}
                  style={{ '--swatch': item.swatch } as React.CSSProperties}
                  onClick={() => setTheme(item.id)}
                />
              ))}
            </div>

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
            <div className="mobile-themes">
              {THEMES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`theme-chip${theme === item.id ? ' is-active' : ''}`}
                  onClick={() => setTheme(item.id)}
                >
                  <i style={{ background: item.swatch }} />
                  {item.label}
                </button>
              ))}
            </div>
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
            <a href="#faq" onClick={closeMenu}>
              {t.nav.faq}
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
              <p className="hero-kicker">Telegram · hustle · night mode</p>
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
              <div className="chat-shell float-soft">
                <div className="chat-top">
                  <div className="chat-avatar pulse-dot" />
                  <div className="chat-meta">
                    <strong>Akbar Bot</strong>
                    <span>online</span>
                  </div>
                </div>
                <div className="bubble bubble-bot">{chat.hello}</div>
                <div className="bubble bubble-user">{chat.user}</div>
                <div className="bubble bubble-bot">{chat.done}</div>
              </div>
            </div>
          </div>
        </section>

        <Reveal id="services" className="section-services">
          <div className="wrap">
            <div className="section-head split-head">
              <h2>{t.services.title}</h2>
              <p>{t.services.lead}</p>
            </div>
            <div className="services-bento">
              {t.services.items.map((item, i) => (
                <article key={item.title} className={`service-tile tile-${i + 1}`}>
                  <span className="tile-index">0{i + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal id="demos" className="section-demos">
          <div className="wrap">
            <div className="section-head">
              <h2>{t.demos.title}</h2>
              <p>{t.demos.lead}</p>
            </div>
            <div className="demos-stack">
              {demos.map((item, i) => (
                <article key={item.id} className={`demo-feature demo-${i + 1}`}>
                  <div className="demo-copy">
                    <span className="demo-for">{item.for}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <p className="demo-help">{item.help}</p>
                  </div>
                  <DemoChat script={item} />
                </article>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal id="process" className="section-process">
          <div className="wrap">
            <div className="section-head">
              <h2>{t.process.title}</h2>
              <p>{t.process.lead}</p>
            </div>
            <ol className="process-rail">
              {t.process.steps.map((step, i) => (
                <li key={step.title} className="process-node">
                  <span className="node-num">{i + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal id="pricing" className="section-pricing">
          <div className="wrap">
            <div className="section-head split-head">
              <h2>{pricing.title}</h2>
              <p>{pricing.lead}</p>
            </div>
            <div className="pricing-row">
              {pricing.packs.map((pack, index) => (
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
            <p className="pricing-note">{pricing.note}</p>
          </div>
        </Reveal>

        <Reveal id="faq" className="section-faq">
          <div className="wrap">
            <div className="section-head split-head">
              <h2>{faq.title}</h2>
              <p>{faq.lead}</p>
            </div>
            <FaqList items={faq.items} />
          </div>
        </Reveal>

        <Reveal id="contact" className="section-contact">
          <div className="wrap contact-band">
            <div className="contact-copy">
              <h2>{t.contact.title}</h2>
              <p>{t.contact.lead}</p>
              <a className="btn btn-primary" href="https://t.me/" target="_blank" rel="noreferrer">
                {t.contact.cta}
              </a>
            </div>
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
          </div>
        </Reveal>
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
