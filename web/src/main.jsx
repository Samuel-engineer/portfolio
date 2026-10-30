import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// No StrictMode on purpose: its double-invoked effects would run the GSAP
// intro timeline twice in development.
createRoot(document.getElementById('root')).render(<App />)
