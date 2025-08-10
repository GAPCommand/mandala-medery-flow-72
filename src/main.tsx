import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TemplateInitializer } from './utils/TemplateInitializer'

// Initialize template system
TemplateInitializer.initialize();

createRoot(document.getElementById("root")!).render(<App />);
