import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ReservasPage from './pages/ReservasPage'
import AdminPage from './pages/AdminPage'
import ConfirmacaoPage from './pages/ConfirmacaoPage'
import './index.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/reservas" element={<ReservasPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/confirmacao" element={<ConfirmacaoPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App