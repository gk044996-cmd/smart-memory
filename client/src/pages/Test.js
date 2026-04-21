import { useState } from "react";
import axios from "axios";

const Test = () => {
    const [question, setQuestion] = useState(null);
    const [selected, setSelected] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    
    // Load stats from localStorage or default
    const [stats, setStats] = useState(() => {
        const saved = localStorage.getItem("englishCoachStats");
        if (saved) return JSON.parse(saved);
        return { correct: 0, wrong: 0, totalAnswered: 0 };
    });

    const [error, setError] = useState(null);

    const generateQuestion = async () => {
        try {
            setLoading(true);
            setResult("");
            setSelected("");
            setError(null);
            
            const res = await axios.post("http://localhost:5000/generate-question");
            setQuestion(res.data);
            
        } catch (err) {
            console.error("FRONTEND ERROR:", err);
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error);
            } else {
                setError("❌ Failed to connect to the AI API. Please verify the Gemini API key is active or check your network limits.");
            }
        } finally {
            setLoading(false);
        }
    };

    const checkAnswer = () => {
        if (!question || !selected) return;

        let newStats = { ...stats };
        newStats.totalAnswered += 1;

        if (selected === question.answer) {
            setResult("correct");
            newStats.correct += 1;
        } else {
            setResult("wrong");
            newStats.wrong += 1;
        }

        setStats(newStats);
        localStorage.setItem("englishCoachStats", JSON.stringify(newStats));
    };

    return (
        <div className="app-container">
            <main className="main-content animate-fade-in" style={{ maxWidth: "800px" }}>
                
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-gradient">AI Practice Tests</h1>
                        <p style={{ margin: 0 }}>Generate infinite dynamic questions to test your skills.</p>
                    </div>
                    
                    <div className="glass-panel" style={{ padding: "0.5rem 1rem", display: "flex", gap: "1rem" }}>
                        <div style={{ textAlign: "center" }}>
                            <div style={{ color: "var(--success)", fontWeight: "bold", fontSize: "1.2rem" }}>{stats.correct}</div>
                            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Correct</div>
                        </div>
                        <div style={{ width: "1px", background: "var(--border)" }}></div>
                        <div style={{ textAlign: "center" }}>
                            <div style={{ color: "var(--error)", fontWeight: "bold", fontSize: "1.2rem" }}>{stats.wrong}</div>
                            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Wrong</div>
                        </div>
                    </div>
                </div>

                <div className="glass-panel text-center mb-8" style={{ padding: "3rem" }}>
                    {!question && !loading && !error && (
                        <div className="animate-fade-in stagger-2">
                            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🤖</div>
                            <h2 style={{ marginBottom: "1.5rem" }}>Ready for a challenge?</h2>
                            <button className="btn btn-primary" onClick={generateQuestion} style={{ padding: "1rem 2rem", fontSize: "1.1rem" }}>
                                Generate First Question
                            </button>
                        </div>
                    )}

                    {error && !loading && (
                        <div className="animate-fade-in" style={{ padding: "2rem", border: "1px solid var(--error)", background: "rgba(239, 68, 68, 0.1)", borderRadius: "12px", textAlign: "center" }}>
                            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⚠️</div>
                            <h3 style={{ color: "var(--error)", marginBottom: "1rem" }}>API Error</h3>
                            <p style={{ color: "var(--text-main)", marginBottom: "2rem" }}>{error}</p>
                            <button className="btn btn-secondary" onClick={generateQuestion} style={{ padding: "0.75rem 2rem" }}>
                                Try Again
                            </button>
                        </div>
                    )}

                    {loading && (
                        <div className="animate-fade-in py-8">
                            <div style={{ 
                                width: "40px", height: "40px", 
                                border: "3px solid rgba(99, 102, 241, 0.2)", 
                                borderTop: "3px solid var(--primary)", 
                                borderRadius: "50%", 
                                margin: "0 auto 1.5rem auto",
                                animation: "spin 1s linear infinite" 
                            }}></div>
                            <h3>Crafting a dynamic test for you...</h3>
                            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                        </div>
                    )}

                    {question && !loading && (
                        <div className="animate-slide-right text-left">
                            <span className="badge badge-primary mb-4">Multiple Choice</span>
                            <h2 style={{ fontSize: "1.5rem", marginBottom: "2rem", lineHeight: "1.4" }}>
                                {question.question}
                            </h2>

                            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
                                {question.options.map((opt, i) => {
                                    const isSelected = selected === opt;
                                    let btnStyle = {
                                        padding: "1rem 1.5rem",
                                        background: isSelected ? "rgba(99, 102, 241, 0.15)" : "var(--surface)",
                                        border: `1px solid ${isSelected ? "var(--primary)" : "var(--border)"}`,
                                        color: "white",
                                        borderRadius: "12px",
                                        textAlign: "left",
                                        cursor: result ? "default" : "pointer",
                                        transition: "all 0.2s ease",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "1rem"
                                    };
                                    
                                    // Status colors after check
                                    if (result && opt === question.answer) {
                                        btnStyle.background = "rgba(16, 185, 129, 0.15)";
                                        btnStyle.borderColor = "var(--success)";
                                    } else if (result && isSelected && opt !== question.answer) {
                                        btnStyle.background = "rgba(239, 68, 68, 0.15)";
                                        btnStyle.borderColor = "var(--error)";
                                    }

                                    return (
                                        <button
                                            key={i}
                                            onClick={() => !result && setSelected(opt)}
                                            style={btnStyle}
                                            disabled={!!result}
                                        >
                                            <span style={{ 
                                                width: "24px", height: "24px", borderRadius: "50%", 
                                                border: `1px solid ${isSelected ? "var(--primary)" : "var(--border)"}`,
                                                display: "inline-flex", alignItems: "center", justifyContent: "center",
                                                fontSize: "0.7rem", fontWeight: "bold",
                                                background: isSelected ? "var(--primary)" : "transparent"
                                            }}>
                                                {String.fromCharCode(65 + i)}
                                            </span>
                                            <span style={{ fontSize: "1.05rem" }}>{opt}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {!result ? (
                                <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
                                    <button 
                                        className="btn btn-secondary" 
                                        onClick={generateQuestion}
                                    >
                                        Skip Question
                                    </button>
                                    <button 
                                        className="btn btn-primary" 
                                        onClick={checkAnswer} 
                                        disabled={!selected}
                                        style={{ padding: "0.75rem 2rem" }}
                                    >
                                        Submit Answer
                                    </button>
                                </div>
                            ) : (
                                <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    <div style={{ 
                                        padding: "1.5rem", 
                                        borderRadius: "12px", 
                                        background: result === "correct" ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
                                        border: `1px solid ${result === "correct" ? "var(--success)" : "var(--error)"}`,
                                        display: "flex", justifyContent: "space-between", alignItems: "center"
                                    }}>
                                        <div>
                                            <h3 style={{ margin: "0 0 0.25rem 0", color: result === "correct" ? "var(--success)" : "var(--error)" }}>
                                                {result === "correct" ? "🎉 Brilliant! That's correct." : "❌ Not quite right."}
                                            </h3>
                                            {result === "wrong" && (
                                                <p style={{ margin: 0, color: "var(--text-main)" }}>
                                                    The correct answer is: <strong style={{ color: "var(--success)" }}>{question.answer}</strong>
                                                </p>
                                            )}
                                        </div>
                                        <button className="btn btn-primary" onClick={generateQuestion}>
                                            Next Question →
                                        </button>
                                    </div>
                                    
                                    {question.explanation && (
                                        <div style={{ 
                                            background: "rgba(255,255,255,0.05)", 
                                            padding: "1.5rem", 
                                            borderRadius: "12px", 
                                            borderLeft: "4px solid var(--primary)" 
                                        }}>
                                            <h4 style={{ color: "var(--primary)", marginTop: 0, marginBottom: "0.5rem" }}>💡 Explanation</h4>
                                            <p style={{ margin: 0, lineHeight: 1.6, color: "var(--text-main)" }}>{question.explanation}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
};

export default Test;