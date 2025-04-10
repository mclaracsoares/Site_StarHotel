const handleDelete = (reservationId) => {
  if (window.confirm('Tem certeza que deseja excluir esta reserva?')) {
    // Lógica de exclusão
    alert('Reserva excluída com sucesso!');
  }
};

const handleEdit = (reservationId) => {
  // Lógica de edição
  alert('Reserva editada com sucesso!');
};

const handleSave = () => {
  // Lógica de salvamento
  alert('Reserva salva com sucesso!');
}; 