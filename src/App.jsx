import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import HomePage from './pages/HomePage'
import ReservasPage from './pages/ReservasPage'
import ConfirmacaoPage from './pages/ConfirmacaoPage'
import GaleriaPage from './pages/GaleriaPage'
import SobrePage from './pages/SobrePage'
import Navbar from './components/Navbar'
import Contact from './pages/Contact'
import Services from './pages/Services'
import Reservations from './pages/Reservations'
import ListaReservasPage from './pages/ListaReservasPage'
import LoginPage from './pages/LoginPage'
import Parse from './config/back4app'
import './index.css'

// Componente simples para rota protegida de Admin
function AdminRoute({ children }) {
  const currentUser = Parse.User.current();
  const isAdmin = currentUser && currentUser.get('isAdmin') === true;
  return isAdmin ? children : <Navigate to="/login" replace />; 
}

// Componente simples para rota protegida de usuário logado
function UserRoute({ children }) {
  const currentUser = Parse.User.current();
  return currentUser ? children : <Navigate to="/login" replace />; 
}

function App() {
  // Estado para forçar re-renderização após login/logout
  const [authKey, setAuthKey] = useState(0); 

  useEffect(() => {
    const handleUserChange = () => {
      setAuthKey(prevKey => prevKey + 1); // Muda a key para forçar re-render
    };
    window.addEventListener('userChange', handleUserChange);
    return () => window.removeEventListener('userChange', handleUserChange);
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header key={authKey} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/reservas" element={<ReservasPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sobre" element={<SobrePage />} />
            <Route path="/galeria" element={<GaleriaPage />} />
            <Route path="/servicos" element={<Services />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/confirmacao" element={<ConfirmacaoPage />} />
            <Route path="/lista-reservas" element={<UserRoute><ListaReservasPage /></UserRoute>} />
            <Route path="/reservations" element={<AdminRoute><Reservations /></AdminRoute>} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  )
}

export default App
