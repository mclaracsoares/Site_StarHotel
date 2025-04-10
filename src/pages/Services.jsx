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

  const specialServices = [
    {
      icon: <FaRegSmile className="text-blue-600" size={24} />,
      title: 'Atendimento Especial',
      description: 'No Star Hotel, acreditamos que o atendimento faz toda a diferença. Nossa equipe está sempre pronta para atender suas necessidades e garantir que sua estadia seja perfeita.'
    },
    {
      icon: <FaClock className="text-blue-600" size={24} />,
      title: 'Recepção 24 horas',
      description: 'Recepção 24 horas disponível para atender suas necessidades.'
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
          {services.concat(specialServices).map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-xl">
              <div className="flex justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                {service.title}
              </h3>
              <p className="text-gray-600 text-center text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services; 