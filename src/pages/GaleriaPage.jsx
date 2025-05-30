import React, { useState, useEffect, useRef } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const GaleriaPage = () => {
  const roomTypes = [
    {
      id: 'triplo',
      title: 'Quarto Triplo',
      description: 'Perfeito para famílias ou grupos de amigos, nosso quarto triplo oferece conforto e espaço para todos. Escolha entre 3 camas de solteiro ou 1 cama de casal e 1 solteiro, garantindo uma estadia agradável para todos os hóspedes.',
      price: 'R$ 340 a diária',
      features: [
        '3 camas de solteiro ou 1 de casal e 1 solteiro',
        'Ar condicionado',
        'Televisão',
        'Banheiro privativo',
        'Wi-Fi grátis'
      ],
      images: [
        '/images/triplo.jpg',
        '/images/triplo_2.jpg',
        '/images/triplo_3.jpg'
      ]
    },
    {
      id: 'duplo',
      title: 'Quarto Duplo',
      description: 'Ideal para casais ou amigos, nosso quarto duplo combina conforto e praticidade. Com duas camas de solteiro, oferece o espaço perfeito para uma estadia relaxante.',
      price: 'R$ 230 a diária',
      features: [
        'Duas camas de solteiro',
        'Ar condicionado',
        'Televisão',
        'Banheiro privativo',
        'Wi-Fi grátis'
      ],
      images: [
        '/images/duplo.jpg',
        '/images/duplo_2.jpg',
        '/images/duplo_3.jpg'
      ]
    },
    {
      id: 'casal',
      title: 'Quarto Casal',
      description: 'Romântico e aconchegante, nosso quarto de casal é perfeito para momentos especiais. Com uma cama de casal confortável, oferece o ambiente ideal para um descanso revigorante.',
      price: 'R$ 230 a diária',
      features: [
        'Uma cama de casal',
        'Ar condicionado',
        'Televisão',
        'Banheiro privativo',
        'Wi-Fi grátis'
      ],
      images: [
        '/images/casal.jpg',
        '/images/casal_2.jpg',
        '/images/casal_3.jpg'
      ]
    },
    {
      id: 'flat',
      title: 'Flat',
      description: 'Viva como em casa com nosso flat exclusivo. Um mini apartamento completo com sala, sofá, cozinha equipada, uma cama de casal e uma de solteiro. Perfeito para estadias mais longas ou quem busca mais conforto e independência.',
      price: 'R$ 1200 por mês',
      note: 'Só aluga mensal',
      features: [
        'Mini apartamento completo',
        'Sala com sofá',
        'Cozinha equipada',
        'Uma cama de casal e uma de solteiro',
        'Ar condicionado',
        'Televisão',
        'Wi-Fi grátis'
      ],
      images: [
        '/images/flat.jpg',
        '/images/flat_2.jpg',
        '/images/flat_3.jpg'
      ]
    }
  ];

  // Estado para controlar o carrossel de imagens
  const [currentImageIndex, setCurrentImageIndex] = useState({
    triplo: 0,
    duplo: 0,
    casal: 0,
    flat: 0
  });

  // Estado para controlar se o carrossel está pausado
  const [isPaused, setIsPaused] = useState({
    triplo: false,
    duplo: false,
    casal: false,
    flat: false
  });

  // Referência ao intervalo para poder pausá-lo e continuá-lo
  const intervalRef = useRef(null);

  // Efeito para alternar automaticamente as imagens a cada 5 segundos
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      roomTypes.forEach(room => {
        // Só avança a imagem se o carrossel não estiver pausado para este quarto
        if (!isPaused[room.id]) {
          setCurrentImageIndex(prev => ({
            ...prev,
            [room.id]: (prev[room.id] + 1) % room.images.length
          }));
        }
      });
    }, 5000); // 5000 milissegundos = 5 segundos

    return () => {
      // Limpa o intervalo quando o componente é desmontado
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused]); // Adiciona isPaused como dependência para que o efeito seja recriado quando ele mudar

  // Funções para navegar pelas imagens
  const nextImage = (roomTypeId) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [roomTypeId]: (prev[roomTypeId] + 1) % roomTypes.find(room => room.id === roomTypeId).images.length
    }));
  };

  const prevImage = (roomTypeId) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [roomTypeId]: (prev[roomTypeId] - 1 + roomTypes.find(room => room.id === roomTypeId).images.length) % roomTypes.find(room => room.id === roomTypeId).images.length
    }));
  };

  // Funções para pausar e continuar o carrossel
  const pauseCarousel = (roomTypeId) => {
    setIsPaused(prev => ({
      ...prev,
      [roomTypeId]: true
    }));
  };

  const resumeCarousel = (roomTypeId) => {
    setIsPaused(prev => ({
      ...prev,
      [roomTypeId]: false
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Nossas Acomodações
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Descubra o conforto e a elegância dos nossos quartos, projetados para tornar sua estadia inesquecível. 
            Cada acomodação foi pensada para oferecer o máximo de conforto e praticidade, com todos os serviços 
            necessários para uma experiência perfeita.
          </p>
        </div>

        <div className="space-y-16">
          {roomTypes.map((room) => (
            <div key={room.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Carrossel de imagens */}
                <div 
                  className="relative"
                  onMouseEnter={() => pauseCarousel(room.id)}
                  onMouseLeave={() => resumeCarousel(room.id)}
                >
                  <div className="h-80 md:h-full relative">
                    <img
                      src={room.images[currentImageIndex[room.id]]}
                      alt={`${room.title} - Imagem ${currentImageIndex[room.id] + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {/* Controles do carrossel */}
                    <button 
                      onClick={() => prevImage(room.id)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full text-gray-700 hover:bg-opacity-100 transition"
                    >
                      <FaArrowLeft />
                    </button>
                    <button 
                      onClick={() => nextImage(room.id)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full text-gray-700 hover:bg-opacity-100 transition"
                    >
                      <FaArrowRight />
                    </button>
                    {/* Indicador de slides */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                      {room.images.map((_, index) => (
                        <div 
                          key={index}
                          className={`h-2 w-2 rounded-full ${currentImageIndex[room.id] === index ? 'bg-white' : 'bg-gray-400'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Detalhes do quarto */}
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {room.title}
                  </h3>
                  <p className="text-blue-600 font-semibold text-lg mb-4">
                    {room.price}
                    {room.note && <span className="text-gray-500 text-sm ml-2">({room.note})</span>}
                  </p>
                  <p className="text-gray-600 mb-6">
                    {room.description}
                  </p>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">
                      Características:
                    </h4>
                    <ul className="space-y-2">
                      {room.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <span className="mr-2 text-blue-500">•</span> {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6">
                    <a
                      href="/reservas"
                      className="inline-block bg-wine-700 text-white py-2 px-6 rounded-md hover:bg-wine-800 transition"
                    >
                      Reservar Agora
                    </a>
                  </div>
                </div>
              </div>
        </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GaleriaPage; 