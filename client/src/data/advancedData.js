function secureHash(seq) {
    let a = seq;
    a = (a ^ 61) ^ (a >> 16);
    a = a + (a << 3);
    a = a ^ (a >> 4);
    a = a * 0x27d4eb2d;
    a = a ^ (a >> 15);
    return Math.abs(a);
}

export const getSpeakingSentences = () => {
    const list = [];
    const subjects = ["The manager", "My friend and I", "Our software team", "The local bakery", "An unexpected storm", "The new CEO", "My next-door neighbor", "A mysterious stranger", "The entire internet community", "An ancient philosopher", "The rookie astronaut", "Our regional director"];
    const actions = ["completely destroyed", "successfully completed", "eagerly anticipated", "strongly recommended", "immediately halted", "silently observed", "passionately defended", "accidentally deleted", "thoroughly investigated", "reluctantly accepted", "drastically altered", "partially misunderstood"];
    const objects = ["the entire project roadmap", "a freshly baked chocolate cake", "the annual financial report", "a sudden shift in weather", "the new marketing campaign", "a top secret government file", "the only remaining escape route", "a highly controversial theory", "the central city power grid", "a rare antique painting", "the main satellite link", "an international peace treaty"];
    const times = ["before the deadline.", "despite severe delays.", "during the morning meeting.", "without any prior warning.", "in record breaking time.", "right in front of everyone.", "while the world watched.", "because of a tiny error.", "after years of strict preparation.", "with absolute flawless precision.", "shortly after midnight.", "under extremely suspicious circumstances."];
    const adverbs = ["Furthermore,", "Consequently,", "Interestingly,", "To our surprise,", "Shockingly,", "In a bizarre turn of events,", "As expected,", "Without a single doubt,", "Technically speaking,", "Against all mathematical odds,"];

    for(let i=0; i<5000; i++) {
        let subjIndex = secureHash(i * 10 + 1) % subjects.length;
        let actIndex = secureHash(i * 10 + 2) % actions.length;
        let objIndex = secureHash(i * 10 + 3) % objects.length;
        let timeIndex = secureHash(i * 10 + 4) % times.length;
        let advIndex = secureHash(i * 10 + 5) % adverbs.length;
        
        let adv = (i % 2 === 0) ? `${adverbs[advIndex]} ` : "";
        let text = `${adv}${subjects[subjIndex]} ${actions[actIndex]} ${objects[objIndex]} ${times[timeIndex]}`;
        
        list.push({
            id: i + 1,
            level: i < 1500 ? "Beginner" : i < 3500 ? "Intermediate" : "Advanced",
            text: text
        });
    }

    const manual = [
        "How much does a round trip ticket cost?",
        "Could you please speak a little bit slower?",
        "I am looking forward to our meeting next week.",
        "The quick brown fox jumps over the lazy dog.",
        "To be completely honest, I disagree with that approach."
    ];
    return [...manual.map((m, i) => ({ id: 9000+i, text: m, level: "Universal"})), ...list].slice(0, 5000);
};

export const getListeningStories = () => {
    const stories = [];
    const names = ["Arthur", "Samantha", "Dr. Jenkins", "Captain Reynolds", "Little Timmy", "Agent 47", "Professor Oak", "A brave knight", "The quiet librarian", "A reckless hacker", "Detective Miller", "Chef Gordon", "Sergeant Cole"];
    const locations = ["an abandoned spaceship", "a heavily guarded museum", "a crowded underground train", "a mysterious snowy forest", "a highly advanced scientific laboratory", "a bustling medieval market", "a silent underwater submarine", "a haunted Victorian mansion", "a chaotic Wall Street floor", "a peaceful mountain monastery", "a classified desert base", "a luxurious grand hotel"];
    const events = ["discovered a glowing green artifact", "accidentally spilled a highly explosive chemical", "noticed a shadowy figure following them", "found a briefcase containing a million dollars", "realized the pilot was totally unconscious", "stumbled upon an ancient forbidden spellbook", "hacked into the planetary defense grid", "witnessed a ghost walking through walls", "uncovered a massive corporate conspiracy", "found a map leading to lost treasure", "triggered a deadly hidden trap", "intercepted a highly encrypted radio transmission"];
    const reactions = ["immediately called the authorities", "decided to keep it an absolute secret", "ran away in complete terror", "tried to fix the situation using duct tape", "fainted right on the spot", "grabbed a weapon and charged forward", "started aggressively typing on a keyboard", "hid inside a nearby closet", "sold the information to the highest bidder", "started laughing uncontrollably", "attempted to negotiate for a higher price", "froze completely in sheer panic"];
    const results = ["and became a local hero.", "but ended up getting arrested.", "which triggered a massive alien invasion.", "and was never seen or heard from again.", "leading to a massive promotion at work.", "and accidentally blew up the entire building.", "which saved the world from total destruction.", "but woke up realizing it was all a realistic simulation.", "and was crowned the ultimate champion.", "which completely crashed the global stock market.", "resulting in a massive cover-up operation.", "but secretly cloned the object for later use."];

    for(let i=0; i<5000; i++) {
        // Chaotic deterministic hashing ensures wildly different array pulls for consecutive inputs
        let nIndex = secureHash(i * 7 + 1) % names.length;
        let lIndex = secureHash(i * 7 + 2) % locations.length;
        let eIndex = secureHash(i * 7 + 3) % events.length;
        let rIndex = secureHash(i * 7 + 4) % reactions.length;
        let resIndex = secureHash(i * 7 + 5) % results.length;

        let char = names[nIndex];
        let loc = locations[lIndex];
        let event = events[eIndex];
        let action = reactions[rIndex];
        let end = results[resIndex];

        let extDelay = (i % 3 === 0) ? "After hesitating for exactly three minutes, " : (i % 4 === 0) ? "Acting completely on pure adrenaline, " : "";

        // Push distractors dynamically shifted
        let charDistractors = [names[(nIndex+1)%names.length], names[(nIndex+2)%names.length], names[(nIndex+3)%names.length]];
        let locDistractors = [locations[(lIndex+1)%locations.length], locations[(lIndex+2)%locations.length], locations[(lIndex+3)%locations.length]];
        let eventDistractors = [events[(eIndex+1)%events.length], events[(eIndex+2)%events.length], events[(eIndex+3)%events.length]];
        let reactionDistractors = [reactions[(rIndex+1)%reactions.length], reactions[(rIndex+2)%reactions.length], reactions[(rIndex+3)%reactions.length]];
        let endDistractors = [results[(resIndex+1)%results.length].replace('.',''), results[(resIndex+2)%results.length].replace('.',''), results[(resIndex+3)%results.length].replace('.','')];

        let storyText = `One completely unexpected Tuesday morning, ${char} was actively navigating through ${loc}. Suddenly, they explicitly ${event}. ${extDelay}Shocked by this unprecedented occurrence, they ${action}, ${end}`;
        
        stories.push({
            id: i + 1,
            title: `Generative File Record #${10100 + i}`,
            text: storyText,
            questions: [
                { q: "1. Who is the primary subject in this narrative?", options: [char, charDistractors[0], charDistractors[1]].sort(() => Math.random() - 0.5), ans: char },
                { q: "2. Determine the precise location where this incident occurred:", options: [loc, locDistractors[0], locDistractors[1]].sort(() => Math.random() - 0.5), ans: loc },
                { q: "3. What specific catalyst or sudden event triggered the plot?", options: [event, eventDistractors[0], eventDistractors[1]].sort(() => Math.random() - 0.5), ans: event },
                { q: "4. Identify the character's immediate reactionary response:", options: [action, reactionDistractors[0], reactionDistractors[1]].sort(() => Math.random() - 0.5), ans: action },
                { q: "5. What was the absolute final consequence of the interaction?", options: [end.replace('.',''), endDistractors[0], endDistractors[1]].sort(() => Math.random() - 0.5), ans: end.replace('.','') }
            ]
        });
    }
    return stories;
};

export const getScenarios = () => {
    const list = [];
    const settings = [
        { name: "Luxury Hotel Reception", politeReq: "Could I get extra towels and a late checkout?", rudeReq: "This room absolutely filthy! Call management!", issue: "a broken AC flooding the floor", dIssue1: "no hot water in the shower", dIssue2: "a noisy VIP neighbor", dReq1: "I want breakfast delivered.", dReq2: "Where is the spa center?" },
        { name: "International Airport Security", politeReq: "Do I need to take my laptop out completely?", rudeReq: "Why are you illegally searching my private bag?", issue: "confiscated prohibited liquid", dIssue1: "a missing boarding pass", dIssue2: "a violently delayed heavy flight", dReq1: "Where is the business lounge?", dReq2: "I missed my connection flight." },
        { name: "Supermarket Checkout Station", politeReq: "Where can I find the organic eggs?", rudeReq: "These inflated prices are a total joke!", issue: "a digital payment card failing twice", dIssue1: "milk that expired last week", dIssue2: "a massively broken plastic bag", dReq1: "Do you have fresh apples?", dReq2: "I need to speak to the cashier manager." },
        { name: "Regional Hospital Emergency", politeReq: "Where is the quiet waiting room?", rudeReq: "I demand a doctor right this second!", issue: "an intensely sharp stomach pain", dIssue1: "a fractured left arm", dIssue2: "a severe fever tracking 104 degrees", dReq1: "I need heavy bandages.", dReq2: "Where is the emergency pharmacy?" },
        { name: "Central Corporate Bank", politeReq: "I would like to make an international deposit.", rudeReq: "Your ridiculous fees are stealing my money!", issue: "a completely frozen offshore account", dIssue1: "a highly suspicious lost credit card", dIssue2: "a forged fake check", dReq1: "I need an massive business loan.", dReq2: "Open a joint checking account." },
        { name: "Local Mechanic Garage", politeReq: "Could you thoroughly check my brakes?", rudeReq: "You entirely ruined my transmission!", issue: "a critically blown engine cylinder", dIssue1: "a completely flat rear tire", dIssue2: "a deeply cracked front windshield", dReq1: "Perform a synthetic oil change.", dReq2: "Wash and wax the exterior." },
        { name: "University Campus Library", politeReq: "Where is the advanced physics section?", rudeReq: "Stop enforcing these ridiculous late fees!", issue: "a massively overdue textbook fine", dIssue1: "a stolen laptop charger", dIssue2: "a loudly talking student group", dReq1: "I need an archival password.", dReq2: "Where is the quiet study hall?" },
        { name: "City Public Transport", politeReq: "Does this bus go entirely downtown?", rudeReq: "Drive faster, I'm going to be completely late!", issue: "a broken transit ticket machine", dIssue1: "a severely delayed express train", dIssue2: "a suspiciously abandoned backpack", dReq1: "Where is the transfer station?", dReq2: "I lost my transit pass completely." }
    ];

    for(let i=0; i<5000; i++) {
        let sid = secureHash(i * 11 + 1) % settings.length;
        let sData = settings[sid];
        let place = sData.name;
        
        let isProblem = secureHash(i * 11 + 2) % 2 === 0;
        let modIndex = secureHash(i * 11 + 3);
        let emotionMod = (modIndex % 3 === 0) ? "highly agitated" : (modIndex % 4 === 0) ? "calm but rushed" : "completely standard";
        let min = secureHash(i * 11 + 4) % 60;
        let hr = (secureHash(i * 11 + 5) % 12) + 1;
        let timeLabel = `0${hr}:${min < 10 ? '0': ''}${min} ${secureHash(i * 11 + 6)%2===0?'AM':'PM'}`;

        let sc = {
            id: i + 1,
            icon: "🌍",
            title: `Generative Sim Log #${8000 + i}`,
            description: isProblem ? `Handling a severe, stressful emergency simulation involving ${sData.issue} at the ${place} during ${timeLabel}.` : `Executing a highly standard semantic interaction at the ${place}. Subject is ${emotionMod}.`,
            phrases: [
                "Good afternoon, how can I systematically help?",
                isProblem ? sData.rudeReq : sData.politeReq,
                "Could you please expedite this process?",
                "Here is my authenticated documentation."
            ],
            dialogue: [
                { speaker: "Simulated Staff", text: `Welcome to the ${place}. Can I assist you with an operation today?` },
                { speaker: "You (Subject)", text: isProblem ? `Yes! I have a massive problem occurring right now. It directly involves ${sData.issue}.` : `Hi there. ${sData.politeReq}` },
                { speaker: "Simulated Staff", text: isProblem ? `I understand you're frustrated by this. Let me aggressively look into this ${sData.issue} right away.` : `Of course, let me process that precise request for you immediately.` },
                { speaker: "You (Subject)", text: isProblem ? `Thank you, I absolutely cannot afford another delay.` : `Thank you, I appreciate the massive efficiency.` }
            ],
            quizzes: [
                {
                    q: `1. Define the fundamental semantic constraint of this AI simulation log:`,
                    options: [
                        isProblem ? `Mitigating an active crisis regarding ${sData.issue}.` : `Executing a polite conversational loop about ${sData.politeReq}.`,
                        isProblem ? `Reporting ${sData.dIssue1} aggressively.` : `Inquiring loudly about ${sData.dReq1}.`,
                        isProblem ? `Filing a legal complaint about ${sData.dIssue2}.` : `Validating operational status regarding ${sData.dReq2}.`
                    ].sort(() => Math.random() - 0.5),
                    ans: isProblem ? `Mitigating an active crisis regarding ${sData.issue}.` : `Executing a polite conversational loop about ${sData.politeReq}.`
                },
                {
                    q: `2. Identify the exact emotional syntax applied by the subject (You):`,
                    options: [
                        isProblem ? `Highly confrontational and disruptive.` : `Civil, standard, and highly polite.`,
                        `Speaking entirely in a foreign language.`,
                        `Crying uncontrollably without making sense.`
                    ].sort(() => Math.random() - 0.5),
                    ans: isProblem ? `Highly confrontational and disruptive.` : `Civil, standard, and highly polite.`
                },
                {
                    q: `3. Analyze the precise statement inputted by the subject in this scenario:`,
                    options: [
                        isProblem ? `Yes! I have a massive problem occurring right now.` : sData.politeReq,
                        isProblem ? `Fix this absolute disaster before I sue!` : sData.dReq1,
                        isProblem ? `I demand the CEO immediately!` : sData.dReq2
                    ].sort(() => Math.random() - 0.5),
                    ans: isProblem ? `Yes! I have a massive problem occurring right now.` : sData.politeReq
                },
                {
                    q: `4. How does the simulated staff dynamically resolve the input parameter?`,
                    options: [
                        isProblem ? `They attempt de-escalation by actively looking into the ${sData.issue}.` : `They agree efficiently and process the requirement.`,
                        isProblem ? `They completely ignore the syntax line.` : `They immediately reject the input parameters.`,
                        isProblem ? `They initiate a lockdown scenario.` : `They demand immediate monetary compensation.`
                    ].sort(() => Math.random() - 0.5),
                    ans: isProblem ? `They attempt de-escalation by actively looking into the ${sData.issue}.` : `They agree efficiently and process the requirement.`
                }
            ]
        };
        list.push(sc);
    }
    return list;
};
