import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="layout-wrapper">
            <div className="p-m">
                <nav className="professional-nav">
                    <NavLink 
                        className={({ isActive }) => 
                            `nav-btn ${isActive ? 'active' : ''}`
                        } 
                        to="/"
                    >
                        <span className="nav-text">Home</span>
                    </NavLink>
                    <NavLink 
                        className={({ isActive }) => 
                            `nav-btn ${isActive ? 'active' : ''}`
                        } 
                        to="/chat"
                    >
                        <span className="nav-text">Chat</span>
                    </NavLink>
                    <NavLink 
                        className={({ isActive }) => 
                            `nav-btn ${isActive ? 'active' : ''}`
                        } 
                        to="/person"
                    >
                        <span className="nav-text">Person</span>
                    </NavLink>
                </nav>
                <main className="main-content">
                    <Outlet />
                </main>
            </div>

            <style>{`
                .layout-wrapper {
                    min-height: 100vh;
                    background-color: #ffffff;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
                    color: #333333;
                }

                .p-m {
                    padding: 2rem;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .professional-nav {
                    display: flex;
                    gap: 2rem;
                    margin-bottom: 2rem;
                    border-bottom: 1px solid #e0e0e0;
                    padding-bottom: 1rem;
                }

                .nav-btn {
                    text-decoration: none;
                    color: #333333;
                    font-weight: 500;
                    padding: 0.75rem 1.5rem;
                    transition: color 0.3s ease, border-bottom 0.3s ease;
                    border-bottom: 2px solid transparent;
                }

                .nav-btn:hover {
                    color: #1e40af;
                    border-bottom: 2px solid #1e40af;
                }

                .nav-btn.active {
                    color: #1e40af;
                    border-bottom: 2px solid #1e40af;
                }

                .nav-text {
                    margin: 0;
                }

                .main-content {
                    padding: 2rem;
                    background-color: #f9f9f9;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                @media (max-width: 768px) {
                    .p-m {
                        padding: 1rem;
                    }

                    .professional-nav {
                        flex-direction: column;
                        gap: 1rem;
                        padding-bottom: 0;
                    }

                    .nav-btn {
                        padding: 0.5rem 1rem;
                    }

                    .main-content {
                        padding: 1.5rem;
                    }
                }

                @media (max-width: 480px) {
                    .nav-btn {
                        padding: 0.5rem 0.75rem;
                    }

                    .main-content {
                        padding: 1rem;
                    }
                }
            `}</style>
        </div>
    );
}