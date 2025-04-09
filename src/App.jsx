import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import HomePage from './pages/HomePage'
import ReservasPage from './pages/ReservasPage'
import AdminPage from './pages/AdminPage'
import ConfirmacaoPage from './pages/ConfirmacaoPage'
import GaleriaPage from './pages/GaleriaPage'
import SobrePage from './pages/SobrePage'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Services from './pages/Services'
import Reservations from './pages/Reservations'
import './index.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reservas" element={<ReservasPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/confirmacao" element={<ConfirmacaoPage />} />
            <Route path="/galeria" element={<GaleriaPage />} />
            <Route path="/sobre" element={<SobrePage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/reservations" element={<Reservations />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  )
}

export default App
