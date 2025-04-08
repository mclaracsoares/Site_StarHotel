import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Parse from 'parse/dist/parse.min.js'

function ReservasPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    checkIn: '',
    checkOut: '',
    adultos: 1,
    criancas: 0,
    tipoQuarto: 'standard',
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
    e.preventDefault()
    
    try {
      // Criar uma nova reserva no Back4App
      const Reserva = Parse.Object.extend('Reserva')
      const reserva = new Reserva()
      
      await reserva.save({
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        checkIn: new Date(formData.checkIn),
        checkOut: new Date(formData.checkOut),
        adultos: parseInt(formData.adultos),
        criancas: parseInt(formData.criancas),
        tipoQuarto: formData.tipoQuarto,
        observacoes: formData.observacoes,
        status: 'pendente'
      })

      // Redirecionar para página de confirmação
      navigate('/confirmacao', { state: { reserva: formData } })
    } catch (error) {
      console.error('Erro ao criar reserva:', error)
      alert('Ocorreu um erro ao processar sua reserva. Por favor, tente novamente.')
    }
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-playfair font-bold text-wine-900 text-center mb-12">
        Faça sua Reserva
      </h1>

      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dados Pessoais */}
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
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-wine-900"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="email">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-wine-900"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="telefone">
                Telefone
              </label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-wine-900"
                required
              />
            </div>
          </div>

          {/* Datas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="checkIn">
                Data de Check-in
              </label>
              <input
                type="date"
                id="checkIn"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-wine-900"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="checkOut">
                Data de Check-out
              </label>
              <input
                type="date"
                id="checkOut"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-wine-900"
                required
              />
            </div>
          </div>

          {/* Hóspedes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="adultos">
                Adultos
              </label>
              <select
                id="adultos"
                name="adultos"
                value={formData.adultos}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-wine-900"
              >
                {[1, 2, 3, 4].map(num => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="criancas">
                Crianças
              </label>
              <select
                id="criancas"
                name="criancas"
                value={formData.criancas}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-wine-900"
              >
                {[0, 1, 2, 3].map(num => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tipo de Quarto */}
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="tipoQuarto">
              Tipo de Quarto
            </label>
            <select
              id="tipoQuarto"
              name="tipoQuarto"
              value={formData.tipoQuarto}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-wine-900"
            >
              <option value="standard">Quarto Standard</option>
              <option value="deluxe">Quarto Deluxe</option>
              <option value="suite">Suíte</option>
            </select>
          </div>

          {/* Observações */}
          <div>
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
            ></textarea>
          </div>

          {/* Botão de Envio */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-wine-900 text-white px-8 py-3 rounded-lg hover:bg-wine-800 transition duration-300"
            >
              Confirmar Reserva
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReservasPage