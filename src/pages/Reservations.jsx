import React, { useState, useEffect } from 'react';
import Parse from '../config/back4app';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telefone: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    roomType: 'standard'
  });
  const [editingId, setEditingId] = useState(null);

  // Carrega as reservas
  const loadReservations = async () => {
    try {
      const query = new Parse.Query('Reservation');
      query.descending('createdAt');
      const results = await query.find();
      setReservations(results.map(reservation => ({
        id: reservation.id,
        ...reservation.attributes
      })));
    } catch (error) {
      console.error('Erro ao carregar reservas:', error);
    }
  };

  useEffect(() => {
    loadReservations();
  }, []);

  // Manipula mudanças no formulário
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Cria uma nova reserva
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const Reservation = Parse.Object.extend('Reservation');
      const reservation = new Reservation();
      
      if (editingId) {
        // Atualiza reserva existente
        const query = new Parse.Query('Reservation');
        const reservationToUpdate = await query.get(editingId);

        // Define campos com conversão de data e nomes corretos
        reservationToUpdate.set('nome', formData.name);
        reservationToUpdate.set('email', formData.email);
        reservationToUpdate.set('telefone', formData.telefone);
        reservationToUpdate.set('dataEntrada', new Date(formData.checkIn));
        reservationToUpdate.set('dataSaida', new Date(formData.checkOut));
        reservationToUpdate.set('numeroPessoas', parseInt(formData.guests));
        reservationToUpdate.set('tipoQuarto', formData.roomType);

        await reservationToUpdate.save();
      } else {
        // Cria nova reserva
        // Define campos com conversão de data e nomes corretos
        reservation.set('nome', formData.name);
        reservation.set('email', formData.email);
        reservation.set('telefone', formData.telefone);
        reservation.set('dataEntrada', new Date(formData.checkIn));
        reservation.set('dataSaida', new Date(formData.checkOut));
        reservation.set('numeroPessoas', parseInt(formData.guests));
        reservation.set('tipoQuarto', formData.roomType);

        await reservation.save();
      }

      setFormData({
        name: '',
        email: '',
        telefone: '',
        checkIn: '',
        checkOut: '',
        guests: 1,
        roomType: 'standard'
      });
      setEditingId(null);
      loadReservations();
    } catch (error) {
      console.error('Erro ao salvar reserva:', error);
    }
  };

  // Edita uma reserva existente
  const handleEdit = (reservation) => {
    setFormData({
      name: reservation.nome,
      email: reservation.email,
      telefone: reservation.telefone || '',
      checkIn: reservation.dataEntrada ? new Date(reservation.dataEntrada).toISOString().split('T')[0] : '',
      checkOut: reservation.dataSaida ? new Date(reservation.dataSaida).toISOString().split('T')[0] : '',
      guests: reservation.numeroPessoas,
      roomType: reservation.tipoQuarto
    });
    setEditingId(reservation.id);
  };

  // Deleta uma reserva
  const handleDelete = async (id) => {
    try {
      const query = new Parse.Query('Reservation');
      const reservation = await query.get(id);
      await reservation.destroy();
      loadReservations();
    } catch (error) {
      console.error('Erro ao deletar reserva:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Gerenciamento de Reservas
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Formulário */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              {editingId ? 'Editar Reserva' : 'Nova Reserva'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700">
                  Data de Entrada
                </label>
                <input
                  type="date"
                  id="checkIn"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700">
                  Data de Saída
                </label>
                <input
                  type="date"
                  id="checkOut"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="guests" className="block text-sm font-medium text-gray-700">
                  Número de Hóspedes
                </label>
                <input
                  type="number"
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  min="1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="roomType" className="block text-sm font-medium text-gray-700">
                  Tipo de Quarto
                </label>
                <select
                  id="roomType"
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="standard">Standard</option>
                  <option value="deluxe">Deluxe</option>
                  <option value="suite">Suite</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {editingId ? 'Atualizar Reserva' : 'Criar Reserva'}
              </button>
            </form>
          </div>

          {/* Lista de Reservas */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Reservas Existentes</h3>
            <div className="space-y-4">
              {reservations.map((reservation) => (
                <div
                  key={reservation.id}
                  className="border rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{reservation.nome}</h4>
                      <p className="text-sm text-gray-600">{reservation.email}</p>
                      <p className="text-sm text-gray-600">
                        {reservation.dataEntrada ? new Date(reservation.dataEntrada).toLocaleDateString() : 'N/A'} - 
                        {reservation.dataSaida ? new Date(reservation.dataSaida).toLocaleDateString() : 'N/A'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {reservation.numeroPessoas} hóspedes - Quarto {reservation.tipoQuarto}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(reservation)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(reservation.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations; 