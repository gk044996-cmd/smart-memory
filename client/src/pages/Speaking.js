import { useState, useRef, useMemo } from "react";
import { getSpeakingSentences } from "../data/advancedData";

const Speaking = () => {
    const sentences = useMemo(() => getSpeakingSentences(), []);

    const [activeSentence, setActiveSentence] = useState(() => {
        let p = parseInt(localStorage.getItem('coach_speaking') || '0');
        return sentences[p % sentences.length];
    });
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const recognitionRef = useRef(null);

    const playOriginal = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(activeSentence.text);
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        }
    };

    const handleNext = () => {
        let p = parseInt(localStorage.getItem('coach_speaking') || '0');
        localStorage.setItem('coach_speaking', p + 1);

        const currentIndex = sentences.findIndex(s => s.id === activeSentence.id);
        if (currentIndex < sentences.length - 1) {
            setActiveSentence(sentences[currentIndex + 1]);
            setTranscript("");
            setErrorMsg("");
        }
    };

    const startRecording = () => {
        setErrorMsg("");
        setTranscript("");
        
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setErrorMsg("Your browser doesn't support offline Speech Recognition. Please use Chrome.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => setIsRecording(true);

        recognition.onresult = (event) => {
            const speechToText = event.results[0][0].transcript;
            setTranscript(speechToText);
        };

        recognition.onerror = (event) => {
            console.error("Speech Rec Error:", event.error);
            setErrorMsg(`Microphone error: ${event.error}`);
            setIsRecording(false);
        };

        recognition.onend = () => setIsRecording(false);

        recognition.start();
    };

    const stopRecording = () => {
        if (recognitionRef.current && isRecording) {
            recognitionRef.current.stop();
        }
    };

    const renderComparison = () => {
        if (!transcript) return null;
        
        const originalWords = activeSentence.text.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ');
        const userWords = transcript.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ');

        let correctCount = 0;

        const renderedUser = userWords.map((word, i) => {
            if (originalWords.includes(word)) {
                correctCount++;
                return <span key={i} style={{ color: "var(--success)" }}>{word} </span>;
            } else {
                return <span key={i} style={{ color: "var(--error)", textDecoration: "line-through" }}>{word} </span>;
            }
        });

        const accuracy = Math.round((correctCount / Math.max(originalWords.length, userWords.length)) * 100);

        return (
            <div style={{ marginTop: "2rem" }}>
                <h3 style={{ textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "0.5rem" }}>Live Transcript Evaluation</h3>
                <div style={{ fontSize: "1.4rem", background: "rgba(255,255,255,0.05)", padding: "1.5rem", borderRadius: "12px", border: `1px solid ${accuracy > 80 ? "var(--success)" : "var(--error)"}` }}>
                    {renderedUser}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem" }}>
                    <div style={{ fontSize: "1.1rem", color: "white" }}>
                        Score: <span style={{ color: accuracy > 80 ? "var(--success)" : accuracy > 50 ? "var(--warning)" : "var(--error)", fontWeight: "bold" }}>{accuracy}% Match</span>
                    </div>
                </div>
                <div style={{ marginTop: "2rem" }}>
                    <button className="btn btn-secondary w-full" onClick={handleNext} style={{ borderColor: "var(--accent)", color: "white" }}>
                        Next Module →
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="app-container">
            <main className="main-content text-center animate-fade-in" style={{ maxWidth: "800px" }}>
                
                <div style={{ marginBottom: "3rem" }}>
                    <h1 style={{ fontSize: "3rem", color: "var(--accent)" }}>🗣️ Infinite Speaking Lab</h1>
                    <p style={{ fontSize: "1.2rem", color: "var(--text-muted)" }}>
                        Your microphone input is actively transliterated completely offline and cross-referenced mathematically for pinpoint accuracy.
                    </p>
                    {errorMsg && <p style={{ color: "var(--error)", fontWeight: "bold", marginTop: "1rem", background: "rgba(239, 68, 68, 0.1)", padding: "1rem", borderRadius: "8px" }}>{errorMsg}</p>}
                </div>



                {/* Active Sentence Display */}
                <div className="glass-panel" style={{ padding: "3rem", marginBottom: "2rem", border: "2px solid var(--border)", position: "relative" }}>
                    
                    <button className="btn btn-secondary" onClick={handleNext} style={{ position: "absolute", top: "1rem", right: "1rem", fontSize: "0.9rem" }}>
                        Skip →
                    </button>

                    <h3 style={{ textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1rem" }}>Target Voice Print ({activeSentence.level})</h3>
                    <h2 style={{ fontSize: "2rem", color: "white", lineHeight: "1.4", marginBottom: "2rem" }}>
                        "{activeSentence.text}"
                    </h2>

                    <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem" }}>
                        <button className="btn btn-secondary" onClick={playOriginal} style={{ fontSize: "1.1rem", padding: "1rem 2rem", background: "rgba(16, 185, 129, 0.05)", borderColor: "var(--success)", color: "var(--success)" }}>
                            🔊 Play Native
                        </button>
                        
                        {!isRecording ? (
                            <button className="btn btn-primary" onClick={startRecording} style={{ fontSize: "1.1rem", padding: "1rem 2rem", background: "var(--accent)", color: "white" }}>
                                🎤 Press & Speak
                            </button>
                        ) : (
                            <button className="btn btn-primary" onClick={stopRecording} style={{ fontSize: "1.1rem", padding: "1rem 2rem", background: "var(--error)", color: "white", animation: "pulse-glow 1s infinite" }}>
                                ⏹️ Stop Listening...
                            </button>
                        )}
                    </div>

                    {renderComparison()}
                </div>
            </main>
        </div>
    );
};

export default Speaking;
