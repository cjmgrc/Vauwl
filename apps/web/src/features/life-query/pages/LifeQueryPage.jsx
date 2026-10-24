import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight, SearchX } from 'lucide-react'
import OwlMark from '@/components/ui/OwlMark'
import Button from '@/components/ui/Button'
import { answerQuery } from '@/lib/lifequery'
import { lifeQuerySuggestions } from '@/mocks/data'
import { useDataStore } from '@/stores/dataStore'

const LifeQueryPage = () => {
  const items = useDataStore((state) => state.items)
  const documents = useDataStore((state) => state.documents)
  const [input, setInput] = useState('')
  const [asked, setAsked] = useState(null) // { question, answer }

  const ask = (question) => {
    const trimmed = question.trim()
    if (!trimmed) return
    setInput(trimmed)
    setAsked({ question: trimmed, answer: answerQuery(trimmed, { items, documents }) })
  }

  return (
    <div className="query">
      <header className="query__head">
        <h1>Ask your life, get clear answers.</h1>
        <p className="muted">Search across everything you own, spend, maintain, and remember.</p>
      </header>

      <form className="query__form" onSubmit={(e) => { e.preventDefault(); ask(input) }}>
        <OwlMark glyph size={22} />
        <input
          type="text" className="query__input" placeholder="Ask a question about your belongings" aria-label="Ask a question"
          enterKeyHint="search" autoComplete="off" value={input} onChange={(e) => setInput(e.target.value)}
        />
        <Button variant="primary" type="submit"><ArrowRight size={16} aria-hidden="true" /> Ask</Button>
      </form>

      {!asked && (
        <section aria-labelledby="try-title">
          <h2 id="try-title" className="query__try">Try asking</h2>
          <ul className="suggestions">
            {lifeQuerySuggestions.map((text) => (
              <li key={text}>
                <button type="button" className="suggestion" onClick={() => ask(text)}>
                  <span>{text}</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {asked && (
        <section className="panel answer" aria-live="polite" aria-labelledby="answer-q">
          <div className="panel__body">
            <p className="muted">You asked</p>
            <h2 id="answer-q" className="answer__q">{asked.question}</h2>
            {asked.answer ? (
              <p className="answer__summary">{asked.answer.summary}</p>
            ) : (
              <p className="answer__summary">
                <SearchX size={18} aria-hidden="true" className="answer__icon" />
                I couldn’t find that in your saved records. Try naming an item, a deadline, or a cost.
              </p>
            )}
          </div>
          {asked.answer?.records.length > 0 && (
            <>
              <h3 className="graph__subhead">From {asked.answer.records.length} saved {asked.answer.records.length === 1 ? 'record' : 'records'}</h3>
              <ul className="rows">
                {asked.answer.records.map((record) => (
                  <li key={record.id}>
                    <Link to={record.to} className="row row--button">
                      <div className="row__text">
                        <p className="row__title">{record.title}</p>
                        <p className="muted row__sub">{record.detail}</p>
                      </div>
                      <ChevronRight size={18} aria-hidden="true" className="muted" />
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
          <div className="panel__body">
            <Button variant="secondary" onClick={() => { setAsked(null); setInput('') }}>Ask something else</Button>
          </div>
        </section>
      )}
    </div>
  )
}

export default LifeQueryPage
