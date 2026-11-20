// ─────────────────────────────────────────────────────────────
//  WELCOME SCREEN — the first page the learner sees.
// ─────────────────────────────────────────────────────────────

import { QUESTIONS } from '../data/questions.js'

export default function WelcomeScreen({ onStart }) {
  const steps = [
    { title: 'Answer', text: 'Vocabulary, grammar and reading in the style of the A1 exam.' },
    { title: 'Be honest', text: 'Tell us if you were sure or guessing. Lucky guesses don’t count as ready.' },
    { title: 'Get your plan', text: 'See your readiness per skill and exactly what to practise.' },
  ]

  return (
    <div>
      <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-indigo-600">
        Before you book Goethe or ÖSD A1
      </p>
      <h1 className="text-3xl font-bold leading-tight sm:text-4xl">Am I ready for my A1 German exam?</h1>
      <p className="mt-4 text-lg text-slate-600">
        Find out where you stand before you spend money on the exam fee — and what to practise if
        you’re not there yet.
      </p>

      <div className="mt-6 flex flex-wrap gap-2 text-sm">
        <span className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
          {QUESTIONS.length} questions
        </span>
        <span className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">About 10 minutes</span>
        <span className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">Personal readiness report</span>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {steps.map((step, i) => (
          <div key={step.title} className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
            <div className="text-sm font-semibold text-indigo-600">0{i + 1}</div>
            <div className="mt-1 font-semibold">{step.title}</div>
            <p className="mt-1 text-sm text-slate-600">{step.text}</p>
          </div>
        ))}
      </div>

      <button
        onClick={onStart}
        className="mt-8 w-full rounded-xl bg-indigo-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-indigo-700 sm:w-auto"
      >
        Start the check →
      </button>

      <p className="mt-6 text-xs text-slate-500">
        Practice questions in the style of A1 exams — not official exam items. Your result is an
        estimate, not a guaranteed pass.
      </p>
    </div>
  )
}
