import React from 'react';
import { FaWifi, FaCar, FaCoffee, FaBed, FaTv, FaRegSmile, FaClock } from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      icon: <FaWifi className="text-blue-600" size={40} />,
      title: 'Wi-Fi Grátis',
      description: 'Acesso à internet de alta velocidade em todo o hotel para sua comodidade.'
    },
    {
      icon: <FaCar className="text-blue-600" size={40} />,
      title: 'Estacionamento',
      description: 'Estacionamento coberto com vagas ilimitadas por quarto para sua tranquilidade.'
    },
    {
      icon: <FaCoffee className="text-blue-600" size={40} />,
      title: 'Café da Manhã',
      description: 'Café da manhã não incluso, mas temos opções próximas ao hotel.'
    },
    {
      icon: <FaBed className="text-blue-600" size={40} />,
      title: 'Serviço de Quarto',
      description: 'Serviço de quarto disponível para tornar sua estadia ainda mais confortável.'
    },
    {
      icon: <FaTv className="text-blue-600" size={40} />,
      title: 'Televisão',
      description: 'Televisão em todos os quartos para seu entretenimento e lazer.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Nossos Serviços
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Oferecemos serviços essenciais para garantir uma estadia confortável e agradável.
            Tudo pensado para sua comodidade e satisfação.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-8 transform transition duration-300 hover:scale-105">
              <div className="flex justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                {service.title}
              </h3>
              <p className="text-gray-600 text-center">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bloco adicional de informações */}
        <div className="mt-16 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Atendimento Especial
              </h3>
              <p className="text-gray-600 mb-4">
                No Star Hotel, acreditamos que o atendimento faz toda a diferença. Nossa equipe está sempre pronta para atender suas necessidades e garantir que sua estadia seja perfeita.
              </p>
              <div className="flex items-center mb-4">
                <FaRegSmile className="text-blue-600 mr-3" size={24} />
                <p className="text-gray-700">Equipe atenciosa e prestativa</p>
              </div>
              <div className="flex items-center mb-4">
                <FaClock className="text-blue-600 mr-3" size={24} />
                <p className="text-gray-700">Recepção 24 horas</p>
              </div>
              <div className="mt-4">
                <a
                  href="/contato"
                  className="inline-block bg-wine-700 text-white py-2 px-4 rounded hover:bg-wine-800 transition"
                >
                  Entre em Contato
                </a>
              </div>
            </div>
            <div className="bg-blue-50 p-8 flex items-center justify-center">
              <div className="text-center">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Clima em Limoeiro</h4>
                <p className="text-gray-600 mb-2">
                  Limoeiro tem um clima tropical agradável durante todo o ano.
                </p>
                <p className="text-gray-600 mb-2">
                  Temperatura média: 24°C - 32°C
                </p>
                <p className="text-gray-600">
                  Melhor época para visitar: Junho a Agosto
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services; 