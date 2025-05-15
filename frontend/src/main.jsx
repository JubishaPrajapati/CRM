import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { NoteProvider } from './contexts/noteContext.jsx'
import { ClientProvider } from './contexts/clientContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClientProvider>
      <NoteProvider>
        <App />
      </NoteProvider>
    </ClientProvider>

  </StrictMode>,
)
