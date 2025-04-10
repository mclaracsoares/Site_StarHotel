import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
            Bem-vindo ao Star Hotel
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Conforto e qualidade para sua estadia em Limoeiro-PE
          </p>
          <a
            href="/reservas"
            className="inline-block bg-wine-700 text-white py-3 px-8 rounded-md text-lg font-medium hover:bg-wine-800 transition"
          >
            Reserve Agora
          </a>
        </div>
      </section>

      {/* Tipos de Quartos */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold text-gray-900 sm:text-4xl">
              Nossos Quartos
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Escolha o quarto ideal para a sua estadia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="/public/images/duplo.jpg"
                alt="Quarto Duplo"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Quarto Duplo
                </h3>
                <p className="text-gray-600 mb-4">
                  Conforto e praticidade para sua estadia.
                </p>
                <a
                  href="/galeria"
                  className="inline-block bg-wine-700 text-white py-2 px-4 rounded hover:bg-wine-800 transition"
                >
                  Reservar
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="/public/images/casal.jpg"
                alt="Quarto Casal"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Quarto Casal
                </h3>
                <p className="text-gray-600 mb-4">
                  Uma cama de casal para um descanso perfeito.
                </p>
                <a
                  href="/galeria"
                  className="inline-block bg-wine-700 text-white py-2 px-4 rounded hover:bg-wine-800 transition"
                >
                  Reservar
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="/public/images/triplo.jpg"
                alt="Quarto Triplo"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Quarto Triplo
                </h3>
                <p className="text-gray-600 mb-4">
                  Ideal para famílias ou grupos de amigos.
                </p>
                <a
                  href="/galeria"
                  className="inline-block bg-wine-700 text-white py-2 px-4 rounded hover:bg-wine-800 transition"
                >
                  Reservar
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="/images/flat.jpg"
                alt="Flat"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Flat
                </h3>
                <p className="text-gray-600 mb-4">
                  Mini apartamento completo para estadias longas.
                </p>
                <a
                  href="/galeria"
                  className="inline-block bg-wine-700 text-white py-2 px-4 rounded hover:bg-wine-800 transition"
                >
                  Reservar
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Sobre */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-4">
                Sobre o Star Hotel
              </h2>
              <p className="text-gray-600 mb-4">
                Situado no coração de Limoeiro-PE, o Star Hotel oferece uma experiência única de hospedagem, combinando conforto, praticidade e excelente atendimento.
              </p>
              <p className="text-gray-600 mb-6">
                Nossa equipe está sempre pronta para garantir que sua estadia seja perfeita, oferecendo um serviço personalizado e atencioso.
              </p>
              <a 
                href="/sobre" 
                className="inline-block border-2 border-wine-700 text-wine-700 py-2 px-6 rounded hover:bg-wine-700 hover:text-white transition"
              >
                Conheça Mais
              </a>
            </div>
            <div className="mt-8 md:mt-0">
              <img 
                src="/images/hotel_exterior.jpg" 
                alt="Star Hotel" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 