import "../styles/styles.css";

import "bootstrap/dist/css/bootstrap.min.css";
// Add these imports at the top of your main.tsx/index.tsx
import '@vaadin/vaadin-lumo-styles/color.js';
import '@vaadin/vaadin-lumo-styles/typography.js';
import '@vaadin/vaadin-lumo-styles/sizing.js';
import '@vaadin/vaadin-lumo-styles/spacing.js';
import '@vaadin/vaadin-lumo-styles/style.js';

// Your other imports...
import React from 'react';
import ReactDOM from 'react-dom/client';
// etc.
export default function Index() {
    return(
        <div>
            <h1>Welcome to the Index Page</h1>
        </div>
        
    );
}
