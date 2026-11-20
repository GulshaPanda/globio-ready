// ─────────────────────────────────────────────────────────────
//  RESULTS SCREEN — the readiness report.
//  All the maths happens in src/lib/scoring.js; this file only displays it.
// ─────────────────────────────────────────────────────────────

import { useState } from 'react'
import { calculateResult } from '../lib/scoring.js'
import { CONFIG } from '../config.js'

// What each verdict looks like and says.
const VERDICTS = {
  ready: {
    title: 'Ready to book',
    message: 'You look ready for the A1 exam. Keep practising lightly until exam day.',
    style: 'bg-emerald-50 ring-emerald-200 text-emerald-900',
    badge: 'bg-emerald-600',
  },
  almost: {
    title: 'Almost ready',
    message: 'You’re close. Practise the topics below for 1–2 weeks, then retake this check before booking.',
    style: 'bg-amber-50 ring-amber-200 text-amber-900',
    badge: 'bg-amber-500',
  },
  notYet: {
    title: 'Not ready yet',
    message: 'Wait before booking — you could lose the exam fee. Focus on the topics below, then check again.',
    style: 'bg-rose-50 ring-rose-200 text-rose-900',
    badge: 'bg-rose-600',
  },
}

function barColour(percent) {
  if (percent >= CONFIG.readyOverall) return 'bg-emerald-500'
  if (percent >= CONFIG.minSkillScore) return 'bg-amber-400'
  return 'bg-rose-500'
}

export default function ResultsScreen({ answers, onRetake }) {
  const result = calculateResult(answers)
  const v = VERDICTS[result.verdict]
  const [showReview, setShowReview] = useState(false)

  return (
    <div className="space-y-6">
      {/* 1. Verdict */}
      <section className={`rounded-2xl p-6 ring-1 ${v.style}`}>
        <div className="flex items-center gap-4">
          <div className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl text-2xl font-bold text-white ${v.badge}`}>
            {result.overall}%
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide opacity-70">Your readiness</p>
            <h1 className="text-2xl font-bold">{v.title}</h1>
          </div>
        </div>
        <p className="mt-4">{v.message}</p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
          {result.reasons.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>

      {/* 2. Score per skill */}
      <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
        <h2 className="text-lg font-semibold">Readiness by skill</h2>
        <div className="mt-4 space-y-4">
          {result.skillScores.map((s) => (
            <div key={s.id}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="font-medium">{s.label}</span>
                <span className="text-slate-500">
                  {s.correct}/{s.total} correct · <b className="text-slate-900">{s.percent}%</b>
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <div className={`h-full rounded-full ${barColour(s.percent)}`} style={{ width: `${s.percent}%` }} />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-slate-500">
          We look for {CONFIG.readyOverall}% overall and at least {CONFIG.minSkillScore}% in every skill.
        </p>
      </section>

      {/* 3. What to practise */}
      <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
        <h2 className="text-lg font-semibold">What to practise before booking</h2>
        {result.priorities.length === 0 ? (
          <p className="mt-3 text-slate-600">
            No weak topics found — you answered everything correctly and confidently. 🎉
          </p>
        ) : (
          <ol className="mt-4 space-y-3">
            {result.priorities.map((p, i) => (
              <li key={p.id} className="flex gap-3 rounded-xl bg-slate-50 p-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <div className="font-semibold">{p.label}</div>
                  <p className="mt-1 text-sm text-slate-600">{p.tip}</p>
                  <p className="mt-1 text-xs text-slate-400">
                    {p.wrong > 0 && `${p.wrong} wrong`}
                    {p.wrong > 0 && p.guessed > 0 && ' · '}
                    {p.guessed > 0 && `${p.guessed} correct but guessed`}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>

      {/* 4. Confidence insight */}
      {(result.luckyGuesses > 0 || result.confidentMistakes > 0) && (
        <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold">How sure were you?</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-2xl font-bold">{result.luckyGuesses}</div>
              <p className="text-sm text-slate-600">correct answers were guesses — worth revising so they stick.</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-2xl font-bold">{result.confidentMistakes}</div>
              <p className="text-sm text-slate-600">
                wrong answers you were sure about — these are the trickiest to fix, so look at them first.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 5. Answer review */}
      <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
        <button onClick={() => setShowReview(!showReview)} className="flex w-full items-center justify-between text-left">
          <h2 className="text-lg font-semibold">Review your answers</h2>
          <span className="text-indigo-600">{showReview ? 'Hide' : 'Show'}</span>
        </button>
        {showReview && (
          <ul className="mt-4 space-y-3">
            {result.review.map(({ question, choice, isCorrect, guessed }) => (
              <li key={question.id} className="rounded-xl border border-slate-200 p-4 text-sm">
                <div className="flex gap-2">
                  <span>{isCorrect ? '✅' : '❌'}</span>
                  <span className="font-medium">{question.prompt}</span>
                </div>
                <p className="mt-1 text-slate-600">
                  Your answer: {choice} {guessed && <span className="text-slate-400">(guessed)</span>}
                  {!isCorrect && <> · Correct: <b>{question.answer}</b></>}
                </p>
                <p className="mt-1 text-slate-500">{question.explanation}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* 6. Next steps */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={onRetake}
          className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
        >
          Retake the check
        </button>
      </div>

      <p className="text-xs text-slate-500">
        This is an estimate from a short practice check, not an official result or a guaranteed pass.
      </p>
    </div>
  )
}
