import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Progress = () => {
    const navigate = useNavigate();
    
    const [stats, setStats] = useState({ correct: 0, wrong: 0, totalAnswered: 0 });
    const [spk, setSpk] = useState(0);
    const [lst, setLst] = useState(0);
    const [scn, setScn] = useState(0);

    useEffect(() => {
        const savedStats = localStorage.getItem("englishCoachStats");
        if (savedStats) setStats(JSON.parse(savedStats));

        setSpk(parseInt(localStorage.getItem("coach_speaking") || "0"));
        setLst(parseInt(localStorage.getItem("coach_listening") || "0"));
        setScn(parseInt(localStorage.getItem("coach_scenarios") || "0"));
    }, []);

    const accuracy = stats.totalAnswered > 0 
        ? Math.round((stats.correct / stats.totalAnswered) * 100) 
        : 0;

    const sections = [
        { title: "AI Practice Tests", val: stats.totalAnswered, max: 5000, color: "var(--primary)", path: "/test" },
        { title: "Speaking Challenges", val: spk, max: 5000, color: "var(--accent)", path: "/speaking" },
        { title: "Listening Cases", val: lst, max: 5000, color: "var(--warning)", path: "/reading" },
        { title: "Real-Life Scenarios", val: scn, max: 5000, color: "var(--success)", path: "/scenarios" }
    ];

    const currentStreak = (stats.totalAnswered > 0 || spk > 0 || lst > 0 || scn > 0) ? 1 : 0; 
    
    const uiStats = [
        { label: "Overall Activity", value: stats.totalAnswered + spk + lst + scn, color: "var(--primary)", trend: "Modules interactively completed" },
        { label: "AI Test Accuracy", value: `${accuracy}%`, color: "var(--accent)", trend: `${stats.correct} correct out of ${stats.totalAnswered}` },
        { label: "Active Day Streak", value: `${currentStreak} Days`, color: "var(--warning)", trend: "Keep practicing daily!" }
    ];

    return (
        <div className="app-container">
            <main className="main-content animate-fade-in" style={{ maxWidth: "1200px" }}>
                <h1 className="text-gradient mb-8" style={{ fontSize: "3rem" }}>Highly Accurate Progress Map</h1>

                {/* Top Statistics Grid */}
                <div className="grid-cards stagger-1 mb-8">
                    {uiStats.map((stat, idx) => (
                        <div key={idx} className="glass-panel" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", border: "1px solid rgba(255,255,255,0.1)" }}>
                            <p style={{ color: "var(--text-muted)", margin: 0, fontWeight: "500", textTransform: "uppercase", letterSpacing: "1px", fontSize: "0.85rem" }}>{stat.label}</p>
                            <h2 style={{ fontSize: "3rem", color: stat.color, margin: "1rem 0" }}>{stat.value}</h2>
                            <p style={{ fontSize: "0.95rem", margin: 0, color: "var(--text-main)", opacity: 0.8 }}>
                                📈 {stat.trend}
                            </p>
                        </div>
                    ))}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))", gap: "2rem" }}>
                    
                    {/* Perfect Page Trackers */}
                    <div className="glass-panel stagger-2">
                        <h3 className="mb-6" style={{ fontSize: "1.5rem" }}>Module Completion Tracker</h3>
                        
                        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                            {sections.map((sec, idx) => {
                                const percentage = Math.min(100, Math.round((sec.val / sec.max) * 100));
                                return (
                                    <div key={idx} style={{ background: "rgba(255,255,255,0.03)", padding: "1.5rem", borderRadius: "12px" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                                            <strong style={{ fontSize: "1.1rem" }}>{sec.title}</strong>
                                            <span style={{ color: sec.color, fontWeight: "bold" }}>{sec.val} / {sec.max}</span>
                                        </div>
                                        {/* Progress Bar Container */}
                                        <div style={{ width: "100%", height: "12px", background: "rgba(255,255,255,0.1)", borderRadius: "6px", overflow: "hidden", marginBottom: "1rem" }}>
                                            <div style={{ width: `${percentage}%`, height: "100%", background: sec.color, transition: "width 1s cubic-bezier(0.4, 0, 0.2, 1)" }}></div>
                                        </div>
                                        <button className="btn btn-secondary" onClick={() => navigate(sec.path)} style={{ width: "100%", fontSize: "0.9rem", padding: "0.5rem" }}>
                                            Continue Learning →
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Master Badges */}
                    <div className="glass-panel stagger-3" style={{ borderTop: "4px solid var(--accent)" }}>
                        <h3 className="mb-6" style={{ fontSize: "1.5rem" }}>Mastery Badges</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            
                            {(stats.totalAnswered > 0 || spk > 0) ? (
                                <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", padding: "1.5rem", background: "rgba(244, 63, 94, 0.05)", borderRadius: "12px", border: "1px solid rgba(244, 63, 94, 0.2)" }}>
                                    <div style={{ fontSize: "2.5rem", width: "60px", height: "60px", borderRadius: "50%", background: "rgba(244, 63, 94, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        🔥
                                    </div>
                                    <div>
                                        <h4 style={{ margin: "0 0 0.25rem 0", color: "var(--accent)", fontSize: "1.2rem" }}>Active Initiator</h4>
                                        <p style={{ margin: 0, fontSize: "0.95rem", color: "white" }}>Took action in the simulator.</p>
                                    </div>
                                </div>
                            ) : (
                                <p style={{ color: "var(--text-muted)", textAlign: "center", fontStyle: "italic", margin: "2rem 0" }}>Start tracking activity to earn massive badges.</p>
                            )}

                            {accuracy >= 80 && stats.totalAnswered >= 5 && (
                                <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", padding: "1.5rem", background: "rgba(16, 185, 129, 0.05)", borderRadius: "12px", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
                                    <div style={{ fontSize: "2.5rem", width: "60px", height: "60px", borderRadius: "50%", background: "rgba(16, 185, 129, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        🧠
                                    </div>
                                    <div>
                                        <h4 style={{ margin: "0 0 0.25rem 0", color: "var(--success)", fontSize: "1.2rem" }}>Syntax Brainiac</h4>
                                        <p style={{ margin: 0, fontSize: "0.95rem", color: "white" }}>Maintained >80% grammar test accuracy.</p>
                                    </div>
                                </div>
                            )}

                            {spk >= 10 && (
                                <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", padding: "1.5rem", background: "rgba(99, 102, 241, 0.05)", borderRadius: "12px", border: "1px solid rgba(99, 102, 241, 0.2)" }}>
                                    <div style={{ fontSize: "2.5rem", width: "60px", height: "60px", borderRadius: "50%", background: "rgba(99, 102, 241, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        🎙️
                                    </div>
                                    <div>
                                        <h4 style={{ margin: "0 0 0.25rem 0", color: "var(--primary)", fontSize: "1.2rem" }}>Vocal Virtuoso</h4>
                                        <p style={{ margin: 0, fontSize: "0.95rem", color: "white" }}>Recorded over 10 speaking tests perfectly.</p>
                                    </div>
                                </div>
                            )}

                            {(lst >= 5 && scn >= 5) && (
                                <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", padding: "1.5rem", background: "rgba(245, 158, 11, 0.05)", borderRadius: "12px", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
                                    <div style={{ fontSize: "2.5rem", width: "60px", height: "60px", borderRadius: "50%", background: "rgba(245, 158, 11, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        🌐
                                    </div>
                                    <div>
                                        <h4 style={{ margin: "0 0 0.25rem 0", color: "var(--warning)", fontSize: "1.2rem" }}>World Traveler</h4>
                                        <p style={{ margin: 0, fontSize: "0.95rem", color: "white" }}>Survived 5 Listening Scenarios and Cases.</p>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Progress;