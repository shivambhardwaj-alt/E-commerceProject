import { StrictMode, useContext } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import ShopContextProvider, { ShopContext } from './context/ShopContext.jsx'
import ScrollTop from './Components/ScrollTop.jsx'
import {GoogleOAuthProvider} from '@react-oauth/google';

const googleClientIdForAuth = import.meta.env.VITE_CLIENT_ID;
createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={googleClientIdForAuth}>
  <BrowserRouter>
    <ScrollTop />
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </BrowserRouter>
  </GoogleOAuthProvider>
)
