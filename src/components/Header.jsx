import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaStar, FaBars, FaTimes } from 'react-icons/fa'
import Parse from '../config/back4app'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(Parse.User.current())
  const navigate = useNavigate()

  useEffect(() => {
    const handleUserChange = () => {
      setCurrentUser(Parse.User.current())
    }
    window.addEventListener('userChange', handleUserChange)
    return () => window.removeEventListener('userChange', handleUserChange)
  }, [])

  const isAdmin = currentUser && currentUser.get('isAdmin') === true

  const handleLogout = async () => {
    try {
      await Parse.User.logOut()
      setCurrentUser(null)
      window.dispatchEvent(new Event('userChange'))
      setIsMenuOpen(false)
      navigate('/')
    } catch (error) {
      console.error("Erro ao fazer logout:", error)
    }
  }

  return (
    <header className="relative w-full bg-white shadow-md z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/images/logo.png" 
              alt="Star Hotel Logo" 
              className="h-8 w-auto"
            />
            <div className="text-2xl font-playfair font-bold text-wine-900">
              Star Hotel
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-wine-900">
              Início
            </Link>
            <Link to="/sobre" className="text-gray-700 hover:text-wine-900">
              Sobre
            </Link>
            <Link to="/galeria" className="text-gray-700 hover:text-wine-900">
              Galeria
            </Link>
            <Link to="/servicos" className="text-gray-700 hover:text-wine-900">
              Serviços
            </Link>
            <Link to="/contato" className="text-gray-700 hover:text-wine-900">
              Contato
            </Link>

            {currentUser && !isAdmin && (
              <Link to="/lista-reservas" className="text-gray-700 hover:text-wine-900">
                Minhas Reservas
              </Link>
            )}
            {isAdmin && (
              <Link to="/reservations" className="text-gray-700 hover:text-wine-900">
                Gerenciar Reservas
              </Link>
            )}
            
            {!currentUser ? (
              <Link to="/login" className="text-gray-700 hover:text-wine-900">
                Login
              </Link>
            ) : (
              <button onClick={handleLogout} className="text-gray-700 hover:text-wine-900">
                Logout
              </button>
            )}

            <Link to="/reservas" className="btn-primary ml-4">
              Reservar
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-wine-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Link
              to="/"
              className="block text-gray-700 hover:text-wine-900"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link
              to="/sobre"
              className="block text-gray-700 hover:text-wine-900"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre
            </Link>
            <Link
              to="/galeria"
              className="block text-gray-700 hover:text-wine-900"
              onClick={() => setIsMenuOpen(false)}
            >
              Galeria
            </Link>
            <Link
              to="/servicos"
              className="block text-gray-700 hover:text-wine-900"
              onClick={() => setIsMenuOpen(false)}
            >
              Serviços
            </Link>
            <Link
              to="/contato"
              className="block text-gray-700 hover:text-wine-900"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </Link>
            
            {currentUser && !isAdmin && (
              <Link
                to="/lista-reservas"
                className="block text-gray-700 hover:text-wine-900"
                onClick={() => setIsMenuOpen(false)}
              >
                Minhas Reservas
              </Link>
            )}
            {isAdmin && (
              <Link
                to="/reservations"
                className="block text-gray-700 hover:text-wine-900"
                onClick={() => setIsMenuOpen(false)}
              >
                Gerenciar Reservas
              </Link>
            )}
            
            {!currentUser ? (
              <Link
                to="/login"
                className="block text-gray-700 hover:text-wine-900"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="block w-full text-left text-gray-700 hover:text-wine-900"
              >
                Logout
              </button>
            )}

            <Link
              to="/reservas"
              className="block btn-primary text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Reservar
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header