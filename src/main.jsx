import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Authprovider } from './context/AuthContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authprovider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Authprovider>
  </StrictMode>,
)
