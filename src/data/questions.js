// ─────────────────────────────────────────────────────────────
//  QUESTIONS — the whole check lives in this file.
//
//  To ADD a question: copy one block { ... }, paste it in the list,
//  change the text. Make sure:
//    • skill  is 'vocabulary', 'grammar' or 'reading'
//    • topic  is one of the topic ids in TOPICS below
//    • answer is written EXACTLY like one of the options
//
//  These are practice questions in the style of A1 exams.
//  They are not official Goethe or ÖSD exam items.
// ─────────────────────────────────────────────────────────────

// Topics: what we tell the learner to practise if they get these wrong.
export const TOPICS = {
  numbers: {
    label: 'Numbers & prices',
    tip: 'Practise numbers 1–100, especially -zehn vs -zig (fünfzehn = 15, fünfzig = 50). Read prices out loud when you shop.',
  },
  time: {
    label: 'Days, dates & times',
    tip: 'Learn the days of the week in order and practise saying times (um 7 Uhr, um halb acht).',
  },
  family: {
    label: 'Family words',
    tip: 'Draw your family tree and label it in German: Mutter, Vater, Großmutter, Bruder, Schwester…',
  },
  shopping: {
    label: 'Food & shopping words',
    tip: 'Learn which things you buy where: Bäckerei (Brot, Brötchen), Supermarkt, Apotheke, Post.',
  },
  signs: {
    label: 'Signs & public places',
    tip: 'Learn common signs: Eingang, Ausgang, Kasse, Aufzug, geöffnet, geschlossen.',
  },
  conjugation: {
    label: 'Verb endings (ich trinke, du trinkst)',
    tip: 'Practise present-tense endings: ich -e, du -st, er/sie/es -t, wir -en, ihr -t, sie/Sie -en.',
  },
  accusative: {
    label: 'Accusative articles (einen, den)',
    tip: 'After "haben", "brauchen", "kaufen": der → den, ein → einen. Only masculine words change.',
  },
  wordOrder: {
    label: 'Sentence order (verb in 2nd place)',
    tip: 'In a German statement the verb is always the 2nd item: "Am Montag gehe ich…", not "Am Montag ich gehe…".',
  },
  negation: {
    label: 'Saying "no": kein vs nicht',
    tip: 'Use kein/keine before a noun ("kein Auto"). Use nicht for verbs and adjectives ("Ich komme nicht").',
  },
  modalVerbs: {
    label: 'Modal verbs (möchten, können, müssen)',
    tip: 'With a modal verb, the second verb goes to the END in its basic form: "Ich möchte Kaffee trinken."',
  },
  readingMessages: {
    label: 'Reading short emails & messages',
    tip: 'Read short emails and underline the key facts first: who, when (day + time), what to bring or do.',
  },
  readingNotices: {
    label: 'Reading signs, notices & opening times',
    tip: 'Practise reading opening hours and notices. Watch for small words: auch, nur, bis, geschlossen.',
  },
}

// Short texts used by the reading questions.
export const PASSAGES = {
  email: {
    title: 'Email from Lukas',
    text:
      'Hallo Anna,\n' +
      'am Samstag habe ich Geburtstag. Ich mache um 19 Uhr eine Party bei mir zu Hause. ' +
      'Kannst du bitte einen Salat mitbringen? Getränke habe ich schon. ' +
      'Bitte antworte mir bis Donnerstag.\n' +
      'Viele Grüße\nLukas',
  },
  doctor: {
    title: 'Sign at a doctor’s practice',
    text:
      'Praxis Dr. Weber\n' +
      'Sprechzeiten: Montag bis Freitag 8–12 Uhr\n' +
      'Dienstag und Donnerstag auch 15–18 Uhr\n' +
      'Termine bitte nur am Telefon: 030 445567',
  },
}

export const QUESTIONS = [
  // ── VOCABULARY ────────────────────────────────────────────
  {
    id: 'v1',
    skill: 'vocabulary',
    topic: 'numbers',
    instruction: 'Choose the right word for the number.',
    prompt: 'Das Buch kostet 15 Euro. Wie sagt man „15“?',
    options: ['fünfzig', 'fünfzehn', 'fünf', 'fünfundzwanzig'],
    answer: 'fünfzehn',
    explanation: '15 = fünfzehn. Numbers ending in -zehn are 13–19; -zig means tens (fünfzig = 50).',
  },
  {
    id: 'v2',
    skill: 'vocabulary',
    topic: 'time',
    instruction: 'Choose the missing word.',
    prompt: 'Heute ist Dienstag. Morgen ist ___.',
    options: ['Montag', 'Donnerstag', 'Mittwoch', 'Freitag'],
    answer: 'Mittwoch',
    explanation: 'Montag → Dienstag → Mittwoch. The day after Tuesday is Wednesday (Mittwoch).',
  },
  {
    id: 'v3',
    skill: 'vocabulary',
    topic: 'family',
    instruction: 'Choose the missing word.',
    prompt: 'Die Mutter von meiner Mutter ist meine ___.',
    options: ['Schwester', 'Großmutter', 'Tante', 'Tochter'],
    answer: 'Großmutter',
    explanation: 'Your mother’s mother is your grandmother: die Großmutter (or Oma).',
  },
  {
    id: 'v4',
    skill: 'vocabulary',
    topic: 'shopping',
    instruction: 'Choose the word that fits.',
    prompt: 'In der Bäckerei kaufe ich ___.',
    options: ['eine Hose', 'Briefmarken', 'eine Fahrkarte', 'Brötchen'],
    answer: 'Brötchen',
    explanation: 'A Bäckerei is a bakery, so you buy Brötchen (bread rolls) there.',
  },
  {
    id: 'v5',
    skill: 'vocabulary',
    topic: 'signs',
    instruction: 'Which sign are you looking for?',
    prompt: 'Sie sind im Kaufhaus und möchten nach draußen gehen. Welches Schild suchen Sie?',
    options: ['Eingang', 'Ausgang', 'Kasse', 'Aufzug'],
    answer: 'Ausgang',
    explanation: 'Ausgang = exit. Eingang = entrance, Kasse = checkout, Aufzug = lift.',
  },

  // ── GRAMMAR ───────────────────────────────────────────────
  {
    id: 'g1',
    skill: 'grammar',
    topic: 'conjugation',
    instruction: 'Choose the correct verb form.',
    prompt: 'Ich ___ jeden Morgen Kaffee.',
    options: ['trinkt', 'trinke', 'trinken', 'trinkst'],
    answer: 'trinke',
    explanation: 'With "ich", the verb ends in -e: ich trinke.',
  },
  {
    id: 'g2',
    skill: 'grammar',
    topic: 'accusative',
    instruction: 'Choose the correct article.',
    prompt: 'Ich habe ___ Bruder und eine Schwester.',
    options: ['ein', 'einem', 'einen', 'eine'],
    answer: 'einen',
    explanation: '"Bruder" is masculine (der). After "haben" it is accusative, so ein → einen.',
  },
  {
    id: 'g3',
    skill: 'grammar',
    topic: 'wordOrder',
    instruction: 'Which sentence is correct?',
    prompt: 'Choose the sentence with the correct word order.',
    options: [
      'Am Montag ich gehe ins Kino.',
      'Am Montag gehe ich ins Kino.',
      'Am Montag ins Kino ich gehe.',
      'Gehe am Montag ich ins Kino.',
    ],
    answer: 'Am Montag gehe ich ins Kino.',
    explanation: 'The verb must be in 2nd place. "Am Montag" is 1st, so "gehe" comes next, then "ich".',
  },
  {
    id: 'g4',
    skill: 'grammar',
    topic: 'negation',
    instruction: 'Choose the missing word.',
    prompt: 'Ich habe ___ Auto. Ich fahre mit dem Bus.',
    options: ['nicht', 'kein', 'keine', 'nein'],
    answer: 'kein',
    explanation: 'Before a noun, use kein. "Auto" is neuter (das), so it is "kein Auto".',
  },
  {
    id: 'g5',
    skill: 'grammar',
    topic: 'modalVerbs',
    instruction: 'Choose the correct verb form.',
    prompt: 'Ich möchte einen Kaffee ___.',
    options: ['trinke', 'trinkst', 'getrunken', 'trinken'],
    answer: 'trinken',
    explanation: 'After a modal verb (möchte), the second verb goes to the end in its basic form: trinken.',
  },

  // ── READING ───────────────────────────────────────────────
  {
    id: 'r1',
    skill: 'reading',
    topic: 'readingMessages',
    passage: 'email',
    instruction: 'Read the email and answer.',
    prompt: 'Wann ist die Party?',
    options: ['Am Donnerstag um 19 Uhr', 'Am Samstag um 9 Uhr', 'Am Samstag um 19 Uhr', 'Am Sonntag um 19 Uhr'],
    answer: 'Am Samstag um 19 Uhr',
    explanation: 'Lukas writes: "am Samstag … um 19 Uhr". Donnerstag is the reply deadline, not the party.',
  },
  {
    id: 'r2',
    skill: 'reading',
    topic: 'readingMessages',
    passage: 'email',
    instruction: 'Read the email and answer.',
    prompt: 'Was soll Anna mitbringen?',
    options: ['Getränke', 'Einen Salat', 'Einen Kuchen', 'Nichts'],
    answer: 'Einen Salat',
    explanation: 'Lukas asks: "Kannst du bitte einen Salat mitbringen?" He already has drinks (Getränke).',
  },
  {
    id: 'r3',
    skill: 'reading',
    topic: 'readingMessages',
    passage: 'email',
    instruction: 'Read the email and answer.',
    prompt: 'Bis wann soll Anna antworten?',
    options: ['Bis Samstag', 'Bis Freitag', 'Heute', 'Bis Donnerstag'],
    answer: 'Bis Donnerstag',
    explanation: '"Bitte antworte mir bis Donnerstag" = please reply by Thursday.',
  },
  {
    id: 'r4',
    skill: 'reading',
    topic: 'readingNotices',
    passage: 'doctor',
    instruction: 'Read the sign and answer.',
    prompt: 'Es ist Dienstag, 16 Uhr. Ist die Praxis offen?',
    options: [
      'Ja, sie ist offen.',
      'Nein, sie ist nur vormittags offen.',
      'Nein, dienstags ist sie geschlossen.',
      'Nein, nur am Telefon.',
    ],
    answer: 'Ja, sie ist offen.',
    explanation: 'On Tuesday and Thursday the practice is "auch 15–18 Uhr" open — so at 16 Uhr it is open.',
  },
  {
    id: 'r5',
    skill: 'reading',
    topic: 'readingNotices',
    passage: 'doctor',
    instruction: 'Read the sign and answer.',
    prompt: 'Wie bekommt man einen Termin?',
    options: ['Per E-Mail', 'Ohne Termin, einfach kommen', 'Am Telefon', 'Im Internet'],
    answer: 'Am Telefon',
    explanation: '"Termine bitte nur am Telefon" = appointments only by phone.',
  },
]
