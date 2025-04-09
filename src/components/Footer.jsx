import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="bg-wine-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {/* Sobre o Hotel */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-playfair font-bold mb-4">Star Hotel</h3>
            <p className="text-gray-300">
              Excelente atendimento com todo carinho e dedicação para tornar sua estadia inesquecível.
              Conforto e qualidade em um ambiente acolhedor no coração de Limoeiro-PE.
            </p>
          </div>

          {/* Informações Principais */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-playfair font-bold mb-4">Informações Principais</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <p className="text-gray-300">(81) 3628-2795</p>
              </div>
              <div className="flex items-center justify-center">
                <p className="text-gray-300">(81) 98284-7055</p>
              </div>
              <div className="flex items-center justify-center">
                <p className="text-gray-300">
                  Avenida Jerônimo Heráclio, 723, Limoeiro-PE
                </p>
              </div>
            </div>
          </div>

          {/* Redes Sociais */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-playfair font-bold mb-4">Redes Sociais</h3>
            <div className="flex space-x-6 justify-center">
              <a
                href="https://facebook.com/starhotellimoeiro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                <FaFacebook size={30} />
              </a>
              <a
                href="https://instagram.com/starhotellimoeiro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                <FaInstagram size={30} />
              </a>
              <a
                href="https://wa.me/5581982847055"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                <FaWhatsapp size={30} />
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