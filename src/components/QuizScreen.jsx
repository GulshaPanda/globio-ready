// ─────────────────────────────────────────────────────────────
//  QUIZ SCREEN — shows one question at a time.
//  For each question the learner:
//    1. picks an answer
//    2. says "I'm sure" or "I guessed"
//  then moves on. At the end we send all answers to the results screen.
// ─────────────────────────────────────────────────────────────

import { useState } from 'react'
import { QUESTIONS, PASSAGES } from '../data/questions.js'
import { SKILLS } from '../config.js'

export default function QuizScreen({ onFinish }) {
  const [index, setIndex] = useState(0) // which question we're on (0 = first)
  const [answers, setAnswers] = useState({})

  const question = QUESTIONS[index]
  const current = answers[question.id] || {}
  const passage = question.passage ? PASSAGES[question.passage] : null
  const skillLabel = SKILLS.find((s) => s.id === question.skill)?.label
  const isLast = index === QUESTIONS.length - 1
  const canContinue = current.choice && current.confidence

  function update(field, value) {
    setAnswers({ ...answers, [question.id]: { ...current, [field]: value } })
  }

  function next() {
    if (isLast) onFinish(answers)
    else {
      setIndex(index + 1)
      window.scrollTo(0, 0)
    }
  }

  const progress = Math.round((index / QUESTIONS.length) * 100)

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-2 flex justify-between text-sm text-slate-500">
        <span className="font-semibold text-indigo-600">{skillLabel}</span>
        <span>
          Question {index + 1} of {QUESTIONS.length}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full bg-indigo-600 transition-all" style={{ width: `${progress}%` }} />
      </div>

      {/* Reading text, only for reading questions */}
      {passage && (
        <div className="mt-6 rounded-2xl border-l-4 border-indigo-400 bg-indigo-50 p-5">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700">
            {passage.title}
          </div>
          <p className="whitespace-pre-line leading-relaxed">{passage.text}</p>
        </div>
      )}

      {/* The question */}
      <div className="mt-6 rounded-2xl bg-white p-6 ring-1 ring-slate-200">
        <p className="text-sm text-slate-500">{question.instruction}</p>
        <h2 className="mt-2 text-xl font-semibold leading-snug">{question.prompt}</h2>

        <div className="mt-5 grid gap-2">
          {question.options.map((option) => {
            const selected = current.choice === option
            return (
              <button
                key={option}
                onClick={() => update('choice', option)}
                className={`rounded-xl border-2 px-4 py-3 text-left transition ${
                  selected
                    ? 'border-indigo-600 bg-indigo-50 font-semibold'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {option}
              </button>
            )
          })}
        </div>

        {/* Confidence — appears after an answer is picked */}
        {current.choice && (
          <div className="mt-6 border-t border-slate-100 pt-5">
            <p className="text-sm font-semibold">How sure are you?</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {[
                { value: 'sure', label: '👍 I’m sure' },
                { value: 'guess', label: '🤔 I guessed' },
              ].map((c) => (
                <button
                  key={c.value}
                  onClick={() => update('confidence', c.value)}
                  className={`rounded-xl border-2 px-4 py-2 transition ${
                    current.confidence === c.value
                      ? 'border-indigo-600 bg-indigo-50 font-semibold'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={() => setIndex(index - 1)}
          disabled={index === 0}
          className="rounded-xl px-4 py-3 text-slate-600 hover:bg-slate-100 disabled:invisible"
        >
          ← Back
        </button>
        <button
          onClick={next}
          disabled={!canContinue}
          className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isLast ? 'See my results →' : 'Next →'}
        </button>
      </div>
    </div>
  )
}
