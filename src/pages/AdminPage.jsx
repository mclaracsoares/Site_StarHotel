import { useState, useEffect } from 'react'
import Parse from 'parse/dist/parse.min.js'

function AdminPage() {
  const [reservas, setReservas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchReservas()
  }, [])

  const fetchReservas = async () => {
    try {
      const Reserva = Parse.Object.extend('Reserva')
      const query = new Parse.Query(Reserva)
      query.descending('createdAt')
      const results = await query.find()
      
      const reservasData = results.map(reserva => ({
        id: reserva.id,
        nome: reserva.get('nome'),
        email: reserva.get('email'),
        telefone: reserva.get('telefone'),
        checkIn: reserva.get('checkIn'),
        checkOut: reserva.get('checkOut'),
        adultos: reserva.get('adultos'),
        criancas: reserva.get('criancas'),
        tipoQuarto: reserva.get('tipoQuarto'),
        observacoes: reserva.get('observacoes'),
        status: reserva.get('status'),
        createdAt: reserva.get('createdAt')
      }))

      setReservas(reservasData)
      setLoading(false)
    } catch (error) {
      console.error('Erro ao buscar reservas:', error)
      setError('Erro ao carregar reservas')
      setLoading(false)
    }
  }

  const updateStatus = async (id, newStatus) => {
    try {
      const Reserva = Parse.Object.extend('Reserva')
      const query = new Parse.Query(Reserva)
      const reserva = await query.get(id)
      
      reserva.set('status', newStatus)
      await reserva.save()
      
      // Atualizar a lista de reservas
      fetchReservas()
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
      alert('Erro ao atualizar status da reserva')
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR')
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">Carregando...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-playfair font-bold text-wine-900 text-center mb-12">
        Painel Administrativo
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-wine-900 text-white">
              <th className="px-6 py-3 text-left">Nome</th>
              <th className="px-6 py-3 text-left">E-mail</th>
              <th className="px-6 py-3 text-left">Telefone</th>
              <th className="px-6 py-3 text-left">Check-in</th>
              <th className="px-6 py-3 text-left">Check-out</th>
              <th className="px-6 py-3 text-left">Hóspedes</th>
              <th className="px-6 py-3 text-left">Quarto</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reservas.map((reserva) => (
              <tr key={reserva.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{reserva.nome}</td>
                <td className="px-6 py-4">{reserva.email}</td>
                <td className="px-6 py-4">{reserva.telefone}</td>
                <td className="px-6 py-4">{formatDate(reserva.checkIn)}</td>
                <td className="px-6 py-4">{formatDate(reserva.checkOut)}</td>
                <td className="px-6 py-4">
                  {reserva.adultos} Adultos
                  {reserva.criancas > 0 && `, ${reserva.criancas} Crianças`}
                </td>
                <td className="px-6 py-4">
                  {reserva.tipoQuarto === 'standard' && 'Standard'}
                  {reserva.tipoQuarto === 'deluxe' && 'Deluxe'}
                  {reserva.tipoQuarto === 'suite' && 'Suíte'}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      reserva.status === 'confirmada'
                        ? 'bg-green-100 text-green-800'
                        : reserva.status === 'cancelada'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {reserva.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    {reserva.status !== 'confirmada' && (
                      <button
                        onClick={() => updateStatus(reserva.id, 'confirmada')}
                        className="text-green-600 hover:text-green-800"
                      >
                        Confirmar
                      </button>
                    )}
                    {reserva.status !== 'cancelada' && (
                      <button
                        onClick={() => updateStatus(reserva.id, 'cancelada')}
                        className="text-red-600 hover:text-red-800"
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminPage