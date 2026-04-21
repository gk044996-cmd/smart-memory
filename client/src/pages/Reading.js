import { useState, useMemo } from "react";
import { getListeningStories } from "../data/advancedData";

const Reading = () => {
    const stories = useMemo(() => getListeningStories(), []);

    const [activeStory, setActiveStory] = useState(() => {
        let p = parseInt(localStorage.getItem('coach_listening') || '0');
        // Resume precisely where the user left off to ensure completely unique cases every visit
        return stories[p % stories.length];
    });
    const [answers, setAnswers] = useState({});
    const [isPlaying, setIsPlaying] = useState(false);

    const playAudio = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(activeStory.text);
            utterance.rate = 0.9;
            utterance.pitch = 1.0;
            
            utterance.onstart = () => setIsPlaying(true);
            utterance.onend = () => setIsPlaying(false);
            
            window.speechSynthesis.speak(utterance);
        } else {
            alert("Your browser does not support Speech Synthesis API.");
        }
    };

    const stopAudio = () => {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
    };

    const handleAnswer = (qIndex, option) => {
        setAnswers({ ...answers, [qIndex]: option });
    };

    const handleNext = () => {
        let p = parseInt(localStorage.getItem('coach_listening') || '0');
        localStorage.setItem('coach_listening', p + 1);

        const currentIndex = stories.findIndex(s => s.id === activeStory.id);
        if (currentIndex < stories.length - 1) {
            setActiveStory(stories[currentIndex + 1]);
            setAnswers({});
            stopAudio();
        }
    };

    return (
        <div className="app-container">
            <main className="main-content text-center animate-fade-in" style={{ maxWidth: "800px" }}>
                
                <div style={{ marginBottom: "3rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ textAlign: "left" }}>
                        <h1 style={{ fontSize: "3rem", color: "var(--warning)", margin: 0 }}>🎧 Infinite Listening Exams</h1>
                        <p style={{ fontSize: "1.2rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
                            Listen closely and answer questions per block.
                        </p>
                    </div>
                    <button className="btn btn-secondary" onClick={handleNext} style={{ borderColor: "var(--warning)", color: "var(--warning)", padding: "1rem 2rem" }}>
                        Next Exam Case →
                    </button>
                </div>



                {/* Audio Player UX */}
                <div className="glass-panel" style={{ padding: "3rem", textAlign: "center", marginBottom: "3rem", borderTop: "4px solid var(--warning)", background: isPlaying ? "rgba(245, 158, 11, 0.05)" : "var(--gradient-glass)" }}>
                    <h2 style={{ fontSize: "2.5rem", marginBottom: "2rem", color: "white" }}>{activeStory.title}</h2>
                    
                    <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center" }}>
                        <button 
                            className="btn btn-primary" 
                            onClick={isPlaying ? stopAudio : playAudio} 
                            style={{ 
                                padding: "1.5rem 3rem", fontSize: "1.3rem", borderRadius: "50px",
                                background: isPlaying ? "var(--error)" : "var(--warning)",
                                color: "white", animation: isPlaying ? "pulse-glow 1.5s infinite" : "none",
                                boxShadow: isPlaying ? "0 0 20px rgba(245, 158, 11, 0.5)" : "0 4px 14px rgba(245, 158, 11, 0.2)"
                            }}
                        >
                            {isPlaying ? "⏹️ Stop Audio" : "🔊 Play Story Audio"}
                        </button>
                    </div>
                    {isPlaying && <p style={{ marginTop: "1rem", color: "var(--warning)", fontStyle: "italic" }}>Narrator is speaking... Listen closely!</p>}
                </div>

                {/* Practice Questions */}
                <div style={{ textAlign: "left" }}>
                    <h3 style={{ textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-muted)", fontSize: "1rem", marginBottom: "1.5rem" }}>Comprehension Check (5 Questions)</h3>
                    
                    {activeStory.questions.map((q, qIndex) => (
                        <div key={qIndex} className="glass-panel" style={{ padding: "2rem", marginBottom: "1.5rem", background: "rgba(255,255,255,0.02)" }}>
                            <p style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "1.5rem", color: "white" }}>{qIndex + 1}. {q.q}</p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                                {q.options.map((opt, i) => {
                                    const isSelected = answers[qIndex] === opt;
                                    const isCorrect = isSelected && opt === q.ans;
                                    const isWrong = isSelected && opt !== q.ans;
                                    
                                    let bg = "var(--surface)";
                                    let border = "var(--border)";
                                    if (isCorrect) { bg = "rgba(16, 185, 129, 0.2)"; border = "var(--success)"; }
                                    if (isWrong) { bg = "rgba(239, 68, 68, 0.2)"; border = "var(--error)"; }
                                    if (answers[qIndex] && opt === q.ans && !isCorrect) {
                                        bg = "rgba(16, 185, 129, 0.05)"; border = "1px dotted var(--success)";
                                    }

                                    return (
                                        <button 
                                            key={i} 
                                            disabled={!!answers[qIndex]}
                                            onClick={() => handleAnswer(qIndex, opt)}
                                            style={{
                                                padding: "1rem", textAlign: "left", background: bg, border: `1px solid ${border}`, borderRadius: "8px", color: "white", fontSize: "1.05rem", cursor: "pointer", transition: "all 0.2s"
                                            }}
                                        >
                                            {opt}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Reading;
