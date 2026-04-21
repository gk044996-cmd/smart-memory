import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    const modules = [
        { 
            id: 1, 
            title: "Grammar Rules", 
            desc: "Master tenses, prepositions, articles and more. From zero to advanced.",
            icon: "📘", 
            path: "/grammar",
            color: "var(--primary)"
        },
        { 
            id: 2, 
            title: "Daily Phrases", 
            desc: "Learn native-like idioms, slangs, and conversational expressions.",
            icon: "💬", 
            path: "/phrases",
            color: "var(--success)"
        },
        { 
            id: 3, 
            title: "Speech Lab", 
            desc: "Offline voice-to-text algorithm identifying pronunciation constraints visually.",
            icon: "🗣️", 
            path: "/speaking",
            color: "var(--accent)"
        },
        { 
            id: 4, 
            title: "Real-Life Scenarios", 
            desc: "Dive into heavily simulated dialogue exchanges covering travel, office, and hospitals.",
            icon: "🎭", 
            path: "/scenarios",
            color: "var(--success)"
        },
        { 
            id: 5, 
            title: "Listening Tests", 
            desc: "Test your auditory comprehension exclusively offline by listening to synthesized native stories.",
            icon: "🎧", 
            path: "/reading",
            color: "var(--warning)"
        },
        { 
            id: 6, 
            title: "AI Practice Tests", 
            desc: "Take infinite AI-generated dynamic MCQ tests to prove your overall syntax knowledge.",
            icon: "📝", 
            path: "/test",
            color: "var(--primary)"
        },
        { 
            id: 7, 
            title: "Track Progress", 
            desc: "Monitor your growth with charts, scores, and historical stats.",
            icon: "📈", 
            path: "/progress",
            color: "var(--secondary)"
        }
    ];

    return (
        <div className="app-container">
            <main className="main-content animate-fade-in">
                
                {/* Hero Section */}
                <div style={{ textAlign: "center", padding: "3rem 0", marginBottom: "2rem" }}>
                    <h1 style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>
                        Level up your English with <span className="text-gradient">AI Coaching</span>.
                    </h1>
                    <p style={{ fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto", color: "var(--text-muted)" }}>
                        An all-in-one platform to master grammar, expand vocabulary, and practice dynamically with artificial intelligence.
                    </p>
                    
                    <button 
                        className="btn btn-primary mt-8 stagger-2" 
                        style={{ padding: "1rem 2rem", fontSize: "1.1rem", borderRadius: "12px" }}
                        onClick={() => navigate("/test")}
                    >
                        Start an AI Test 🚀
                    </button>
                </div>

                {/* Grid Modules */}
                <h3 className="mb-4 stagger-3 animate-fade-in" style={{ paddingLeft: "0.5rem" }}>Learning Modules</h3>
                <div className="grid-cards stagger-4 animate-fade-in">
                    {modules.map((mod) => (
                        <div 
                            key={mod.id} 
                            className="glass-panel"
                            onClick={() => navigate(mod.path)}
                            style={{ cursor: "pointer", display: "flex", flexDirection: "column", height: "100%" }}
                        >
                            <div style={{ 
                                display: "flex", 
                                alignItems: "center", 
                                gap: "1rem", 
                                marginBottom: "1rem" 
                            }}>
                                <div style={{ 
                                    width: "48px", 
                                    height: "48px", 
                                    borderRadius: "12px", 
                                    background: `rgba(255,255,255,0.05)`, 
                                    display: "flex", 
                                    alignItems: "center", 
                                    justifyContent: "center",
                                    fontSize: "1.5rem",
                                    border: `1px solid ${mod.color}33`
                                }}>
                                    {mod.icon}
                                </div>
                                <h3 style={{ margin: 0, fontSize: "1.2rem", color: "white" }}>{mod.title}</h3>
                            </div>
                            <p style={{ flex: 1, margin: 0, fontSize: "0.95rem" }}>
                                {mod.desc}
                            </p>
                            
                            <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "flex-end" }}>
                                <span style={{ color: mod.color, fontWeight: "600", fontSize: "0.9rem" }}>
                                    Explore →
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;