const About = () => {
    return (
        <div className="app-container">
            <main className="main-content text-center animate-fade-in" style={{ maxWidth: "800px" }}>
                
                <div style={{ marginBottom: "3rem" }}>
                    <h1 style={{ fontSize: "3rem", color: "var(--accent)" }}>ℹ️ About The Creator</h1>
                    <p style={{ fontSize: "1.2rem", color: "var(--text-muted)" }}>
                        Built with passion to engineer the ultimate language learning system.
                    </p>
                </div>

                {/* Profile Card */}
                <div className="glass-panel" style={{ padding: "3rem", marginBottom: "3rem", borderTop: "4px solid var(--accent)", background: "rgba(255,255,255,0.02)" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                        <div style={{ width: "100px", height: "100px", borderRadius: "50%", background: "var(--gradient-primary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem", marginBottom: "1rem" }}>
                            👨‍💻
                        </div>
                        <h2 style={{ fontSize: "2rem", color: "white", margin: 0 }}>Ganesh Kumar P</h2>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--primary)", fontSize: "1.1rem", background: "rgba(99, 102, 241, 0.1)", padding: "0.5rem 1rem", borderRadius: "8px" }}>
                            <span>✉️</span> <span>gk044996@gmail.com</span>
                        </div>
                        <p style={{ marginTop: "1rem", color: "var(--text-main)", opacity: 0.9, lineHeight: "1.6", maxWidth: "500px" }}>
                            Smart English Coach is a highly advanced platform designed to seamlessly merge native-level idioms, automated testing, and comprehensive grammatical frameworks into one entirely offline artificial simulation.
                        </p>
                    </div>
                </div>

                {/* Feedback Form (Formspark) */}
                <h3 style={{ textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-muted)", fontSize: "1rem", marginBottom: "1.5rem" }}>Platform Feedback</h3>
                
                <div className="glass-panel" style={{ padding: "3rem", textAlign: "left", background: "var(--surface)", border: "1px solid var(--border)" }}>
                    <p style={{ marginBottom: "2rem", color: "white", fontSize: "1.1rem" }}>
                        Your thoughts drive this platform! Let me know exactly how this website was useful to you, or what updates you strictly need in the future.
                    </p>
                    
                    <form action="https://submit-form.com/9gTpxjmNg" method="POST" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                        
                        {/* Hidden field to set redirect after form submit (optional, but highly recommended by Formspark to avoid a blank white API page) */}
                        <input type="hidden" name="_redirect" value={window.location.href} />
                        
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            <label htmlFor="name" style={{ color: "var(--text-muted)", fontSize: "0.9rem", textTransform: "uppercase", fontWeight: "bold" }}>Your Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                placeholder="E.g., John Doe" 
                                required 
                                style={{ padding: "1rem", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white", fontSize: "1rem", outline: "none" }}
                            />
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            <label htmlFor="email" style={{ color: "var(--text-muted)", fontSize: "0.9rem", textTransform: "uppercase", fontWeight: "bold" }}>Your Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                placeholder="E.g., you@example.com" 
                                required 
                                style={{ padding: "1rem", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white", fontSize: "1rem", outline: "none" }}
                            />
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            <label htmlFor="message" style={{ color: "var(--text-muted)", fontSize: "0.9rem", textTransform: "uppercase", fontWeight: "bold" }}>Your Message / Feature Request</label>
                            <textarea
                                id="message"
                                name="message"
                                placeholder="I loved having infinite Scenarios because..."
                                required
                                rows="5"
                                style={{ padding: "1rem", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white", fontSize: "1rem", outline: "none", resize: "vertical", fontFamily: "inherit" }}
                            ></textarea>
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            style={{ padding: "1rem", marginTop: "1rem", fontSize: "1.1rem", borderRadius: "8px", background: "var(--primary)", borderColor: "var(--primary)" }}
                        >
                            🚀 Submit Feedback
                        </button>
                    </form>
                </div>

            </main>
        </div>
    );
};

export default About;
