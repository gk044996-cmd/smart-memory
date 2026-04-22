import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();

// Navigation Links update
    const navLinks = [
        { path: "/", label: "Dashboard", icon: "📊" },
        { path: "/grammar", label: "Grammar", icon: "📘" },
        { path: "/phrases", label: "Phrases", icon: "💬" },
        { path: "/test", label: "Tests", icon: "📝" },
        { path: "/speaking", label: "Speaking", icon: "🗣️" },
        { path: "/scenarios", label: "Scenarios", icon: "🎭" },
        { path: "/reading", label: "Reading", icon: "📖" },
        { path: "/progress", label: "Progress", icon: "📈" },
        { path: "/about", label: "About", icon: "ℹ️" }
    ];

    return (
        <nav style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            background: "rgba(11, 14, 20, 0.8)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            padding: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem"
        }}>
            <Link to="/" style={{ textDecoration: "none" }}>
                <h2 style={{ margin: 0, fontSize: "1.5rem" }} className="text-gradient">
                    ✨ Smart English Coach
                </h2>
            </Link>

            <div 
                className="nav-links-container"
                style={{ 
                    display: "flex", 
                    gap: "0.5rem", 
                    alignItems: "center",
                    overflowX: "auto",
                    width: "100%",
                    maxWidth: "100vw",
                    paddingBottom: "0.5rem",
                    WebkitOverflowScrolling: "touch"
                }}
            >
                {navLinks.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                        <Link 
                            key={link.path}
                            to={link.path} 
                            style={{ 
                                textDecoration: "none",
                                color: isActive ? "white" : "var(--text-muted)",
                                fontWeight: isActive ? "600" : "500",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.4rem",
                                padding: "0.5rem 0.6rem",
                                borderRadius: "8px",
                                fontSize: "0.95rem",
                                background: isActive ? "rgba(255,255,255,0.05)" : "transparent",
                                transition: "all 0.2s ease",
                                whiteSpace: "nowrap"
                            }}
                            onMouseEnter={(e) => {
                                if(!isActive) e.currentTarget.style.color = "white";
                            }}
                            onMouseLeave={(e) => {
                                if(!isActive) e.currentTarget.style.color = "var(--text-muted)";
                            }}
                        >
                            <span>{link.icon}</span>
                            <span>{link.label}</span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    );
};

export default Navbar;