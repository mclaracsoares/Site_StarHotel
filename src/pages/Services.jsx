import React from 'react';
import { FaSwimmingPool, FaSpa, FaUtensils, FaWifi, FaConciergeBell, FaParking } from 'react-icons/fa';

const services = [
  {
    icon: <FaSwimmingPool className="text-4xl text-blue-600" />,
    title: 'Piscina',
    description: 'Piscina aquecida com vista panorâmica e serviço de bar à beira da piscina.'
  },
  {
    icon: <FaSpa className="text-4xl text-blue-600" />,
    title: 'Spa & Bem-estar',
    description: 'Tratamentos relaxantes, massagens e serviços de beleza em nosso spa exclusivo.'
  },
  {
    icon: <FaUtensils className="text-4xl text-blue-600" />,
    title: 'Restaurante',
    description: 'Culinária internacional com chefs renomados e ambiente sofisticado.'
  },
  {
    icon: <FaWifi className="text-4xl text-blue-600" />,
    title: 'Wi-Fi Gratuito',
    description: 'Internet de alta velocidade disponível em todas as áreas do hotel.'
  },
  {
    icon: <FaConciergeBell className="text-4xl text-blue-600" />,
    title: 'Serviço de Concierge',
    description: 'Assistência personalizada para tornar sua estadia ainda mais especial.'
  },
  {
    icon: <FaParking className="text-4xl text-blue-600" />,
    title: 'Estacionamento',
    description: 'Estacionamento coberto e seguro para hóspedes.'
  }
];

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Nossos Serviços
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Descubra tudo o que temos para oferecer para tornar sua estadia inesquecível
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-8 transform transition duration-300 hover:scale-105"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services; 