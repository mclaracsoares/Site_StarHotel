import { useState, useEffect } from 'react'
import Parse from '../config/back4app'

function ListaReservasPage() {
  const [reservas, setReservas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchReservas = async () => {
      const currentUser = Parse.User.current();
      if (!currentUser) {
        setError('Usuário não autenticado.');
        setLoading(false);
        return; // Não busca se não estiver logado
      }

      try {
        console.log('Iniciando busca de reservas...')
        
        // Verificar se o Parse está inicializado
        if (!Parse.applicationId) {
          throw new Error('Parse não está inicializado corretamente')
        }
        
        const Reserva = Parse.Object.extend('Reservation')
        const query = new Parse.Query(Reserva)
        
        // Filtrar por usuário logado
        query.equalTo('createdBy', currentUser); 

        query.descending('createdAt')
        
        console.log('Executando query para usuário:', currentUser.id)
        const results = await query.find()
        console.log('Resultados encontrados:', results.length)
        
        const reservasData = results.map(reserva => {
          console.log('Processando reserva:', reserva.id)
          return {
            id: reserva.id,
            nome: reserva.get('nome'),
            email: reserva.get('email'),
            telefone: reserva.get('telefone'),
            dataEntrada: reserva.get('dataEntrada'),
            dataSaida: reserva.get('dataSaida'),
            tipoQuarto: reserva.get('tipoQuarto'),
            numeroPessoas: reserva.get('numeroPessoas'),
            observacoes: reserva.get('observacoes'),
            status: reserva.get('status'),
            createdAt: reserva.get('createdAt')
          }
        })
        
        console.log('Reservas processadas:', reservasData)
        setReservas(reservasData)
        setLoading(false)
      } catch (error) {
        console.error('Erro detalhado ao buscar reservas:', error)
        setError(`Erro ao carregar reservas: ${error.message}`)
        setLoading(false)
      }
    }

    fetchReservas()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-gray-600">Carregando reservas...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-red-600">{error}</p>
        <p className="text-gray-600 mt-4">
          Por favor, verifique se:
          <ul className="list-disc list-inside mt-2">
            <li>As credenciais do Back4App estão corretas</li>
            <li>A classe "Reserva" existe no Back4App</li>
            <li>Você tem permissão para acessar as reservas</li>
          </ul>
        </p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-playfair font-bold text-wine-900 text-center mb-8">
        Reservas Existentes
      </h1>

      {reservas.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600">Nenhuma reserva encontrada.</p>
          <p className="text-gray-500 mt-2">
            Faça uma nova reserva através do formulário de reservas.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {reservas.map(reserva => (
            <div key={reserva.id} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-wine-900 mb-2">
                    {reserva.nome}
                  </h3>
                  <p className="text-gray-600">
                    <span className="font-semibold">Email:</span> {reserva.email}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Telefone:</span> {reserva.telefone}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">
                    <span className="font-semibold">Check-in:</span>{' '}
                    {reserva.dataEntrada ? new Date(reserva.dataEntrada).toLocaleDateString() : 'N/A'}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Check-out:</span>{' '}
                    {reserva.dataSaida ? new Date(reserva.dataSaida).toLocaleDateString() : 'N/A'}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Quarto:</span> {reserva.tipoQuarto}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Pessoas:</span> {reserva.numeroPessoas}
                  </p>
                </div>
              </div>
              {reserva.observacoes && (
                <div className="mt-4">
                  <p className="text-gray-600">
                    <span className="font-semibold">Observações:</span> {reserva.observacoes}
                  </p>
                </div>
              )}
              <div className="mt-4 text-sm text-gray-500">
                Reserva criada em: {new Date(reserva.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ListaReservasPage 