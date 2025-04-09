import { useLocation } from 'react-router-dom'

function ConfirmacaoPage() {
  const location = useLocation()
  const { reserva } = location.state || {}

  if (!reserva) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-playfair font-bold text-wine-900 mb-4">
          Reserva não encontrada
        </h1>
        <p className="text-gray-600">
          Por favor, faça uma nova reserva.
        </p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-playfair font-bold text-wine-900 text-center mb-8">
          Reserva Confirmada!
        </h1>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Detalhes da Reserva</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="mb-2"><span className="font-semibold">Nome:</span> {reserva.nome}</p>
              <p className="mb-2"><span className="font-semibold">Email:</span> {reserva.email}</p>
              <p className="mb-2"><span className="font-semibold">Telefone:</span> {reserva.telefone}</p>
              <p className="mb-2"><span className="font-semibold">Check-in:</span> {new Date(reserva.dataEntrada).toLocaleDateString()}</p>
              <p className="mb-2"><span className="font-semibold">Check-out:</span> {new Date(reserva.dataSaida).toLocaleDateString()}</p>
              <p className="mb-2"><span className="font-semibold">Tipo de Quarto:</span> {reserva.tipoQuarto}</p>
              <p className="mb-2"><span className="font-semibold">Número de Pessoas:</span> {reserva.numeroPessoas}</p>
              {reserva.observacoes && (
                <p className="mb-2"><span className="font-semibold">Observações:</span> {reserva.observacoes}</p>
              )}
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Um email de confirmação foi enviado para {reserva.email}
            </p>
            <a
              href="/"
              className="inline-block bg-wine-900 text-white px-6 py-3 rounded-lg hover:bg-wine-800 transition duration-300"
            >
              Voltar para a Página Inicial
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmacaoPage