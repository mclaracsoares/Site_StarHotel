import { useState, useEffect } from 'react'
import Parse from '../config/back4app'

function ListaReservasPage() {
  const [reservas, setReservas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [reservaEditando, setReservaEditando] = useState(null)
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    dataEntrada: '',
    dataSaida: '',
    tipoQuarto: '',
    numeroPessoas: '',
    observacoes: ''
  })
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [actionToConfirm, setActionToConfirm] = useState(null);
  const [reservationIdToActOn, setReservationIdToActOn] = useState(null);

  useEffect(() => {
    const fetchReservas = async () => {
      setLoading(true)
      setError(null)
      const currentUser = Parse.User.current();
      if (!currentUser) {
        setError('Usuário não autenticado.');
        setLoading(false);
        return;
      }

      const username = currentUser.get('username');
      const isAdminUser = username === 'admin_hotel';
      setIsAdmin(isAdminUser);

      try {
        console.log('Iniciando busca de reservas...')
        
        if (!Parse.applicationId) {
          throw new Error('Parse não está inicializado corretamente')
        }
        
        let results = [];

        if (isAdminUser) {
          console.log('Usuário admin detectado. Chamando Cloud Function getAllReservations...');
          results = await Parse.Cloud.run('getAllReservations');
          console.log('Resultados da Cloud Function:', results.length);

        } else {
          console.log('Usuário comum detectado. Buscando reservas próprias...');
          const Reserva = Parse.Object.extend('Reservation');
          const query = new Parse.Query(Reserva);
          
          query.equalTo('createdBy', currentUser); 
          query.descending('createdAt');
          
          console.log('Executando query para usuário:', currentUser.id);
          results = await query.find();
          console.log('Resultados encontrados:', results.length);
        }
        
        const reservasData = results.map(reserva => {
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
            createdAt: reserva.get('createdAt')
          };
        });
        
        console.log('Reservas processadas:', reservasData.length);
        setReservas(reservasData);
        setLoading(false);
      } catch (error) {
        console.error('Erro detalhado ao buscar reservas:', error);
        setError(`Erro ao carregar reservas: ${error.message || 'Erro desconhecido.'}`);
        setLoading(false);
      }
    };

    fetchReservas();
  }, []);

  // Função para abrir o modal de edição
  const handleEdit = (reserva) => {
    setReservaEditando(reserva);
    setFormData({
      nome: reserva.nome || '',
      email: reserva.email || '',
      telefone: reserva.telefone || '',
      dataEntrada: formatDateForInput(reserva.dataEntrada),
      dataSaida: formatDateForInput(reserva.dataSaida),
      tipoQuarto: reserva.tipoQuarto || '',
      numeroPessoas: reserva.numeroPessoas || '',
      observacoes: reserva.observacoes || ''
    });
  };

  // Função para fechar o modal de edição
  const handleCancelEdit = () => {
    setReservaEditando(null);
  };

  // Função para atualizar dados do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Função para formatar data para o campo input (YYYY-MM-DD)
  const formatDateForInput = (date) => {
    if (!date) return '';
    
    let dateObj;
    if (typeof date === 'string') {
      dateObj = new Date(date);
    } else if (date instanceof Date) {
      dateObj = date;
    } else {
      return '';
    }
    
    if (isNaN(dateObj.getTime())) return '';
    
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Função para formatar data para exibição (DD/MM/YYYY)
  const formatDate = (date) => {
    if (!date) return 'N/A';
    
    let dateObj;
    if (typeof date === 'string') {
      dateObj = new Date(date);
    } else if (date instanceof Date) {
      dateObj = date;
    } else {
      return 'N/A';
    }
    
    if (isNaN(dateObj.getTime())) return 'N/A';
    
    return dateObj.toLocaleDateString('pt-BR');
  };

  // Função para salvar edição
  const handleSaveEdit = async () => {
    if (!reservaEditando) return;
    
    setLoading(true);
    try {
      await Parse.Cloud.run('updateReservation', {
        reservationId: reservaEditando.id,
        data: {
          nome: formData.nome,
          email: formData.email,
          telefone: formData.telefone,
          dataEntrada: new Date(formData.dataEntrada),
          dataSaida: new Date(formData.dataSaida),
          tipoQuarto: formData.tipoQuarto,
          numeroPessoas: parseInt(formData.numeroPessoas),
          observacoes: formData.observacoes
        }
      });
      
      setReservas(prevReservas => 
        prevReservas.map(reserva => 
          reserva.id === reservaEditando.id 
            ? {
                ...reserva,
                nome: formData.nome,
                email: formData.email,
                telefone: formData.telefone,
                dataEntrada: new Date(formData.dataEntrada),
                dataSaida: new Date(formData.dataSaida),
                tipoQuarto: formData.tipoQuarto,
                numeroPessoas: parseInt(formData.numeroPessoas),
                observacoes: formData.observacoes
              }
            : reserva
        )
      );
      
      setReservaEditando(null);
      setLoading(false);
      // Mostrar mensagem de sucesso após edição
      setTimeout(() => {
        setShowConfirmModal(true);
        setActionToConfirm('editSuccess');
      }, 100);
    } catch (error) {
      console.error('Erro ao atualizar reserva:', error);
      setError(`Erro ao atualizar reserva: ${error.message}`);
      setLoading(false);
    }
  };

  const openConfirmModal = (action, reservationId) => {
    if (action === 'delete') {
      setActionToConfirm(action);
      setReservationIdToActOn(reservationId);
      setShowConfirmModal(true);
    }
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
    setActionToConfirm(null);
    setReservationIdToActOn(null);
  };

  const confirmAction = async () => {
    if (actionToConfirm === 'delete') {
      await handleDelete(reservationIdToActOn);
    }
    closeConfirmModal();
  };

  // Função para deletar reserva
  const handleDelete = async (reservaId) => {
    setLoading(true);
    try {
      await Parse.Cloud.run('deleteReservation', { reservationId: reservaId });
      setReservas(prevReservas => prevReservas.filter(reserva => reserva.id !== reservaId));
      setLoading(false);
      // Mostrar mensagem de sucesso após exclusão
      setTimeout(() => {
        setShowConfirmModal(true);
        setActionToConfirm('deleteSuccess');
      }, 100);
    } catch (error) {
      console.error('Erro ao excluir reserva:', error);
      setError(`Erro ao excluir reserva: ${error.message}`);
      setLoading(false);
    }
  };

  if (loading && !reservaEditando) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-gray-600">Carregando reservas...</p>
      </div>
    )
  }

  if (error && !reservaEditando) {
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

  const pageTitle = isAdmin ? "Todas as Reservas (Admin)" : "Minhas Reservas";

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-playfair font-bold text-wine-900 text-center mb-8">
        {pageTitle}
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
                    {formatDate(reserva.dataEntrada)}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Check-out:</span>{' '}
                    {formatDate(reserva.dataSaida)}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Quarto:</span> {reserva.tipoQuarto || 'N/A'}
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
              <div className="mt-4 flex justify-between items-center text-sm">
                <span className="text-gray-500">
                  Reserva criada em: {reserva.createdAt instanceof Date ? reserva.createdAt.toLocaleString() : new Date(reserva.createdAt).toLocaleString()}
                </span>
                {isAdmin && (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEdit(reserva)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => openConfirmModal('delete', reserva.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Excluir
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de Edição */}
      {reservaEditando && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-wine-900 mb-4">Editar Reserva</h2>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nome</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-wine-900 focus:ring focus:ring-wine-800 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-wine-900 focus:ring focus:ring-wine-800 focus:ring-opacity-50"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Telefone</label>
                <input
                  type="text"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-wine-900 focus:ring focus:ring-wine-800 focus:ring-opacity-50"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Data de Check-in</label>
                  <input
                    type="date"
                    name="dataEntrada"
                    value={formData.dataEntrada}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-wine-900 focus:ring focus:ring-wine-800 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Data de Check-out</label>
                  <input
                    type="date"
                    name="dataSaida"
                    value={formData.dataSaida}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-wine-900 focus:ring focus:ring-wine-800 focus:ring-opacity-50"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tipo de Quarto</label>
                  <select
                    name="tipoQuarto"
                    value={formData.tipoQuarto}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-wine-900 focus:ring focus:ring-wine-800 focus:ring-opacity-50"
                  >
                    <option value="">Selecione um tipo</option>
                    <option value="triplo">Quarto Triplo</option>
                    <option value="duplo">Quarto Duplo</option>
                    <option value="casal">Quarto Casal</option>
                    <option value="flat">Flat</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Número de Pessoas</label>
                  <select
                    name="numeroPessoas"
                    value={formData.numeroPessoas}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-wine-900 focus:ring focus:ring-wine-800 focus:ring-opacity-50"
                  >
                    {[1, 2, 3, 4].map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'pessoa' : 'pessoas'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Observações</label>
                <textarea
                  name="observacoes"
                  value={formData.observacoes}
                  onChange={handleChange}
                  rows="4"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-wine-900 focus:ring focus:ring-wine-800 focus:ring-opacity-50"
                ></textarea>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  disabled={loading}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-wine-900 hover:bg-wine-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wine-800 disabled:opacity-50"
                >
                  {loading ? 'Salvando...' : 'Salvar Alterações'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Confirmação */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-wine-900 mb-4">Confirmação</h2>
            <p className="text-gray-700 mb-4">
              {actionToConfirm === 'delete' ? 'Tem certeza que deseja excluir esta reserva?' :
               actionToConfirm === 'editSuccess' ? 'Reserva editada com sucesso!' :
               'Reserva excluída com sucesso!'}
            </p>
            <div className="flex justify-end space-x-3">
              {actionToConfirm === 'delete' ? (
                <>
                  <button
                    onClick={closeConfirmModal}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={confirmAction}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-wine-900 hover:bg-wine-800"
                  >
                    Confirmar
                  </button>
                </>
              ) : (
                <button
                  onClick={closeConfirmModal}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-wine-900 hover:bg-wine-800"
                >
                  Fechar
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ListaReservasPage 