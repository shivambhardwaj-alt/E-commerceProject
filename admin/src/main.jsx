import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AdminContextProvider } from './context/AdminContext.jsx';
import {BrowserRouter} from 'react-router-dom';
import ScrollTop from './components/ScrollTop.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ScrollTop />
    <AdminContextProvider>
      <App />
    </AdminContextProvider>
  </BrowserRouter>
)
