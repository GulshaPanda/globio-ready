# Globio Ready: "Am I exam-ready?"

Many learners finish A1 German and book their Goethe or ÖSD exam without knowing whether they are ready. Some fail and lose both the exam fee and time on their journey abroad.

**Globio Ready** is a short readiness check that tells learners where they stand *before* they book.

**Live app:** https://globio-ready.vercel.app

## What it does

The learner answers **15 questions**: 5 vocabulary, 5 grammar and 5 reading, based on a short email and an opening-hours sign. The questions are in the style of the A1 exam. After each answer, the learner says whether they were **sure** or **guessing**.

The report shows:

- **A verdict:** Ready to book, Almost ready, or Not ready yet, with the reasons in plain words
- **Readiness by skill**
- **The top 3 topics to practise**, each with a practical tip
- **Confidence insights:** correct answers that were guesses, and wrong answers the learner was sure about
- **An answer review** with an explanation for every question

## How "ready" is calculated

| Rule | Value | Why |
|---|---|---|
| Overall score needed | **70%** | The real A1 exams need about 60%. A 15-question check is less reliable than the real exam, so the app asks for a safety margin. |
| Minimum per skill | **60%** | A strong skill shouldn't hide a weak one. |
| Maximum correct guesses | **3** | Lucky guesses don't count as knowledge. |
| "Almost ready" from | **55%** | Close enough that 1–2 weeks of focused practice could get there. |

- **Skill score** = % of that skill's questions answered correctly. **Overall** = average of the three skills.
- **Confidence never changes the score.** The score stays simply right or wrong. Confidence only affects the verdict and the practice advice.
- **Practice priorities:** each wrong answer gives its topic 2 points, each correct-but-guessed answer gives it 1 point, and the highest-scoring topics are shown.

These thresholds are a first estimate. The next step is to validate them against learners' real exam results.

## Project structure

```
src/
├── config.js              All scoring rules and thresholds
├── data/questions.js      Questions, reading texts and practice tips per topic
├── lib/scoring.js         Turns answers into scores, a verdict and priorities
├── App.jsx                App frame: header and screen switching
└── components/
    ├── WelcomeScreen.jsx  Intro page
    ├── QuizScreen.jsx     One question at a time, with the confidence step
    └── ResultsScreen.jsx  The readiness report
```

Content, rules and logic are deliberately kept apart:
- **Questions are data.** New questions or topics can be added in `questions.js` without touching any logic.
- **Thresholds are configuration.** Every number behind "ready" lives in `config.js`, so the rules can be tuned as real exam outcomes come in.
- **Scoring is separate from display.** `scoring.js` holds all the calculations, and the screens only show the result.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Tech

React, Vite and Tailwind CSS, deployed on Vercel. No login and no database in this first version.

---

*Practice questions in the style of A1 exams. These are not official Goethe or ÖSD items. The result is an estimate, not a guaranteed pass.*
