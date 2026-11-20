// ─────────────────────────────────────────────────────────────
//  APP — the "frame" of the app. It remembers two things:
//    • which screen we are on (welcome → quiz → results)
//    • the learner's answers
//  and shows the right screen.
// ─────────────────────────────────────────────────────────────

import { useState } from 'react'
import WelcomeScreen from './components/WelcomeScreen.jsx'
import QuizScreen from './components/QuizScreen.jsx'
import ResultsScreen from './components/ResultsScreen.jsx'

export default function App() {
  const [screen, setScreen] = useState('welcome')
  const [answers, setAnswers] = useState({})

  function startCheck() {
    setAnswers({})
    setScreen('quiz')
    window.scrollTo(0, 0)
  }

  function finishCheck(finalAnswers) {
    setAnswers(finalAnswers)
    setScreen('results')
    window.scrollTo(0, 0)
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-2xl items-center gap-2 px-5 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white">
            ✓
          </div>
          <span className="font-semibold">Globio Ready</span>
          <span className="ml-auto text-sm text-slate-500">A1 German readiness check</span>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-5 py-8 sm:py-12">
        {screen === 'welcome' && <WelcomeScreen onStart={startCheck} />}
        {screen === 'quiz' && <QuizScreen onFinish={finishCheck} />}
        {screen === 'results' && <ResultsScreen answers={answers} onRetake={startCheck} />}
      </main>
    </div>
  )
}
