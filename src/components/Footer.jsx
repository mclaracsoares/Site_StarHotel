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

          {/* Contato e Informações */}
          <div>
            <h3 className="text-xl font-playfair font-bold mb-4">Contato e Informações</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Wifi Grátis</li>
              <li className="text-gray-300">Estacionamento</li>
              <li className="text-gray-300">Café da manhã não incluso</li>
              <li className="text-gray-300">
                <span className="font-semibold">Endereço:</span> Avenida Jerônimo Heráclio, 723, Limoeiro-PE
              </li>
              <li className="text-gray-300">
                <span className="font-semibold">E-mail:</span> Starhotellimoeiro@hotmail.com
              </li>
              <li className="text-gray-300">
                <a href="https://wa.me/5581982847055" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  <span className="font-semibold">Whatsapp:</span> (81) 98284-7055
                </a>
              </li>
              <li className="text-gray-300">
                <span className="font-semibold">Fixo:</span> (81) 3628-2795
              </li>
            </ul>
          </div>

          {/* Tipos de Quarto */}
          <div>
            <h3 className="text-xl font-playfair font-bold mb-4">Acomodações</h3>
             <ul className="space-y-2">
              <li className="text-gray-300">Flat</li>
              <li className="text-gray-300">Quarto Duplo</li>
              <li className="text-gray-300">Quarto de Casal</li>
              <li className="text-gray-300">Quarto Triplo</li>
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
                href="https://wa.me/5581982847055"
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