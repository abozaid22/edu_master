import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast';
import TokenContextProvider from './Context/TokenContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TokenContextProvider>
      <App />
      <Toaster />
    </TokenContextProvider>
  </StrictMode>,
)
