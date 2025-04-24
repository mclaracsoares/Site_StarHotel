import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { sendConfirmationEmail } from '../config/sendgrid';

const ConfirmacaoPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const reservationDetails = location.state?.reservationDetails;

  useEffect(() => {
    if (!reservationDetails) {
      navigate('/reservas');
      return;
    }

    const sendEmail = async () => {
      if (!emailSent && reservationDetails.email) {
        const success = await sendConfirmationEmail(
          reservationDetails.email,
          reservationDetails
        );
        setEmailSent(true);
        setEmailError(!success);
      }
    };

    sendEmail();
  }, [reservationDetails, navigate, emailSent]);

  if (!reservationDetails) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-wine-900 mb-6 text-center">
          Reserva Confirmada!
        </h1>

        <div className="mb-6">
          <p className="text-gray-700 mb-4">
            Olá, {reservationDetails.nome}! Sua reserva foi confirmada com sucesso.
          </p>
          
          {emailSent && !emailError && (
            <p className="text-green-600 mb-4">
              Um email de confirmação foi enviado para {reservationDetails.email}
            </p>
          )}
          
          {emailError && (
            <p className="text-red-600 mb-4">
              Não foi possível enviar o email de confirmação. Por favor, entre em contato conosco pelo WhatsApp.
            </p>
          )}

          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-wine-900 mb-4">
              Detalhes da Reserva
            </h2>
            <ul className="space-y-2">
              <li>
                <strong>Nome:</strong> {reservationDetails.nome}
              </li>
              <li>
                <strong>Email:</strong> {reservationDetails.email}
              </li>
              <li>
                <strong>Telefone:</strong> {reservationDetails.telefone}
              </li>
              <li>
                <strong>Data de Check-in:</strong> {reservationDetails.checkIn}
              </li>
              <li>
                <strong>Data de Check-out:</strong> {reservationDetails.checkOut}
              </li>
              <li>
                <strong>Tipo de Quarto:</strong> {reservationDetails.tipoQuarto}
              </li>
              <li>
                <strong>Número de Pessoas:</strong> {reservationDetails.numeroPessoas}
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Voltar para a Página Inicial
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmacaoPage;