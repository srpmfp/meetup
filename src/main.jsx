import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import * as serviceWorkerRegistration from './serviceWorkerRegistration.js';


import atatus from 'atatus-spa';
atatus.config('2f07950c97874463a33e94d16c0a0939').install();



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
serviceWorkerRegistration.register();
