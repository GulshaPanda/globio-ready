// ─────────────────────────────────────────────────────────────
//  SETTINGS — every number that decides "ready" lives here.
//  To change a rule, change the number. Nothing else needs to move.
// ─────────────────────────────────────────────────────────────

export const CONFIG = {
  // "Ready" needs at least this overall score (in %).
  // The real A1 exams need about 60% to pass. We ask for 70% because a
  // short 15-question check is less reliable than the real exam, so we
  // want a safety margin.
  readyOverall: 70,

  // ...AND no single skill may be below this score (in %).
  // A learner with 95% vocabulary but 40% grammar is not really ready.
  minSkillScore: 60,

  // Below "ready" but at or above this overall score = "Almost ready".
  // Below it = "Not yet".
  almostOverall: 55,

  // If more than this many CORRECT answers were marked "I guessed",
  // the learner cannot be "Ready" — at best "Almost ready".
  // Lucky guesses don't count as knowledge.
  maxLuckyGuesses: 3,

  // How many topics to show in "What to practise before booking".
  topicsToShow: 3,

  // How much each mistake counts when choosing what to practise.
  // A wrong answer matters more than a correct-but-guessed one.
  weightWrong: 2,
  weightGuessed: 1,
}

// The three skills, in the order they appear on the results screen.
export const SKILLS = [
  { id: 'vocabulary', label: 'Vocabulary' },
  { id: 'grammar', label: 'Grammar' },
  { id: 'reading', label: 'Reading' },
]
