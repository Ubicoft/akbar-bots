import { useEffect, useMemo, useRef, useState } from 'react'
import type { DemoScript } from '../demos'

type Msg = { role: 'bot' | 'user'; text: string }

export function DemoChat({ script }: { script: DemoScript }) {
  const [stepId, setStepId] = useState(script.start)
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [busy, setBusy] = useState(false)
  const endRef = useRef<HTMLDivElement | null>(null)

  const step = script.steps[stepId]

  const boot = useMemo(() => {
    const first = script.steps[script.start]
    return (first?.bot ?? []).map((text) => ({ role: 'bot' as const, text }))
  }, [script])

  useEffect(() => {
    setStepId(script.start)
    setMsgs(boot)
    setBusy(false)
  }, [script, boot])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [msgs, stepId, busy])

  const onChoice = async (choiceId: string, label: string) => {
    if (busy || !step?.next) return
    setBusy(true)
    setMsgs((m) => [...m, { role: 'user', text: label }])

    const nextId = step.next[choiceId]
    const next = script.steps[nextId]
    if (!next) {
      setBusy(false)
      return
    }

    await wait(280)
    for (const text of next.bot) {
      setMsgs((m) => [...m, { role: 'bot', text }])
      await wait(220)
    }
    setStepId(nextId)
    setBusy(false)
  }

  const restart = () => {
    setStepId(script.start)
    setMsgs(boot)
    setBusy(false)
  }

  const showChoices = Boolean(step?.choices) && !step?.end && !busy

  return (
    <div className="demo-chat">
      <div className="demo-chat-top">
        <div className="chat-avatar pulse-dot" />
        <div className="chat-meta">
          <strong>{script.botName}</strong>
          <span>online · demo</span>
        </div>
        <button type="button" className="demo-restart" onClick={restart}>
          {script.restart}
        </button>
      </div>

      <div className="demo-chat-thread" role="log" aria-live="polite">
        {msgs.map((msg, i) => (
          <div key={`${msg.role}-${i}-${msg.text}`} className={`bubble bubble-${msg.role}`}>
            {msg.text}
          </div>
        ))}
        {busy ? (
          <div className="bubble bubble-bot is-typing" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        ) : null}
        <div ref={endRef} />
      </div>

      <div className="demo-chat-actions">
        {showChoices ? (
          step!.choices!.map((c) => (
            <button
              key={c.id}
              type="button"
              className="demo-choice"
              disabled={busy}
              onClick={() => onChoice(c.id, c.label)}
            >
              {c.label}
            </button>
          ))
        ) : (
          <p className="demo-chat-hint">{busy ? '…' : script.hint}</p>
        )}
        {step?.end && !busy ? (
          <button type="button" className="demo-choice is-ghost" onClick={restart}>
            {script.restart}
          </button>
        ) : null}
      </div>
    </div>
  )
}

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}
