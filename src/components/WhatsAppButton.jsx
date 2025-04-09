import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'

function WhatsAppButton() {
  const phoneNumber = '5581982847055' // Número com código do país (Brasil = 55)
  const message = 'Olá! Gostaria de mais informações sobre o Star Hotel.' // Mensagem padrão (opcional)
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 z-50"
      aria-label="Conversar no WhatsApp"
    >
      <FaWhatsapp size={28} />
    </a>
  )
}

export default WhatsAppButton 