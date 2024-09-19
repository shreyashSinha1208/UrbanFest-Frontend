import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './AuthContext.jsx';


createRoot(document.getElementById('root')).render(

  <StrictMode>
    <AuthProvider>
      <GoogleOAuthProvider clientId='692296796233-pf320nmtsqi0gt4o4s0bkosv66qhl3gp.apps.googleusercontent.com'>
        <App />
      </GoogleOAuthProvider>
    </AuthProvider>
  </StrictMode>



)
