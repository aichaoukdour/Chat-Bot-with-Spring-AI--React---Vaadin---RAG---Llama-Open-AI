import PersonModel from "Frontend/generated/com/example/chatboot_RAG/entities/PersonModel";
import { PersonService } from "Frontend/generated/endpoints";
import { AutoCrud } from "@vaadin/hilla-react-crud";

export default function Person() {
    return (
        <div className="person-wrapper">
            <div className="p-m">
                <h3 className="person-title">Person Management</h3>
                <div className="crud-container">
                    <AutoCrud service={PersonService} model={PersonModel} />
                </div>
            </div>

            <style>{`
                .person-wrapper {
                    min-height: 100vh;
                    background-color: #f5f7fa;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
                    color: #2d3748;
                }

                .p-m {
                    padding: 1rem;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .person-title {
                    font-size: clamp(1.8rem, 3vw, 2.2rem);
                    font-weight: 600;
                    color: #1e3a8a;
                    margin-bottom: 1.5rem;
                    text-align: center;
                    animation: fadeIn 0.8s ease-out;
                }

                .crud-container {
                    background-color: #ffffff;
                    border-radius: 12px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    padding: 1.5rem;
                }

                /* Style the Vaadin AutoCrud table */
                [part="table"] {
                    border-collapse: separate;
                    border-spacing: 0;
                }

                [part="table"] th {
                    background-color: #1e3a8a;
                    color: #ffffff;
                    padding: 0.75rem;
                    text-align: left;
                    font-weight: 600;
                }

                [part="table"] td {
                    padding: 0.75rem;
                    border-bottom: 1px solid #e6ebfc;
                    color: #2d3748;
                }

                [part="table"] tr:hover {
                    background-color: #f1f5f9;
                }

                /* Style the form fields within AutoCrud */
                [part="form"] {
                    padding: 1rem;
                }

                [part="form"] vaadin-text-field,
                [part="form"] vaadin-select,
                [part="form"] vaadin-button {
                    margin-bottom: 1rem;
                    width: 100%;
                }

                [part="form"] vaadin-button {
                    background-color: #1e3a8a;
                    color: #ffffff;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.3s ease, transform 0.2s ease;
                }

                [part="form"] vaadin-button:hover {
                    background-color: #1a2d6c;
                    transform: translateY(-2px);
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

                    .person-title {
                        font-size: clamp(1.5rem, 3vw, 1.8rem);
                    }

                    .crud-container {
                        padding: 1rem;
                    }

                    [part="table"] th,
                    [part="table"] td {
                        padding: 0.5rem;
                    }
                }

                @media (max-width: 480px) {
                    .person-title {
                        font-size: clamp(1.2rem, 2.5vw, 1.5rem);
                    }

                    [part="table"] th,
                    [part="table"] td {
                        padding: 0.375rem;
                    }

                    [part="form"] vaadin-button {
                        padding: 0.625rem 1.25rem;
                    }
                }
            `}</style>
        </div>
    );
}