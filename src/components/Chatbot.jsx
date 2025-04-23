import React, { useState } from 'react';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const questionsAndAnswers = {
    "tipos de quartos": "Oferecemos qutro tipos de quartos, Todos com ar-condicionado, TV, frigobar e Wi-Fi gratuito. Verifique a 'Galeria' do Site para mais detalhes.",
    "preço": "Os preços variam conforme o tipo de quarto Verifique a aba 'Galeria' do Site para mais detalhes.",
    "check-in": "O check-in é a partir das 14h e o check-out até as 12h.",
    "estacionamento": "Sim, oferecemos estacionamento gratuito para todos os hóspedes sem limites de vaga.",
    "serviços": "Incluímos, Wi-Fi, estacionamento e serviço de quarto.",
    "cancelmento": "Para cancelar uma reserva, entre em contato pelo WhatsApp do Hotel (Verifique a aba 'Contato' do Site).",
    "pagamento": "Aceitamos PIX, dinheiro e cartão. O pagamento é feito diretamente no hotel."
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage = input.toLowerCase();
    let botResponse = "Desculpe, não entendi sua pergunta. Você pode tentar perguntar sobre: tipos de quartos, preços, check-in, estacionamento, serviços, cancelamento ou formas de pagamento.";

    for (const [key, value] of Object.entries(questionsAndAnswers)) {
      if (userMessage.includes(key)) {
        botResponse = value;
        break;
      }
    }

    setMessages([...messages, 
      { text: input, isUser: true },
      { text: botResponse, isUser: false }
    ]);
    setInput('');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-wine-600 text-white p-4 rounded-full shadow-lg hover:bg-wine-700 transition-colors"
        >
          <FaRobot size={24} />
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col">
          <div className="bg-wine-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Assistente Virtual</h3>
            <button onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.isUser ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    message.isUser
                      ? 'bg-wine-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Digite sua mensagem..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-wine-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-wine-600 text-white p-2 rounded-lg hover:bg-wine-700 transition-colors"
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot; 