import { useState, useMemo } from "react";
import { getScenarios } from "../data/advancedData";

const Scenarios = () => {
    const scenarios = useMemo(() => getScenarios(), []);

    const [activeScenario, setActiveScenario] = useState(() => {
        let p = parseInt(localStorage.getItem('coach_scenarios') || '0');
        return scenarios[p % scenarios.length];
    });
    const [answers, setAnswers] = useState({});

    const handleAnswer = (qIndex, option) => {
        setAnswers({ ...answers, [qIndex]: option });
    };

    const handleNext = () => {
        let p = parseInt(localStorage.getItem('coach_scenarios') || '0');
        localStorage.setItem('coach_scenarios', p + 1);

        const currentIndex = scenarios.findIndex(s => s.id === activeScenario.id);
        if (currentIndex < scenarios.length - 1) {
            setActiveScenario(scenarios[currentIndex + 1]);
            setAnswers({});
        }
    };

    return (
        <div className="app-container">
            <main className="main-content flex gap-6 animate-fade-in" style={{ padding: "0 2rem", marginTop: "2rem", maxWidth: "1400px" }}>
                
                {/* Scenario Navigation Sidebar (Grid for 50 items) */}
                <aside className="glass-panel" style={{ width: "340px", flexShrink: 0, padding: "1.5rem 1rem", height: "calc(100vh - 120px)", overflowY: "auto", position: "sticky", top: "100px" }}>
                    <h2 style={{ fontSize: "1.2rem", marginBottom: "1.5rem", paddingLeft: "0.5rem" }}>🌍 Real-Life Scenarios</h2>
                    
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {scenarios.map(sc => {
                            const isActive = activeScenario.id === sc.id;
                            return (
                                <li key={sc.id}>
                                    <button 
                                        onClick={() => { setActiveScenario(sc); setAnswers({}); }}
                                        style={{
                                            width: "100%", textAlign: "left", padding: "0.8rem",
                                            background: isActive ? "rgba(16, 185, 129, 0.15)" : "transparent",
                                            border: "none", borderLeft: `4px solid ${isActive ? "var(--success)" : "transparent"}`,
                                            color: isActive ? "white" : "var(--text-main)", cursor: "pointer", fontSize: "0.95rem",
                                            borderRadius: "0 8px 8px 0", transition: "all 0.2s", display: "flex", alignItems: "center", gap: "0.5rem"
                                        }}
                                        onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
                                        onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
                                    >
                                        <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>{sc.icon}</span> 
                                        <span style={{ fontWeight: isActive ? "bold" : "normal", flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{sc.title}</span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </aside>

                {/* Content Panel */}
                <section className="glass-panel animate-slide-right" style={{ flex: 1, height: "calc(100vh - 120px)", overflowY: "auto" }}>
                    <div style={{ marginBottom: "2.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                            <h1 style={{ fontSize: "2.5rem", color: "var(--success)", display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
                                {activeScenario.icon} {activeScenario.title}
                            </h1>
                            <p style={{ fontSize: "1.2rem", color: "var(--text-muted)", margin: 0 }}>{activeScenario.description}</p>
                        </div>
                        <button className="btn btn-secondary" onClick={handleNext} style={{ borderColor: "var(--success)", color: "var(--success)" }}>
                            Next Scenario →
                        </button>
                    </div>

                    <div style={{ marginBottom: "2.5rem" }}>
                        <h3 style={{ textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1rem" }}>Must-Know Phrases</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                            {activeScenario.phrases.map((ph, i) => (
                                <div key={i} style={{ background: "rgba(255,255,255,0.03)", padding: "1rem", borderRadius: "8px", border: "1px solid var(--border)", fontSize: "1.1rem" }}>
                                    "{ph}"
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginBottom: "3rem" }}>
                        <h3 style={{ textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1rem" }}>Dialogue Simulation</h3>
                        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.5rem" }}>
                            {activeScenario.dialogue.map((line, i) => {
                                const isYou = line.speaker === "You";
                                return (
                                    <div key={i} style={{ 
                                        display: "flex", 
                                        flexDirection: "column",
                                        alignItems: isYou ? "flex-end" : "flex-start",
                                        marginBottom: "1rem"
                                    }}>
                                        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.25rem", marginLeft: "0.5rem" }}>{line.speaker}</span>
                                        <div style={{ 
                                            background: isYou ? "var(--primary)" : "rgba(255,255,255,0.1)",
                                            color: "white", padding: "1rem 1.5rem",
                                            borderRadius: isYou ? "20px 20px 0 20px" : "20px 20px 20px 0",
                                            maxWidth: "80%", fontSize: "1.1rem", lineHeight: "1.4"
                                        }}>
                                            {line.text}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div style={{ padding: "2rem", background: "rgba(16, 185, 129, 0.05)", borderRadius: "12px", border: "1px solid var(--success)" }}>
                        <h3 style={{ fontSize: "1.3rem", color: "white", marginBottom: "1.5rem", borderBottom: "1px solid rgba(16,185,129,0.3)", paddingBottom: "1rem" }}>🎯 Scenario Evaluation Quizzes</h3>
                        
                        {activeScenario.quizzes.map((q, qIndex) => (
                            <div key={qIndex} style={{ marginBottom: "2rem" }}>
                                <p style={{ fontSize: "1.1rem", marginBottom: "1rem", fontWeight: "bold" }}>{qIndex + 1}. {q.q}</p>
                                
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                                    {q.options.map((opt, i) => {
                                        let bg = "var(--surface)";
                                        let border = "var(--border)";
                                        const isSelected = answers[qIndex] === opt;
                                        const isCorrect = isSelected && opt === q.ans;
                                        const isWrong = isSelected && opt !== q.ans;

                                        if (isCorrect) { bg = "rgba(16, 185, 129, 0.2)"; border = "var(--success)"; }
                                        if (isWrong) { bg = "rgba(239, 68, 68, 0.2)"; border = "var(--error)"; }
                                        if (answers[qIndex] && opt === q.ans && !isCorrect) {
                                            bg = "rgba(16, 185, 129, 0.05)"; border = "1px dotted var(--success)";
                                        }

                                        return (
                                            <button 
                                                key={i} onClick={() => handleAnswer(qIndex, opt)} disabled={!!answers[qIndex]}
                                                style={{ padding: "1rem", textAlign: "left", background: bg, border: `1px solid ${border}`, color: "white", borderRadius: "8px", fontSize: "1.05rem", cursor: "pointer", transition: "all 0.2s" }}
                                            >
                                                {opt}
                                            </button>
                                        );
                                    })}
                                </div>
                                {answers[qIndex] && (
                                    <div style={{ marginTop: "1rem", color: answers[qIndex] === q.ans ? "var(--success)" : "var(--error)", fontWeight: "bold" }}>
                                        {answers[qIndex] === q.ans ? "✅ Excellent!" : "❌ That's not the correct logic for this situation."}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Scenarios;
