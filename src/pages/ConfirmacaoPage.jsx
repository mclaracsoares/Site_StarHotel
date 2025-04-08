import { useLocation, Link } from 'react-router-dom'

function ConfirmacaoPage() {
  const location = useLocation()
  const { reserva } = location.state || {}

  if (!reserva) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-playfair font-bold text-wine-900 mb-6">
            Reserva não encontrada
          </h1>
          <p className="text-gray-600 mb-8">
            Não foi possível encontrar os detalhes da sua reserva.
          </p>
          <Link
            to="/reservas"
            className="bg-wine-900 text-white px-8 py-3 rounded-lg hover:bg-wine-800 transition duration-300"
          >
            Fazer Nova Reserva
          </Link>
        </div>
      </div>
    )
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <i className="fas fa-check-circle text-6xl text-green-500 mb-4"></i>
          <h1 className="text-4xl font-playfair font-bold text-wine-900 mb-4">
            Reserva Confirmada!
          </h1>
          <p className="text-gray-600">
            Obrigado por escolher o Star Hotel. Sua reserva foi recebida com sucesso.
          </p>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-playfair font-bold text-wine-900 mb-6">
            Detalhes da Reserva
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Dados Pessoais</h3>
              <p className="text-gray-600">
                <span className="font-semibold">Nome:</span> {reserva.nome}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">E-mail:</span> {reserva.email}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Telefone:</span> {reserva.telefone}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Período da Estadia</h3>
              <p className="text-gray-600">
                <span className="font-semibold">Check-in:</span> {formatDate(reserva.checkIn)}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Check-out:</span> {formatDate(reserva.checkOut)}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Detalhes da Hospedagem</h3>
              <p className="text-gray-600">
                <span className="font-semibold">Adultos:</span> {reserva.adultos}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Crianças:</span> {reserva.criancas}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Tipo de Quarto:</span>{' '}
                {reserva.tipoQuarto === 'standard'
                  ? 'Quarto Standard'
                  : reserva.tipoQuarto === 'deluxe'
                  ? 'Quarto Deluxe'
                  : 'Suíte'}
              </p>
            </div>
          </div>

          {reserva.observacoes && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Observações</h3>
              <p className="text-gray-600">{reserva.observacoes}</p>
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Enviamos um e-mail com os detalhes da sua reserva. Em caso de dúvidas, entre em contato
              conosco.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/"
                className="bg-wine-900 text-white px-8 py-3 rounded-lg hover:bg-wine-800 transition duration-300"
              >
                Voltar para o Início
              </Link>
              <Link
                to="/contato"
                className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg hover:bg-gray-300 transition duration-300"
              >
                Entrar em Contato
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmacaoPage