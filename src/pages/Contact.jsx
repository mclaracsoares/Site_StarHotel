import React from 'react';
import { FaPhone, FaEnvelope, FaWhatsapp, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Entre em Contato
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Estamos aqui para ajudar. Entre em contato conosco através dos canais abaixo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Informações de Contato */}
          <div className="bg-white rounded-xl shadow-lg p-8 transform transition duration-300 hover:shadow-xl">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Informações de Contato
            </h3>
            <div className="space-y-6">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-300">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <FaWhatsapp className="text-green-600" size={24} />
                </div>
                <div>
                  <p className="text-gray-600">WhatsApp</p>
                  <p className="text-gray-900 font-medium">(81) 98284-7055</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-300">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FaPhone className="text-blue-600" size={24} />
                </div>
                <div>
                  <p className="text-gray-600">Telefone Fixo</p>
                  <p className="text-gray-900 font-medium">(81) 3628-2795</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-300">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <FaEnvelope className="text-red-600" size={24} />
                </div>
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="text-gray-900 font-medium">starhotellimoeiro@hotmail.com</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-300">
                <div className="bg-yellow-100 p-3 rounded-full mr-4">
                  <FaClock className="text-yellow-600" size={24} />
                </div>
                <div>
                  <p className="text-gray-600">Funcionamento</p>
                  <p className="text-gray-900 font-medium">24 horas</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-300">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <FaMapMarkerAlt className="text-purple-600" size={24} />
                </div>
                <div>
                  <p className="text-gray-600">Endereço</p>
                  <p className="text-gray-900 font-medium">Avenida Jerônimo Heráclio, 723, Limoeiro-PE</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mapa */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.231727313775!2d-35.44597777073087!3d-7.8708037748635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7abbc791610bd87%3A0x8512bda157e8b879!2sStar%20Hotel%20Limoeiro!5e0!3m2!1spt-BR!2sbr!4v1744216919624!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[400px]"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 