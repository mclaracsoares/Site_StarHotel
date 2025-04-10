import { Link } from 'react-router-dom'
import WeatherWidget from '../components/WeatherWidget'

function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="/images/hotel-banner.jpg"
            alt="Star Hotel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6">
              Bem-vindo ao Star Hotel
            </h1>
            <p className="text-xl mb-8">
              Descubra a elegância e o conforto em um ambiente acolhedor no coração de Limoeiro-PE.
            </p>
            <Link
              to="/reservas"
              className="bg-wine-900 text-white px-8 py-3 rounded-lg hover:bg-wine-800 transition duration-300"
            >
              Reservar Agora
            </Link>
          </div>
        </div>
      </section>

      {/* Quartos Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-playfair font-bold text-wine-900 text-center mb-12">
            Nossos Quartos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Quarto Duplo */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="/images/duplo.jpg"
                alt="Quarto Duplo"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Quarto Duplo</h3>
                <p className="text-gray-600 mb-4">
                  Conforto e praticidade para sua estadia.
                </p>
                <Link
                  to="/galeria"
                  className="btn-primary inline-block"
                >
                  Saiba Mais
                </Link>
              </div>
            </div>

            {/* Quarto Casal */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="/images/casal.jpg"
                alt="Quarto Casal"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Quarto Casal</h3>
                <p className="text-gray-600 mb-4">
                  Uma cama de casal para um descanso perfeito.
                </p>
                <Link
                  to="/galeria"
                  className="btn-primary inline-block"
                >
                  Saiba Mais
                </Link>
              </div>
            </div>

            {/* Quarto Triplo */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="/images/triplo.jpg"
                alt="Quarto Triplo"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Quarto Triplo</h3>
                <p className="text-gray-600 mb-4">
                  Ideal para famílias ou grupos de amigos.
                </p>
                <Link
                  to="/galeria"
                  className="btn-primary inline-block"
                >
                  Saiba Mais
                </Link>
              </div>
            </div>

            {/* Flat */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
              
                src="/images/flat.jpg"              
                alt="Flat"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Flat</h3>
                <p className="text-gray-600 mb-4">
                  Mini apartamento completo para estadias longas.
                </p>
                <Link
                  to="/galeria"
                  className="btn-primary inline-block"
                >
                  Saiba Mais
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clima Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-playfair font-bold text-wine-900 text-center mb-12">
            Clima em Limoeiro
          </h2>
          <div className="max-w-md mx-auto">
            <WeatherWidget />
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage