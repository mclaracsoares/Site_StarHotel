import { useState } from 'react'
import { useNavigate } from 'react-router-dom' 
import Parse from '../config/back4app'

function ReservasPage() {
  console.log('Componente ReservasPage renderizado.'); 
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    dataEntrada: '',
    dataSaida: '',
    tipoQuarto: '',
    numeroPessoas: 1,
    observacoes: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    console.log('--- handleSubmit iniciada! ---'); 
    console.log('Tentando submeter reserva com dados:', formData) 
    
    try {
      console.log('Verificando inicialização do Parse...') 
      if (!Parse.applicationId) {
        throw new Error('Parse não está inicializado corretamente')
      }
      
      // Verificar se o usuário está autenticado
      const currentUser = Parse.User.current();
      if (!currentUser) {
        throw new Error('Usuário não está autenticado. Por favor, faça login.');
      }
      
      console.log('Parse inicializado. Criando objeto Reservation...') 
      
      const Reserva = Parse.Object.extend('Reservation') 
      const reserva = new Reserva()

      console.log('Definindo campos da reserva...') 
      reserva.set('nome', formData.nome);
      reserva.set('email', formData.email);
      reserva.set('telefone', formData.telefone);
      reserva.set('dataEntrada', new Date(formData.dataEntrada));
      reserva.set('dataSaida', new Date(formData.dataSaida));
      reserva.set('tipoQuarto', formData.tipoQuarto);
      reserva.set('numeroPessoas', parseInt(formData.numeroPessoas));
      reserva.set('observacoes', formData.observacoes);
      reserva.set('status', 'pendente');
      
      // Associar a reserva ao usuário atual
      reserva.set('createdBy', currentUser);
      console.log('Reserva associada ao usuário:', currentUser.id);

      console.log('Tentando salvar reserva no Back4App...') 
      await reserva.save()
      
      console.log('Reserva salva com sucesso!', reserva.id) 
      navigate('/confirmacao', { state: { reserva: { ...formData } } });
    } catch (error) {
      console.error('Erro detalhado ao salvar reserva:', error) 
      alert(`Ocorreu um erro ao processar sua reserva: ${error.message}. Verifique o console para mais detalhes.`)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-playfair font-bold text-wine-900 text-center mb-8">
        Faça sua Reserva
      </h1>
      
      <form 
        onSubmit={(e) => handleSubmit(e)}
        noValidate
        className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="nome">
              Nome Completo
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-wine-900"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-wine-900"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-gray-700 mb-2" htmlFor="telefone">
            Telefone
          </label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-wine-900"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="dataEntrada">
              Data de Check-in
            </label>
            <input
              type="date"
              id="dataEntrada"
              name="dataEntrada"
              value={formData.dataEntrada}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-wine-900"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="dataSaida">
              Data de Check-out
            </label>
            <input
              type="date"
              id="dataSaida"
              name="dataSaida"
              value={formData.dataSaida}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-wine-900"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="tipoQuarto">
              Tipo de Quarto
            </label>
            <select
              id="tipoQuarto"
              name="tipoQuarto"
              value={formData.tipoQuarto}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-wine-900"
            >
              <option value="">Selecione um quarto</option>
              <option value="triplo">Quarto Triplo</option>
              <option value="duplo">Quarto Duplo</option>
              <option value="casal">Quarto Casal</option>
              <option value="flat">Flat</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="numeroPessoas">
              Número de Pessoas
            </label>
            <select
              id="numeroPessoas"
              name="numeroPessoas"
              value={formData.numeroPessoas}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-wine-900"
            >
              {[1, 2, 3, 4].map(num => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'pessoa' : 'pessoas'}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-gray-700 mb-2" htmlFor="observacoes">
            Observações
          </label>
          <textarea
            id="observacoes"
            name="observacoes"
            value={formData.observacoes}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-wine-900"
          />
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-wine-900 text-white px-6 py-3 rounded-lg hover:bg-wine-800 transition duration-300"
          >
            Confirmar Reserva
          </button>
        </div>
      </form>

    </div>
  )
}

export default ReservasPage