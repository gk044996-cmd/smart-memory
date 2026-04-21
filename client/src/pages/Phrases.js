import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPhraseCategories } from "../data/phrasesData";

const Phrases = () => {
    const navigate = useNavigate();

    const categories = getPhraseCategories();

    const allItems = categories.flatMap(cat => cat.items);

    const [activePhrase, setActivePhrase] = useState(allItems[0]);
    const [practiceAnswer, setPracticeAnswer] = useState(null);

    const currentIndex = allItems.findIndex(i => i.id === activePhrase.id);

    const handleSelect = (phrase) => {
        setActivePhrase(phrase);
        setPracticeAnswer(null);
    };

    const handleNext = () => {
        if (currentIndex < allItems.length - 1) handleSelect(allItems[currentIndex + 1]);
    };

    const handlePrev = () => {
        if (currentIndex > 0) handleSelect(allItems[currentIndex - 1]);
    };

    return (
        <div className="app-container">
            <main className="main-content flex gap-6 animate-fade-in" style={{ padding: "0 2rem", marginTop: "2rem", maxWidth: "1400px" }}>
                
                {/* Sidebar Navigation */}
                <aside className="glass-panel stagger-1" style={{ width: "320px", flexShrink: 0, padding: "1.5rem 1rem", height: "calc(100vh - 120px)", position: "sticky", top: "100px", overflowY: "auto" }}>
                    <h2 style={{ fontSize: "1.2rem", marginBottom: "1.5rem", paddingLeft: "0.5rem" }}>Phrase Modules</h2>
                    
                    {categories.map((cat, idx) => (
                        <div key={idx} className="mb-6">
                            <h4 style={{ color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.5rem", paddingLeft: "0.5rem" }}>
                                {cat.title}
                            </h4>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                {cat.items.map(item => {
                                    const isActive = activePhrase.id === item.id;
                                    return (
                                        <li key={item.id}>
                                            <button 
                                                onClick={() => handleSelect(item)}
                                                style={{
                                                    width: "100%", textAlign: "left", padding: "0.85rem 0.5rem",
                                                    background: isActive ? "rgba(244, 63, 94, 0.15)" : "transparent",
                                                    border: "none", borderLeft: `4px solid ${isActive ? "var(--accent)" : "transparent"}`,
                                                    color: isActive ? "white" : "var(--text-main)",
                                                    cursor: "pointer", fontWeight: isActive ? "600" : "400",
                                                    fontSize: "0.95rem", transition: "all 0.2s ease", borderRadius: "0 8px 8px 0",
                                                    display: "flex", gap: "0.5rem", alignItems: "center"
                                                }}
                                                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                                                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
                                            >
                                                <span>💬</span> <span>{item.phrase}</span>
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
                        
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                            <div>
                                <span className="badge" style={{ background: "rgba(244, 63, 94, 0.15)", color: "var(--accent)" }}>
                                    Phrase Hub
                                </span>
                                <span className="badge ml-2" style={{ marginLeft: "0.5rem", border: `1px solid ${activePhrase.levelColor}`, color: activePhrase.levelColor, background: "transparent" }}>
                                    {activePhrase.level}
                                </span>
                                <span className="badge ml-2" style={{ marginLeft: "0.5rem", background: "rgba(255,255,255,0.1)", color: "white" }}>
                                    🎭 {activePhrase.formality}
                                </span>
                            </div>
                            <div style={{ display: "flex", gap: "0.5rem" }}>
                                <button className="btn btn-secondary" style={{ padding: "0.4rem 1rem", fontSize: "0.9rem" }} onClick={handlePrev} disabled={currentIndex === 0}>← Prev</button>
                                <button className="btn btn-secondary" style={{ padding: "0.4rem 1rem", fontSize: "0.9rem" }} onClick={handleNext} disabled={currentIndex === allItems.length - 1}>Next →</button>
                            </div>
                        </div>
                        
                        <h1 style={{ fontSize: "3.5rem", marginBottom: "0.5rem", color: "var(--accent)", letterSpacing: "-1px" }}>
                            "{activePhrase.phrase}"
                        </h1>
                        <p style={{ color: "var(--primary)", fontWeight: "600", fontSize: "1.2rem", margin: 0 }}>
                            🔊 {activePhrase.pronunciation}
                        </p>
                        
                        <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", width: "100%", margin: "2rem 0" }}></div>
                        
                        <div style={{ padding: "0 0.5rem" }}>
                            
                            {/* Literal Translation / Breakdown Module */}
                            <div style={{ background: "rgba(99, 102, 241, 0.08)", border: "1px solid rgba(99, 102, 241, 0.3)", padding: "1.5rem", borderRadius: "12px", marginBottom: "2rem" }}>
                                <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "1.2rem", color: "var(--primary)", marginBottom: "1.5rem" }}>
                                    <span>🧠</span> Deep Understanding Breakdown
                                </h3>
                                
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                                    <div>
                                        <div style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: "1px", marginBottom: "0.25rem", fontWeight: "bold" }}>Literal Translation:</div>
                                        <p style={{ fontSize: "1.1rem", fontStyle: "italic", margin: 0, color: "var(--text-main)" }}>"{activePhrase.literal}"</p>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: "1px", marginBottom: "0.25rem", fontWeight: "bold" }}>What It Actually Means:</div>
                                        <p style={{ fontSize: "1.1rem", fontWeight: "bold", margin: 0, color: "white" }}>{activePhrase.meaning}</p>
                                    </div>
                                    <div style={{ gridColumn: "1 / -1", borderTop: "1px dashed rgba(255,255,255,0.1)", paddingTop: "1rem", marginTop: "0.5rem" }}>
                                        <div style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: "1px", marginBottom: "0.25rem", fontWeight: "bold" }}>Fun Origin / Backstory:</div>
                                        <p style={{ margin: 0, fontSize: "1.05rem", lineHeight: "1.6" }}>{activePhrase.origin}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <h3 style={{ color: "var(--text-muted)", marginBottom: "0.75rem", fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "1px" }}>Example Sentence</h3>
                            <div style={{ padding: "1.5rem", background: "rgba(255,255,255,0.02)", borderRadius: "12px", borderLeft: "4px solid var(--accent)", fontSize: "1.3rem", fontStyle: "italic", color: "white", marginBottom: "2.5rem", lineHeight: "1.5" }} 
                                 dangerouslySetInnerHTML={{__html: activePhrase.example.replace(/\*(.*?)\*/g, "<span style='color: var(--accent); font-weight: bold;'>$1</span>")}}>
                            </div>
                            
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2.5rem" }}>
                                <div className="glass-panel" style={{ padding: "1.5rem", border: "1px solid rgba(255,255,255,0.05)" }}>
                                    <h3 style={{ color: "var(--text-muted)", marginBottom: "1rem", fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "1px" }}>Real-Life Situations</h3>
                                    <ul style={{ paddingLeft: "1.2rem", margin: 0, color: "var(--text-main)", opacity: 0.9 }}>
                                        {activePhrase.situations.map((sit, i) => <li key={i} style={{ marginBottom: "0.75rem", fontSize: "1.05rem" }}>{sit}</li>)}
                                    </ul>
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                                    {/* Synonyms */}
                                    <div className="glass-panel" style={{ padding: "1.2rem", border: "1px solid rgba(255,255,255,0.05)" }}>
                                        <h3 style={{ color: "var(--text-muted)", marginBottom: "0.75rem", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px" }}>Similar Phrases (Synonyms)</h3>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                                            {activePhrase.synonyms.map((syn, i) => (
                                                <span key={i} style={{ padding: "0.4rem 0.8rem", background: "rgba(255,255,255,0.1)", borderRadius: "6px", fontSize: "0.95rem" }}>{syn}</span>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {/* Common Mistakes */}
                                    <div style={{ background: "rgba(239, 68, 68, 0.05)", borderLeft: "3px solid var(--error)", padding: "1rem", borderRadius: "0 8px 8px 0" }}>
                                        <div style={{ fontSize: "0.85rem", fontWeight: "bold", textTransform: "uppercase", color: "var(--error)", marginBottom: "0.5rem" }}>Common Non-Native Mistake:</div>
                                        <div style={{ textDecoration: "line-through", color: "var(--text-muted)", marginBottom: "0.25rem" }}>"{activePhrase.commonMistake.wrong}"</div>
                                        <div style={{ color: "var(--success)", fontWeight: "bold", marginBottom: "0.5rem" }}>"{activePhrase.commonMistake.right}"</div>
                                        <div style={{ fontSize: "0.9rem", color: "var(--text-main)", opacity: 0.8 }}>Why: {activePhrase.commonMistake.why}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Practice Section */}
                            <div style={{ padding: "2rem", border: "1px dashed var(--accent)", borderRadius: "12px", background: "rgba(244, 63, 94, 0.03)" }}>
                                <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "1.4rem", marginBottom: "1.5rem", color: "white" }}>
                                    <span>🎯</span> Active Action Challenge
                                </h3>
                                
                                <div style={{ marginBottom: "2rem" }}>
                                    <p style={{ fontWeight: "500", fontSize: "1.15rem", marginBottom: "1.5rem" }}>{activePhrase.practice.text}</p>
                                    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                                        {activePhrase.practice.options.map((opt, i) => {
                                            let btnStyle = { padding: "0.85rem 1.5rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "8px", color: "white", cursor: "pointer", transition: "all 0.2s", fontSize: "1.05rem" };
                                            if (practiceAnswer === opt) {
                                                if (opt === activePhrase.practice.answer) {
                                                    btnStyle.background = "rgba(16, 185, 129, 0.2)"; btnStyle.border = "1px solid var(--success)";
                                                } else {
                                                    btnStyle.background = "rgba(239, 68, 68, 0.2)"; btnStyle.border = "1px solid var(--error)";
                                                }
                                            } else if (practiceAnswer && opt === activePhrase.practice.answer) {
                                                btnStyle.background = "rgba(16, 185, 129, 0.1)"; btnStyle.border = "1px dotted var(--success)";
                                            }
                                            return (
                                                <button key={i} style={btnStyle} disabled={!!practiceAnswer} onClick={() => setPracticeAnswer(opt)}>
                                                    {opt}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {practiceAnswer && (
                                        <p style={{ marginTop: "1rem", fontSize: "1.1rem", fontWeight: "bold", color: practiceAnswer === activePhrase.practice.answer ? "var(--success)" : "var(--error)" }}>
                                            {practiceAnswer === activePhrase.practice.answer ? "Excellent selection! That fits perfectly." : "Oops, not quite! Try reading the Deep Breakdown block above again."}
                                        </p>
                                    )}
                                </div>

                                <div style={{ background: "rgba(255,255,255,0.05)", padding: "1.2rem", borderRadius: "8px", borderLeft: "4px solid var(--warning)" }}>
                                    <div style={{ color: "var(--warning)", fontWeight: "bold", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "1px" }}>🗣️ Do this right now:</div>
                                    <p style={{ margin: 0, fontStyle: "italic", fontSize: "1.1rem", color: "white" }}>{activePhrase.task}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Phrases;