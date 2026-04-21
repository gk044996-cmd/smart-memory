import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Challenge = () => {
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([
        { id: 1, title: "Master the Past Tense", desc: "Successfully answer 5 Past Simple questions in the AI Test.", isCompleted: false, xp: 50 },
        { id: 2, title: "Idiom Explorer", desc: "Read and learn 3 new idioms from the Phrases section.", isCompleted: false, xp: 30 },
        { id: 3, title: "Perfect Score", desc: "Achieve a 100% correct streak of 3 questions.", isCompleted: true, xp: 100 }
    ]);

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t));
    };

    const completedCount = tasks.filter(t => t.isCompleted).length;
    const progressPercent = (completedCount / tasks.length) * 100;

    return (
        <div className="app-container">
            <main className="main-content animate-fade-in" style={{ maxWidth: "800px" }}>
                
                <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                    <h1 className="text-gradient hover-scale" style={{ fontSize: "3rem" }}>Daily Quests</h1>
                    <p>Complete these tasks individually to earn XP and level up your English intuition.</p>
                </div>

                {/* Progress Bar Container */}
                <div className="glass-panel stagger-1 mb-8" style={{ padding: "2rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                        <h3 style={{ margin: 0 }}>Today's Progress</h3>
                        <span style={{ color: "var(--accent)", fontWeight: "bold" }}>{completedCount} / {tasks.length} Completed</span>
                    </div>
                    
                    <div style={{ width: "100%", height: "12px", background: "rgba(255,255,255,0.05)", borderRadius: "999px", overflow: "hidden" }}>
                        <div style={{ 
                            width: `${progressPercent}%`, 
                            height: "100%", 
                            background: "var(--gradient-primary)", 
                            transition: "width 0.5s ease-out" 
                        }}></div>
                    </div>
                    
                    {progressPercent === 100 && (
                        <div className="animate-fade-in text-center mt-4" style={{ color: "var(--success)", fontWeight: "bold" }}>
                            🎉 You've completed all daily quests! Come back tomorrow for more.
                        </div>
                    )}
                </div>

                {/* Task List */}
                <div className="flex flex-col gap-4 stagger-2">
                    {tasks.map((task) => (
                        <div 
                            key={task.id}
                            className="glass-panel hover-scale"
                            style={{ 
                                display: "flex", 
                                gap: "1.5rem", 
                                alignItems: "center",
                                opacity: task.isCompleted ? 0.6 : 1,
                                border: task.isCompleted ? "1px solid var(--success)" : "1px solid var(--border)",
                                transition: "all 0.3s ease",
                                cursor: "pointer"
                            }}
                            onClick={() => toggleTask(task.id)}
                        >
                            {/* Checkbox */}
                            <div style={{ 
                                width: "32px", 
                                height: "32px", 
                                borderRadius: "50%", 
                                border: `2px solid ${task.isCompleted ? "var(--success)" : "var(--primary)"}`,
                                background: task.isCompleted ? "var(--success)" : "transparent",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "all 0.2s ease",
                                flexShrink: 0
                            }}>
                                {task.isCompleted && <span style={{ color: "white", fontSize: "1.2rem", fontWeight: "bold" }}>✓</span>}
                            </div>
                            
                            {/* Content */}
                            <div style={{ flex: 1 }}>
                                <h3 style={{ 
                                    margin: "0 0 0.5rem 0", 
                                    color: task.isCompleted ? "var(--success)" : "white",
                                    textDecoration: task.isCompleted ? "line-through" : "none" 
                                }}>
                                    {task.title}
                                </h3>
                                <p style={{ margin: 0, fontSize: "0.95rem" }}>{task.desc}</p>
                            </div>

                            {/* Rewards */}
                            <div style={{ textAlign: "right" }}>
                                <div className="badge badge-warning">+{task.xp} XP</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-8 stagger-3">
                    <button className="btn btn-secondary" onClick={() => navigate("/test")}>
                        Jump to Practice Tests →
                    </button>
                </div>

            </main>
        </div>
    );
};

export default Challenge;