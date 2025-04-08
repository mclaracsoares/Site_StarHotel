import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaStar, FaBars, FaTimes } from 'react-icons/fa'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed w-full bg-white shadow-md z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <div className="logo-container mr-3">
              <img 
                src="/images/logo.png" 
                alt="Star Hotel Logo" 
                className="w-8 h-8"
              />
            </div>
            <div className="text-2xl font-playfair font-bold text-wine-900">
              Star Hotel
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
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
            <Link to="/reservas" className="btn-primary">
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