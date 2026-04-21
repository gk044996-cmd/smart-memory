const generateQuestions = () => {
    const subjects = ["John", "Sarah", "The manager", "The teacher", "My sister", "The team", "Our company", "The children", "Alice", "David"];
    const actions = [
        { base: "work", past: "worked", perfect: "worked", cont: "working", prep: "at the office" },
        { base: "study", past: "studied", perfect: "studied", cont: "studying", prep: "for the exam" },
        { base: "eat", past: "ate", perfect: "eaten", cont: "eating", prep: "lunch" },
        { base: "write", past: "wrote", perfect: "written", cont: "writing", prep: "a report" },
        { base: "drive", past: "drove", perfect: "driven", cont: "driving", prep: "to the city" },
        { base: "read", past: "read", perfect: "read", cont: "reading", prep: "a long book" },
        { base: "play", past: "played", perfect: "played", cont: "playing", prep: "football" },
        { base: "build", past: "built", perfect: "built", cont: "building", prep: "a new software" },
        { base: "sing", past: "sang", perfect: "sung", cont: "singing", prep: "a song" },
        { base: "speak", past: "spoke", perfect: "spoken", cont: "speaking", prep: "to the audience" }
    ];

    let questions = [];

    // 1. Present Simple (Habits)
    subjects.forEach((sub, i) => {
        actions.forEach((act, j) => {
            const isPlural = sub.includes("children") || sub.includes("team") && j % 2 === 0;
            const verbSimple = isPlural ? act.base : act.base.endsWith('y') ? act.base.slice(0, -1) + 'ies' : act.base + 's';
            const wrongSimple1 = isPlural ? act.base + 's' : act.base;
            const wrongSimple2 = act.cont;
            const wrongSimple3 = "is " + act.base;

            questions.push({
                question: `${sub} ___ ${act.prep} every single day.`,
                options: [verbSimple, wrongSimple1, wrongSimple2, wrongSimple3].sort(() => Math.random() - 0.5),
                answer: verbSimple,
                explanation: `Because the sentence uses 'every single day', it shows a habit so we use the Present Simple tense. The subject dictates whether we add an 's' to the verb.`
            });

            // 2. Past Simple
            questions.push({
                question: `${sub} ___ ${act.prep} exactly two days ago.`,
                options: [act.past, act.perfect, `has ${act.past}`, `was ${act.base}`].sort(() => Math.random() - 0.5),
                answer: act.past,
                explanation: `The phrase 'two days ago' requires the Past Simple tense. Therefore, '${act.past}' is the only correct form.`
            });

            // 3. Present Perfect
            questions.push({
                question: `${sub} ___ already ___ ${act.prep}.`,
                options: [
                    `${isPlural ? 'have' : 'has'} --- ${act.perfect}`,
                    `${isPlural ? 'has' : 'have'} --- ${act.perfect}`,
                    `is --- ${act.cont}`,
                    `was --- ${act.past}`
                ].sort(() => Math.random() - 0.5),
                answer: `${isPlural ? 'have' : 'has'} --- ${act.perfect}`,
                explanation: `The word 'already' implies an action completed at an unspecified time before now, requiring the Present Perfect tense (have/has + past participle).`
            });

            // 4. Future Continuous
            questions.push({
                question: `At 8 PM tomorrow, ${sub} ___ ${act.prep}.`,
                options: [
                    `will be ${act.cont}`,
                    `will ${act.base}`,
                    `is ${act.cont}`,
                    `was ${act.cont}`
                ].sort(() => Math.random() - 0.5),
                answer: `will be ${act.cont}`,
                explanation: `A specific projected time in the future ('At 8 PM tomorrow') requires the Future Continuous tense to show an ongoing action at that time.`
            });

            // 5. Mixed Prepositions logic using actions to bulk up
            if (i % 2 === 0) {
                questions.push({
                    question: `I am incredibly interested ___ ${act.cont} ${act.prep}.`,
                    options: ["in", "on", "at", "about"].sort(() => Math.random() - 0.5),
                    answer: "in",
                    explanation: `The adjective 'interested' must always be followed by the preposition 'in'.`
                });
            }
        });
    });

    // Manually add some pure grammar classics to ensure variety
    const classics = [
        { question: "If I ___ you, I would apologize immediately.", options: ["was", "were", "am", "have been"], answer: "were", explanation: "In the Second Conditional for hypothetical situations, formal grammar requires 'were' for all subjects (If I were you)." },
        { question: "She is looking forward ___ you next week.", options: ["to see", "seeing", "to seeing", "see"], answer: "to seeing", explanation: "The phrase 'looking forward to' requires a gerund (verb-ing). Here, 'to' is a preposition, not an infinitive." },
        { question: "Neither the manager nor the employees ___ aware of the issue.", options: ["was", "were", "is", "has been"], answer: "were", explanation: "When using 'neither... nor...', the verb always agrees with the noun strictly closest to it (employees -> were)." },
        { question: "By the time we arrive, the movie ___.", options: ["will start", "started", "will have started", "is starting"], answer: "will have started", explanation: "An action completing before a point in the future requires the Future Perfect tense." }
    ];

    questions = [...questions, ...classics];

    // Shuffle the entire final array
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }

    return questions;
};

const allQuestions = generateQuestions();
let usedIndex = 0;

export const getNextQuestion = () => {
    if (usedIndex >= allQuestions.length) {
        usedIndex = 0; // Restart array if they exceed 400 questions!
    }
    const q = allQuestions[usedIndex];
    usedIndex++;
    return q;
};
