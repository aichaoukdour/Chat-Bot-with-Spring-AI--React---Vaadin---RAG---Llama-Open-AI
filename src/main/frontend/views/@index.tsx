import React, { useEffect } from 'react';

export default function Home() {
    useEffect(() => {
        const handleScroll = () => {
            const elements = document.querySelectorAll('.fade-in');
            elements.forEach((element) => {
                const position = element.getBoundingClientRect().top;
                const screenHeight = window.innerHeight;
                if (position < screenHeight * 0.75) {
                    element.classList.add('visible');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Trigger on mount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="home-wrapper">
            <header className="header fade-in">
                <h1 className="title">Welcome to Chatbot RAG</h1>
                <p className="subtitle">Empowering Intelligent Conversations</p>
            </header>
            <main className="main-content">
                <section className="intro-section fade-in">
                    <h2>About Our Application</h2>
                    <p>
                        Chatbot RAG is a cutting-edge platform designed to enhance user interactions through advanced retrieval-augmented generation (RAG) technology. Our application integrates powerful AI to provide accurate, context-aware responses, making it ideal for customer support, virtual assistance, and personalized engagement. With a sleek interface and robust backend, we aim to redefine how businesses and individuals communicate with AI.
                    </p>
                </section>
                <section className="features-section fade-in">
                    <h2>Key Features</h2>
                    <ul>
                        <li>Real-time, context-aware responses</li>
                        <li>Seamless integration with existing systems</li>
                        <li>Customizable AI models for various industries</li>
                        <li>Secure and scalable architecture</li>
                    </ul>
                </section>
                <section className="cta-section fade-in">
                    <a href="/get-started" className="cta-button">Get Started</a>
                </section>
            </main>

            <style>{`
                .home-wrapper {
                    min-height: 100vh;
                    background-color: #f5f7fa;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
                    color: #2d3748;
                    line-height: 1.6;
                }

                .header {
                    text-align: center;
                    padding: 4rem 2rem;
                    background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
                    color: #ffffff;
                    opacity: 0;
                    transition: opacity 0.8s ease-in-out;
                }

                .header.visible {
                    opacity: 1;
                }

                .title {
                    font-size: clamp(2.5rem, 5vw, 3.5rem);
                    font-weight: 700;
                    margin-bottom: 1rem;
                    animation: fadeInDown 1s ease-out;
                }

                .subtitle {
                    font-size: clamp(1.2rem, 2.5vw, 1.5rem);
                    font-weight: 400;
                    color: #e2e8f0;
                }

                .main-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 2rem;
                }

                .intro-section, .features-section, .cta-section {
                    margin-bottom: 3rem;
                    opacity: 0;
                    transform: translateY(20px);
                    transition: opacity 0.6s ease, transform 0.6s ease;
                }

                .fade-in.visible {
                    opacity: 1;
                    transform: translateY(0);
                }

                .intro-section h2, .features-section h2 {
                    font-size: clamp(1.8rem, 3vw, 2.2rem);
                    font-weight: 600;
                    margin-bottom: 1.5rem;
                    color: #2d3748;
                }

                .intro-section p {
                    font-size: clamp(1rem, 1.8vw, 1.2rem);
                    color: #4a5568;
                    max-width: 800px;
                }

                .features-section ul {
                    list-style: none;
                    padding: 0;
                }

                .features-section li {
                    font-size: clamp(1rem, 1.8vw, 1.2rem);
                    color: #4a5568;
                    margin-bottom: 0.75rem;
                    padding-left: 1.5rem;
                    position: relative;
                }

                .features-section li:before {
                    content: '•';
                    color: #2b6cb0;
                    position: absolute;
                    left: 0;
                }

                .cta-section {
                    text-align: center;
                }

                .cta-button {
                    display: inline-block;
                    padding: 1rem 2.5rem;
                    background-color: #2b6cb0;
                    color: #ffffff;
                    text-decoration: none;
                    font-weight: 600;
                    border-radius: 8px;
                    transition: background-color 0.3s ease, transform 0.2s ease;
                }

                .cta-button:hover {
                    background-color: #2c5282;
                    transform: translateY(-2px);
                }

                @keyframes fadeInDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @media (max-width: 768px) {
                    .header {
                        padding: 2rem 1rem;
                    }

                    .title {
                        font-size: clamp(2rem, 5vw, 2.5rem);
                    }

                    .subtitle {
                        font-size: clamp(1rem, 2vw, 1.2rem);
                    }

                    .main-content {
                        padding: 1rem;
                    }

                    .intro-section h2, .features-section h2 {
                        font-size: clamp(1.5rem, 3vw, 1.8rem);
                    }

                    .intro-section p, .features-section li {
                        font-size: clamp(0.9rem, 1.6vw, 1.1rem);
                    }

                    .cta-button {
                        padding: 0.875rem 2rem;
                    }
                }

                @media (max-width: 480px) {
                    .title {
                        font-size: clamp(1.5rem, 4vw, 2rem);
                    }

                    .subtitle {
                        font-size: clamp(0.9rem, 1.5vw, 1rem);
                    }

                    .intro-section h2, .features-section h2 {
                        font-size: clamp(1.2rem, 2.5vw, 1.5rem);
                    }

                    .intro-section p, .features-section li {
                        font-size: clamp(0.8rem, 1.4vw, 1rem);
                    }

                    .cta-button {
                        padding: 0.75rem 1.5rem;
                    }
                }
            `}</style>
        </div>
    );
}