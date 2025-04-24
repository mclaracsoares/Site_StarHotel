import sgMail from '@sendgrid/mail';

sgMail.setApiKey('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');

export const sendConfirmationEmail = async (to, reservationDetails) => {
  const msg = {
    to, 
    from: 'confirmacaoStarHotel@gmail.com', 
    subject: 'Confirmação de Reserva - Star Hotel',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #831843;">Confirmação de Reserva</h2>
        <p>Olá,</p>
        <p>Sua reserva no StarHotel Limoeiro foi confirmada com sucesso!</p>
        <h3 style="color: #831843;">Detalhes da Reserva:</h3>
        <ul>
          <li><strong>Nome:</strong> ${reservationDetails.nome}</li>
          <li><strong>Email:</strong> ${reservationDetails.email}</li>
          <li><strong>Telefone:</strong> ${reservationDetails.telefone}</li>
          <li><strong>Data de Check-in:</strong> ${reservationDetails.checkIn}</li>
          <li><strong>Data de Check-out:</strong> ${reservationDetails.checkOut}</li>
          <li><strong>Tipo de Quarto:</strong> ${reservationDetails.tipoQuarto}</li>
          <li><strong>Número de Pessoas:</strong> ${reservationDetails.numeroPessoas}</li>
        </ul>
        <p>Para qualquer dúvida ou alteração, entre em contato conosco pelo WhatsApp.</p>
        <p>Atenciosamente,<br>Equipe Star Hotel</p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    return true;
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return false;
  }
};
