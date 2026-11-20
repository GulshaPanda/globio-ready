# Globio Ready: "Am I exam-ready?"

A short A1 German readiness check. Learners answer 15 questions (vocabulary, grammar, reading). For each one they also say whether they were **sure** or **guessing**. They then get:

- a verdict: **Ready to book**, **Almost ready** or **Not ready yet**
- a score for each skill
- the **2–3 topics to practise** before booking the Goethe or ÖSD exam

Built with React + Vite + Tailwind CSS. No login and no database.

---

## How "ready" is calculated

All the numbers live in `src/config.js`.

1. **Skill score** = % of that skill's 5 questions answered correctly.
2. **Overall score** = average of the three skills, each weighted equally.
3. **Ready to book** needs all three of these:
   - **70% or more overall.** The real A1 exams need about 60%. A short 15-question check is less reliable than the real exam, so we ask for a safety margin.
   - **No skill below 60%.** A strong score in one skill shouldn't hide a weak one.
   - **No more than 3 correct answers marked "I guessed".** Lucky guesses don't count as knowledge.
4. **Almost ready** = 55% or more overall, but at least one rule above isn't met.
5. **Not ready yet** = below 55%.

**What to practise:** every wrong answer gives its topic 2 points, and every correct-but-guessed answer gives it 1 point. The 3 topics with the most points are shown, each with a practical tip.

Confidence **never changes the score**. The score is simply right or wrong, which keeps it fair. Confidence only affects the **verdict** and the **advice**.

These thresholds are a first estimate. The next step is to check them against learners' real exam results.

---

## Code map: which file does what

| File | What it does | Go here when you want to… |
|---|---|---|
| `src/config.js` | **Settings.** Every number behind "ready" | change the pass mark, the guess limit, or the number of topics shown |
| `src/data/questions.js` | **All questions**, reading texts, and practice tips per topic | add, edit or remove a question, a reading text or a tip |
| `src/lib/scoring.js` | **The brain.** Turns answers into scores, a verdict and priorities | change *how* scoring works (new rules) |
| `src/App.jsx` | **The frame.** Header, plus which screen to show | change the header or the order of screens |
| `src/components/WelcomeScreen.jsx` | First page | change the welcome text or button |
| `src/components/QuizScreen.jsx` | One question at a time, plus "How sure are you?" | change how a question looks or behaves |
| `src/components/ResultsScreen.jsx` | The readiness report | change the verdict wording, colours or sections |
| `src/index.css` | Global font and background | change the look of the whole app |

---

## Likely live-round changes, and where to make them

| They ask… | You do… |
|---|---|
| "Change the pass mark to 65%" | `src/config.js` → `readyOverall: 65` |
| "Show only 2 practice topics" | `src/config.js` → `topicsToShow: 2` |
| "Ignore guesses in the verdict" | `src/config.js` → `maxLuckyGuesses: 15` |
| "Add a grammar question" | `src/data/questions.js` → copy a grammar block, paste it, change `id`, `prompt`, `options`, `answer`, `explanation` |
| "Change the 'Almost ready' message" | `src/components/ResultsScreen.jsx` → `VERDICTS` → `almost` → `message` |
| "Change the button colour" | Replace `indigo` with another colour (e.g. `emerald`) in the component files |
| "Make grammar count more" | `src/lib/scoring.js` → step 3, the overall score calculation |

---

## Run it on your laptop

You need Node.js installed (from nodejs.org).

```bash
npm install      # one time only: downloads the building blocks
npm run dev      # starts the app at http://localhost:5173
```

Save any file and the browser updates automatically.

## Put it online (Vercel)

1. Upload this folder to a new GitHub repository.
2. Go to vercel.com → sign in with GitHub → **Add New Project** → choose the repository → **Deploy**.
3. Vercel gives you a public link. Every time you push a change to GitHub, the live app updates automatically.

---

*Practice questions in the style of A1 exams. These are not official Goethe or ÖSD items.*
