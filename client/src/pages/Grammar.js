import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Grammar = () => {
    const navigate = useNavigate();

    const sections = [
        {
            category: "Basic Grammar",
            topics: [
                { 
                    id: "nouns", 
                    title: "Nouns (Naming Words)", 
                    definition: "A noun is a naming word. It names a person, place, thing, or concept.",
                    formula: "[Article: a/an/the] + [Adjective] + [Noun]",
                    examples: [
                        "The *dog* barks out loud.", 
                        "She truly loves listening to *music*.",
                        "His *happiness* was obvious."
                    ],
                    proTip: "If you can put 'a', 'an', or 'the' before a word, it's almost always a noun!",
                    beginner: "Nouns are the building blocks of sentences. They tell people *what* or *who* you are talking about. Think of them as labels on boxes.",
                    intermediate: "Nouns can be countable (things you can count: one 'apple', two 'apples') or uncountable (things you can't count: 'water', 'music').",
                    advanced: "Abstract nouns refer to ideas or concepts (e.g., 'freedom', 'anger'). Collective nouns refer to groups (e.g., 'a *flock* of birds'). Generally, uncountable nouns take singular verbs.",
                    commonMistakes: [
                        { wrong: "I need some informations.", right: "I need some information.", why: "'Information' is uncountable, so it never takes an 's'." }
                    ],
                    practiceQ: { text: "Which word is the noun in: 'The happy cat slept.'", options: ["The", "happy", "cat", "slept"], answer: "cat" }
                },
                { 
                    id: "pronouns", 
                    title: "Pronouns (Replacements)", 
                    definition: "A pronoun is used in place of a noun so you don't have to keep repeating the same name over and over.",
                    formula: "[Pronoun] + [Verb] + [Object Pronoun]",
                    examples: [
                        "John is tall. *He* plays basketball daily.", 
                        "Mary and Paul are late. *They* missed the train.",
                        "This coffee is strictly for *me*."
                    ],
                    proTip: "Without pronouns, you'd sound like a robot: 'John went to John's house because John forgot John's keys.'",
                    beginner: "Subject Pronouns (I, you, he, she, it, we, they) perform actions. Example: *He* runs.",
                    intermediate: "Object Pronouns (me, you, him, her, it, us, them) receive the action. Example: The dog bit *him*.",
                    advanced: "Reflexive pronouns (myself, yourself) reflect the action back. Example: 'I will do it *myself*.' Use 'whose' for possession (The man *whose* car was stolen).",
                    commonMistakes: [
                        { wrong: "Me and him went to the store.", right: "He and I went to the store.", why: "You must use Subject Pronouns (He, I) when they are doing the action (going to the store)." }
                    ],
                    practiceQ: { text: "Choose the correct pronoun: '___ is my best friend.'", options: ["Him", "He", "Us", "Them"], answer: "He" }
                },
                { 
                    id: "verbs", 
                    title: "Verbs (Action Words)", 
                    definition: "A verb is an action word or a word that shows a state of being.",
                    formula: "[Subject] + [Verb] + [Object]",
                    examples: [
                        "I *run* every morning before breakfast.", 
                        "She *is* an exceptional doctor.", 
                        "We *have been working* actively."
                    ],
                    proTip: "Every single complete sentence MUST have at least one verb. It is the engine of the sentence.",
                    beginner: "Action verbs are things you can manually do (jump, eat, sleep). State verbs show how things are right now (am, is, are, seem).",
                    intermediate: "Verbs change their form (tense) to show *when* something happened: happening now (am playing), happened in the past (played).",
                    advanced: "Modal verbs (can, could, should, must, might) attach to the main verb, completely altering its meaning to show ability, permission, or obligation.",
                    commonMistakes: [
                        { wrong: "She can sings very well.", right: "She can sing very well.", why: "After a modal verb like 'can' or 'must', the main verb must always be strictly base form without any 's'." }
                    ],
                    practiceQ: { text: "Identify the verb: 'She sings beautifully.'", options: ["She", "sings", "beautifully", "None"], answer: "sings" }
                }
            ]
        },
        {
            category: "Tenses",
            topics: [
                { 
                    id: "present-simple", 
                    title: "Present Simple (Routines)", 
                    definition: "Used to describe habits, daily routines, general truths, and fixed schedules.",
                    formula: "Subject + Verb(s/es) + Object",
                    examples: [
                        "I *drink* two cups of coffee every day.", 
                        "Water *boils* exactly at 100 degrees Celsius.", 
                        "The main train *leaves* at 8 PM tonight."
                    ],
                    proTip: "Don't forget the 's' for he/she/it! (I play -> He play*s*)",
                    beginner: "Use this tense for daily routines. 'I wake up, I brush my teeth, I go to work.' Use words like 'usually' or 'always'.",
                    intermediate: "We use auxiliary verbs 'do/does' for questions and negatives. 'Do you like tea?' 'She does not (doesn't) like tea.'",
                    advanced: "It can also be used for future scheduled events officially: 'The flight arrives tomorrow morning at 6 AM.'",
                    commonMistakes: [
                        { wrong: "He don't like pizza.", right: "He doesn't like pizza.", why: "'He', 'She', and 'It' require 'does/doesn't', not 'do/don't'." }
                    ],
                    practiceQ: { text: "Correct the sentence: 'He don't like pizza.'", options: ["He doesn't likes pizza", "He not like pizza", "He doesn't like pizza", "He don't likes pizza"], answer: "He doesn't like pizza" }
                },
                { 
                    id: "past-simple", 
                    title: "Past Simple (Finished Actions)", 
                    definition: "Used for actions that started and completely finished at a specific time in the past.",
                    formula: "Subject + Verb(ed/Irregular Past) + Object",
                    examples: [
                        "I *visited* Paris with my family last year.", 
                        "She *didn't go* to the party because she was sick.", 
                        "Abraham Lincoln *abolished* slavery."
                    ],
                    proTip: "Keywords you will often see with Past Simple: yesterday, last week, ago, in 1990.",
                    beginner: "To make regular verbs past tense, just add '-ed' (play -> played, watch -> watched).",
                    intermediate: "Many English verbs are irregular and completely change form (go -> went, see -> saw, buy -> bought). You simply must memorize these.",
                    advanced: "In questions and negatives with 'did/didn't', the main verb goes back to its base infinitive form. 'Did you *go*?' (NEVER say 'Did you went?').",
                    commonMistakes: [
                        { wrong: "I didn't went to the store.", right: "I didn't go to the store.", why: "Because 'didn't' already shows the past tense, the main verb reverts to its original root form." }
                    ],
                    practiceQ: { text: "Which is correct?", options: ["I buyed a car.", "I bought a car.", "I have bought a car last week.", "I did bought a car."], answer: "I bought a car." }
                },
                { 
                    id: "future-simple", 
                    title: "Future Simple (Predictions)", 
                    definition: "Used for predictions, promises, or spontaneous decisions about the future.",
                    formula: "Subject + will + Verb (base form)",
                    examples: [
                        "I *will help* you with those heavy bags.", 
                        "It *will probably rain* heavily tomorrow.", 
                        "I *won't tell* anyone your secret, I promise."
                    ],
                    proTip: "Use 'will' for quick decisions made right now. Use 'going to' for plans you already made before.",
                    beginner: "Just use 'will' + the base verb. 'I will eat', 'She will run'. Remember 'will' does not change form.",
                    intermediate: "We often contract 'will' to ''ll' in spoken English: 'I'll', 'She'll', 'They'll'. The negative is 'will not' or 'won't'.",
                    advanced: "For future predictions based on concrete present evidence, 'going to' is strongly preferred over 'will'. 'Look at those dark clouds, it's *going to* rain!'",
                    commonMistakes: [
                        { wrong: "I will to see you tomorrow.", right: "I will see you tomorrow.", why: "Never use 'to' after 'will'. 'Will' immediately connects to the base verb directly." }
                    ],
                    practiceQ: { text: "A: The phone is ringing. B: I ____ answer it.", options: ["will", "am going to", "answer", "will answering"], answer: "will" }
                }
            ]
        },
        {
            category: "Advanced",
            topics: [
                { 
                    id: "conditionals", 
                    title: "Conditionals (If... Then...)", 
                    definition: "Sentences that describe the result of something that might happen or might have happened but didn't.",
                    formula: "If + [Condition Clause], [Result Clause]",
                    examples: [
                        "Zero: If you *heat* ice, it *melts*.", 
                        "First: If it *rains* tomorrow, I *will stay* home.", 
                        "Second: If I *won* the lottery, I *would buy* a massive boat."
                    ],
                    proTip: "Conditionals always have two parts: the 'If' clause and the main clause. You can swap their order!",
                    beginner: "Zero conditional is for basic scientific facts or routines. 'If' + present, present. (If I am tired, I sleep).",
                    intermediate: "First conditional is for real future possibilities (If you study -> will pass). Second conditional is for imaginary present/future situations (If I was rich -> would travel).",
                    advanced: "Third conditional is specifically for past regrets that are strictly impossible now. 'If' + past perfect, 'would have' + past participle. (If I had known, I would have helped you).",
                    commonMistakes: [
                        { wrong: "If I will see him, I will tell him.", right: "If I see him, I will tell him.", why: "We never use 'will' directly inside the 'If' half of the sentence in basic conditionals." }
                    ],
                    practiceQ: { text: "If it rains tomorrow, we ___ at home.", options: ["stay", "will stay", "would stay", "would have stayed"], answer: "will stay" }
                },
                { 
                    id: "passive-voice", 
                    title: "Passive Voice (Object Focus)", 
                    definition: "A sentence where the subject receives the action rather than doing it. Used when the 'doer' is unknown or unimportant.",
                    formula: "Object + to be (conjugated) + Past Participle (V3)",
                    examples: [
                        "Active: The dog bit the man.", 
                        "Passive: The man *was bitten* by the dog.", 
                        "The historic house *was built* entirely in 1990."
                    ],
                    proTip: "Use the passive to sound neutral, scientific, or when hiding blame (e.g., 'Mistakes were made').",
                    beginner: "The structure requires the 'To Be' verb + Past Participle (verb-3). Example: The pizza is eaten.",
                    intermediate: "The 'To Be' verb changes tense based on when the action happened. Present: 'is done'. Past: 'was done'. Future: 'will be done'. Present Continuous: 'is being done'.",
                    advanced: "You can include the 'doer' at the absolute end using 'by'. Sometimes, the passive is overused in formal writing, making it sound very weak.",
                    commonMistakes: [
                        { wrong: "My car was stole yesterday.", right: "My car was stolen yesterday.", why: "Passive voice always requires the 3rd form (Past Participle) of the verb, never the Past Simple form." }
                    ],
                    practiceQ: { text: "Change to passive: 'Someone stole my wallet.'", options: ["My wallet is stolen.", "My wallet was stolen.", "My wallet stolen.", "Someone was stolen."], answer: "My wallet was stolen." }
                }
            ]
        }
    ];

    const [activeTopic, setActiveTopic] = useState(sections[0].topics[0]);
    const [practiceAnswer, setPracticeAnswer] = useState(null);

    const handleTopicChange = (topic) => {
        setActiveTopic(topic);
        setPracticeAnswer(null);
    };

    return (
        <div className="app-container">
            <main className="main-content flex gap-6 animate-fade-in" style={{ padding: "0 2rem", marginTop: "2rem", maxWidth: "1400px" }}>
                
                {/* Sidebar Navigation */}
                <aside className="glass-panel stagger-1" style={{ width: "320px", flexShrink: 0, padding: "1.5rem 1rem", height: "calc(100vh - 120px)", position: "sticky", top: "100px", overflowY: "auto" }}>
                    <h2 style={{ fontSize: "1.2rem", marginBottom: "1.5rem", paddingLeft: "0.5rem" }}>Grammar Curriculum</h2>
                    
                    {sections.map((sec, idx) => (
                        <div key={idx} className="mb-6">
                            <h4 style={{ color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.5rem", paddingLeft: "0.5rem" }}>
                                {sec.category}
                            </h4>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                {sec.topics.map(topic => {
                                    const isActive = activeTopic.id === topic.id;
                                    return (
                                        <li key={topic.id}>
                                            <button 
                                                onClick={() => handleTopicChange(topic)}
                                                style={{
                                                    width: "100%", textAlign: "left", padding: "0.8rem 0.5rem",
                                                    background: isActive ? "rgba(99, 102, 241, 0.15)" : "transparent",
                                                    border: "none", borderLeft: `4px solid ${isActive ? "var(--primary)" : "transparent"}`,
                                                    color: isActive ? "white" : "var(--text-main)",
                                                    cursor: "pointer", fontWeight: isActive ? "600" : "400",
                                                    fontSize: "0.95rem", transition: "all 0.2s ease", borderRadius: "0 8px 8px 0"
                                                }}
                                                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                                                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
                                            >
                                                {topic.title}
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </aside>

                {/* Content Area */}
                <section className="glass-panel stagger-2 animate-slide-right" style={{ flex: 1, height: "calc(100vh - 120px)", overflowY: "auto", position: "relative" }}>
                    <div style={{ marginBottom: "2rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <h1 style={{ fontSize: "2.8rem", marginBottom: "0.5rem", letterSpacing: "-1px" }}>{activeTopic.title}</h1>
                        </div>
                        
                        <p style={{ fontSize: "1.3rem", color: "var(--text-main)", opacity: 0.9, marginBottom: "1.5rem", fontWeight: "300", lineHeight: "1.6" }}>
                            {activeTopic.definition}
                        </p>

                        {/* Visual Grammar Formula block */}
                        {activeTopic.formula && (
                            <div style={{ background: "rgba(139, 92, 246, 0.1)", border: "1px dashed var(--secondary)", padding: "1.2rem", borderRadius: "8px", marginBottom: "2rem", display: "inline-block" }}>
                                <span style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--secondary)", fontWeight: "bold", letterSpacing: "1px", display: "block", marginBottom: "0.5rem" }}>
                                    Structure Formula
                                </span>
                                <span style={{ fontFamily: "monospace", fontSize: "1.2rem", color: "white" }}>
                                    {activeTopic.formula}
                                </span>
                            </div>
                        )}
                        
                        <div style={{ background: "rgba(255,255,255,0.02)", padding: "1.5rem", borderRadius: "12px", border: "1px solid var(--border)", marginBottom: "2rem" }}>
                            <h3 style={{ fontSize: "1rem", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "1rem" }}>Examples in Context</h3>
                            <ul style={{ paddingLeft: "1.5rem", margin: 0 }}>
                                {activeTopic.examples.map((ex, i) => (
                                    <li key={i} style={{ marginBottom: "0.75rem", fontSize: "1.15rem" }} dangerouslySetInnerHTML={{__html: ex.replace(/\*(.*?)\*/g, "<span style='color: var(--primary); font-weight: bold;'>$1</span>")}} />
                                ))}
                            </ul>
                        </div>

                        {/* Common Mistakes Visual Widget */}
                        <div style={{ marginBottom: "2.5rem" }}>
                            <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem", color: "white" }}>⚠️ Common Mistakes Avoidance</h3>
                            {activeTopic.commonMistakes.map((mistake, i) => (
                                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.5rem", background: "var(--surface)", padding: "1.5rem", borderRadius: "12px", border: "1px solid var(--border)" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", color: "var(--error)", textDecoration: "line-through", fontSize: "1.1rem" }}>
                                        <span style={{ fontSize: "1.5rem" }}>❌</span> {mistake.wrong}
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", color: "var(--success)", fontWeight: "bold", fontSize: "1.2rem" }}>
                                        <span style={{ fontSize: "1.5rem" }}>✅</span> {mistake.right}
                                    </div>
                                    <p style={{ marginTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1rem", color: "var(--text-muted)", fontSize: "0.95rem" }}>
                                        <strong style={{ color: "white" }}>Why?</strong> {mistake.why}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div style={{ background: "rgba(16, 185, 129, 0.05)", borderLeft: "4px solid var(--success)", padding: "1.2rem", borderRadius: "0 8px 8px 0", marginBottom: "3rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--success)", fontWeight: "bold", marginBottom: "0.5rem", fontSize: "1.1rem" }}>
                                <span>💡</span> <span>Pro Tip</span>
                            </div>
                            <p style={{ margin: 0, fontSize: "1.05rem" }}>{activeTopic.proTip}</p>
                        </div>

                        <h3 style={{ fontSize: "1.6rem", marginBottom: "1.5rem" }}>Step-by-Step Deep Dive</h3>
                        
                        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "3rem" }}>
                            <div className="glass-panel" style={{ padding: "1.5rem", borderLeft: "4px solid var(--success)" }}>
                                <span className="badge badge-success mb-3">Phase 1: Beginner</span>
                                <p style={{ margin: 0, fontSize: "1.1rem" }}>{activeTopic.beginner}</p>
                            </div>
                            <div className="glass-panel" style={{ padding: "1.5rem", borderLeft: "4px solid var(--warning)" }}>
                                <span className="badge badge-warning mb-3">Phase 2: Intermediate</span>
                                <p style={{ margin: 0, fontSize: "1.1rem" }}>{activeTopic.intermediate}</p>
                            </div>
                            <div className="glass-panel" style={{ padding: "1.5rem", borderLeft: "4px solid var(--primary)" }}>
                                <span className="badge badge-primary mb-3">Phase 3: Advanced</span>
                                <p style={{ margin: 0, fontSize: "1.1rem" }}>{activeTopic.advanced}</p>
                            </div>
                        </div>

                        <h3 style={{ fontSize: "1.6rem", marginBottom: "1.2rem" }}>Quick Concept Check</h3>
                        <div className="glass-panel" style={{ padding: "2rem", marginBottom: "2rem", border: "1px solid var(--primary)" }}>
                            <p style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "1.5rem", color: "white" }}>{activeTopic.practiceQ.text}</p>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                                {activeTopic.practiceQ.options.map((opt, i) => {
                                    let btnStyle = { padding: "1rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", color: "white", cursor: "pointer", transition: "all 0.2s", fontSize: "1.05rem", fontWeight: "500" };
                                    if (practiceAnswer === opt) {
                                        if (opt === activeTopic.practiceQ.answer) {
                                            btnStyle.background = "rgba(16, 185, 129, 0.2)"; btnStyle.border = "1px solid var(--success)";
                                        } else {
                                            btnStyle.background = "rgba(239, 68, 68, 0.2)"; btnStyle.border = "1px solid var(--error)";
                                        }
                                    } else if (practiceAnswer && opt === activeTopic.practiceQ.answer) {
                                        // Show correct answer if they got it wrong
                                        btnStyle.background = "rgba(16, 185, 129, 0.1)"; btnStyle.border = "1px solid var(--success)";
                                    }

                                    return (
                                        <button key={i} style={btnStyle} disabled={!!practiceAnswer} onClick={() => setPracticeAnswer(opt)}>
                                            {opt}
                                        </button>
                                    );
                                })}
                            </div>
                            {practiceAnswer && (
                                <div style={{ marginTop: "1.5rem", padding: "1rem", background: practiceAnswer === activeTopic.practiceQ.answer ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)", borderRadius: "8px" }}>
                                    <p style={{ margin: 0, fontWeight: "bold", color: practiceAnswer === activeTopic.practiceQ.answer ? "var(--success)" : "var(--error)" }}>
                                        {practiceAnswer === activeTopic.practiceQ.answer ? "🎉 Correct! You're getting the hang of this." : "Incorrect. Carefully re-read the 'Common Mistakes' section above to understand why!"}
                                    </p>
                                </div>
                            )}
                        </div>

                    </div>

                    <div style={{ marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "1.1rem" }}>Want to test this knowledge dynamically?</p>
                        <button className="btn btn-primary" style={{ fontSize: "1.1rem", padding: "1rem 2rem" }} onClick={() => navigate("/test")}>
                            Jump into AI Exam Room →
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Grammar;