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
import Chatbot from './components/Chatbot'
import './index.css'

// Componente simples para rota protegida de Admin
function AdminRoute({ children }) {
  const currentUser = Parse.User.current();
  // Verifica se o usuário logado é admin_hotel em vez de checar a propriedade isAdmin
  const isAdmin = currentUser && currentUser.get('username') === 'admin_hotel';
  return isAdmin ? children : <Navigate to="/login" replace />; 
}

// Componente simples para rota protegida de usuário logado
function UserRoute({ children }) {
  const currentUser = Parse.User.current();
  return currentUser ? children : <Navigate to="/login" replace />; 
}

function App() {
  const [authKey, setAuthKey] = useState(0); 
  const [currentUser, setCurrentUser] = useState(Parse.User.current());

  useEffect(() => {
    const handleUserChange = () => {
      setAuthKey(prevKey => prevKey + 1);
      setCurrentUser(Parse.User.current());
    };
    window.addEventListener('userChange', handleUserChange);
    return () => window.removeEventListener('userChange', handleUserChange);
  }, []);

  // Verifica se o usuário atual é admin
  const isAdmin = currentUser && currentUser.get('username') === 'admin_hotel';

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/reservas" element={<ReservasPage />} />
            <Route path="/confirmacao" element={<ConfirmacaoPage />} />
            <Route path="/galeria" element={<GaleriaPage />} />
            <Route path="/sobre" element={<SobrePage />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/servicos" element={<Services />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/reservations"
              element={
                <AdminRoute>
                  <Reservations />
                </AdminRoute>
              }
            />
            <Route
              path="/lista-reservas"
              element={
                <UserRoute>
                  <ListaReservasPage />
                </UserRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
        <Chatbot />
      </div>
    </Router>
  );
}

export default App
