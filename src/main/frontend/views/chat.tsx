import { TextField } from '@vaadin/react-components/TextField.js';
import { Button } from '@vaadin/react-components/Button.js';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { ChatAiService } from 'Frontend/generated/endpoints';

export default function Chat() {
    const [question, setQuestion] = useState<string>('');
    const [response, setResponse] = useState<string>('');
    const [isVisible, setIsVisible] = useState<boolean>(false);

    // Trigger animation when response changes
    useEffect(() => {
        if (response) {
            setIsVisible(false);
            // Small delay to reset animation
            setTimeout(() => setIsVisible(true), 50);
        }
    }, [response]);

    async function send() {
        ChatAiService.ragChat(question)
            .then((resp) => {
                setResponse(resp);
            })
            .catch((error) => {
                console.error('Error fetching response:', error);
            });
    }

    return (
        <div className="chat-wrapper">
            <div className="p-m">
                <h3 className="chat-title">Chat Bot</h3>
                <div className="chat-container">
                    <div className="chat-messages">
                        {response && (
                            <div className={`message bot-message fade-in ${isVisible ? 'visible' : ''}`}>
                                <div className="markdown-response">
                                    <ReactMarkdown>
                                        {response}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="input-section">
                        <TextField
                            style={{ width: '80%' }}
                            placeholder="Type your question..."
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                        <Button theme="primary" onClick={send} className="send-button">
                            Send
                        </Button>
                    </div>
                </div>
            </div>

            <style>{`
                .chat-wrapper {
                    min-height: 100vh;
                    background-color: #f5f7fa;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
                    color: #2d3748;
                }

                .p-m {
                    padding: 2rem;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .chat-title {
                    font-size: clamp(1.8rem, 3vw, 2.2rem);
                    font-weight: 600;
                    color: #1e3a8a;
                    margin-bottom: 1.5rem;
                    text-align: center;
                    animation: fadeIn 0.8s ease-out;
                }

                .chat-container {
                    background-color: #ffffff;
                    border-radius: 12px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    padding: 1.5rem;
                    max-width: 800px;
                    margin: 0 auto;
                }

                .chat-messages {
                    max-height: 60vh;
                    overflow-y: auto;
                    padding: 1rem 0;
                    margin-bottom: 1.5rem;
                }

                .bot-message {
                    background-color: #e6ebfc;
                    padding: 1rem;
                    border-radius: 8px;
                    margin-bottom: 1rem;
                    max-width: 70%;
                    align-self: flex-start;
                }

                .input-section {
                    display: flex;
                    gap: 1rem;
                    align-items: flex-end;
                }

                .send-button {
                    padding: 0.75rem 1.5rem;
                    background-color: #1e3a8a;
                    color: #ffffff;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.3s ease, transform 0.2s ease;
                }

                .send-button:hover {
                    background-color: #1a2d6c;
                    transform: translateY(-2px);
                }

                .markdown-response {
                    font-size: clamp(1rem, 1.8vw, 1.2rem);
                    color: #2d3748;
                    line-height: 1.6;
                }

                .fade-in {
                    opacity: 0;
                    transform: translateY(10px);
                    transition: opacity 0.6s ease, transform 0.6s ease;
                }

                .fade-in.visible {
                    opacity: 1;
                    transform: translateY(0);
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @media (max-width: 768px) {
                    .p-m {
                        padding: 1rem;
                    }

                    .chat-title {
                        font-size: clamp(1.5rem, 3vw, 1.8rem);
                    }

                    .chat-container {
                        padding: 1rem;
                    }

                    .input-section {
                        flex-direction: column;
                        gap: 0.75rem;
                    }

                    .send-button {
                        width: 100%;
                    }

                    .chat-messages {
                        max-height: 50vh;
                    }

                    .bot-message {
                        max-width: 85%;
                    }
                }

                @media (max-width: 480px) {
                    .chat-title {
                        font-size: clamp(1.2rem, 2.5vw, 1.5rem);
                    }

                    .input-section {
                        gap: 0.5rem;
                    }

                    .send-button {
                        padding: 0.625rem 1.25rem;
                    }

                    .chat-messages {
                        padding: 0.5rem 0;
                    }

                    .bot-message {
                        padding: 0.75rem;
                    }

                    .markdown-response {
                        font-size: clamp(0.9rem, 1.6vw, 1.1rem);
                    }
                }
            `}</style>
        </div>
    );
}