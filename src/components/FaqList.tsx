import { useState } from 'react'
import type { FaqItem } from '../faq'

export function FaqList({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="faq-list">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item.q} className={`faq-item${isOpen ? ' is-open' : ''}`}>
            <button
              type="button"
              className="faq-q"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span>{item.q}</span>
              <i aria-hidden="true">{isOpen ? '−' : '+'}</i>
            </button>
            <div className="faq-a" hidden={!isOpen}>
              <p>{item.a}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
