import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="bg-wine-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sobre o Hotel */}
          <div>
            <h3 className="text-xl font-playfair font-bold mb-4">Star Hotel</h3>
            <p className="text-gray-300">
              Elegância e conforto no coração de Limoeiro-PE. Oferecemos uma experiência única de hospedagem.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-xl font-playfair font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-white">
                  Início
                </a>
              </li>
              <li>
                <a href="/sobre" className="text-gray-300 hover:text-white">
                  Sobre
                </a>
              </li>
              <li>
                <a href="/galeria" className="text-gray-300 hover:text-white">
                  Galeria
                </a>
              </li>
              <li>
                <a href="/servicos" className="text-gray-300 hover:text-white">
                  Serviços
                </a>
              </li>
              <li>
                <a href="/contato" className="text-gray-300 hover:text-white">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-xl font-playfair font-bold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <i className="fas fa-phone mr-2"></i>
                <span className="text-gray-300">(81) 9999-9999</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-2"></i>
                <span className="text-gray-300">contato@starhotel.com.br</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-map-marker-alt mr-2"></i>
                <span className="text-gray-300">
                  Rua Principal, 123 - Centro, Limoeiro-PE
                </span>
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="text-xl font-playfair font-bold mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://wa.me/5581999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                <FaWhatsapp size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            &copy; {new Date().getFullYear()} Star Hotel. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer