// ─────────────────────────────────────────────────────────────
//  SCORING — turns the learner's answers into a readiness result.
//  The numbers it uses come from src/config.js.
//
//  "answers" looks like this:
//    { v1: { choice: 'fünfzehn', confidence: 'sure' },
//      g1: { choice: 'trinkt',   confidence: 'guess' }, ... }
// ─────────────────────────────────────────────────────────────

import { CONFIG, SKILLS } from '../config.js'
import { QUESTIONS, TOPICS } from '../data/questions.js'

export function calculateResult(answers) {
  // 1. Mark every question: right or wrong, sure or guessing.
  const review = QUESTIONS.map((q) => {
    const given = answers[q.id] || {}
    return {
      question: q,
      choice: given.choice,
      isCorrect: given.choice === q.answer,
      guessed: given.confidence === 'guess',
    }
  })

  // 2. Score per skill = % of that skill's questions answered correctly.
  const skillScores = SKILLS.map((skill) => {
    const items = review.filter((r) => r.question.skill === skill.id)
    const correct = items.filter((r) => r.isCorrect).length
    const percent = items.length ? Math.round((correct / items.length) * 100) : 0
    return { ...skill, correct, total: items.length, percent }
  })

  // 3. Overall score = average of the three skills (each skill counts equally).
  const overall = Math.round(
    skillScores.reduce((sum, s) => sum + s.percent, 0) / skillScores.length,
  )

  // 4. Confidence signals (they don't change the score, they change the verdict).
  const luckyGuesses = review.filter((r) => r.isCorrect && r.guessed).length
  const confidentMistakes = review.filter((r) => !r.isCorrect && !r.guessed).length
  const weakSkills = skillScores.filter((s) => s.percent < CONFIG.minSkillScore)

  // 5. Decide the verdict, and write down WHY in plain words.
  const reasons = []
  let verdict

  if (
    overall >= CONFIG.readyOverall &&
    weakSkills.length === 0 &&
    luckyGuesses <= CONFIG.maxLuckyGuesses
  ) {
    verdict = 'ready'
    reasons.push(
      `You scored ${overall}% overall and at least ${CONFIG.minSkillScore}% in every skill.`,
    )
  } else if (overall >= CONFIG.almostOverall) {
    verdict = 'almost'
  } else {
    verdict = 'notYet'
    reasons.push(
      `You scored ${overall}% overall. We suggest at least ${CONFIG.readyOverall}% before booking.`,
    )
  }

  if (verdict !== 'ready') {
    if (overall >= CONFIG.almostOverall && overall < CONFIG.readyOverall) {
      reasons.push(`You scored ${overall}% — close to the ${CONFIG.readyOverall}% we look for.`)
    }
    weakSkills.forEach((s) =>
      reasons.push(`${s.label} is at ${s.percent}%, below the ${CONFIG.minSkillScore}% minimum.`),
    )
    if (luckyGuesses > CONFIG.maxLuckyGuesses) {
      reasons.push(
        `${luckyGuesses} of your correct answers were guesses. Lucky guesses won’t repeat in the real exam.`,
      )
    }
  }

  // 6. Pick what to practise: wrong answers count most, correct guesses count a little.
  const topicPoints = {}
  review.forEach((r) => {
    const t = r.question.topic
    if (!topicPoints[t]) topicPoints[t] = { wrong: 0, guessed: 0, points: 0 }
    if (!r.isCorrect) {
      topicPoints[t].wrong += 1
      topicPoints[t].points += CONFIG.weightWrong
    } else if (r.guessed) {
      topicPoints[t].guessed += 1
      topicPoints[t].points += CONFIG.weightGuessed
    }
  })

  const priorities = Object.entries(topicPoints)
    .filter(([, info]) => info.points > 0)
    .sort((a, b) => b[1].points - a[1].points) // highest points first
    .slice(0, CONFIG.topicsToShow)
    .map(([topicId, info]) => ({ id: topicId, ...TOPICS[topicId], ...info }))

  return {
    overall,
    verdict,
    reasons,
    skillScores,
    luckyGuesses,
    confidentMistakes,
    priorities,
    review,
  }
}
