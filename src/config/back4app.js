import Parse from 'parse';

// Inicializa o Parse com as credenciais do Back4App
Parse.initialize(
  process.env.REACT_APP_BACK4APP_APPLICATION_ID,
  process.env.REACT_APP_BACK4APP_JAVASCRIPT_KEY
);
Parse.serverURL = 'https://parseapi.back4app.com/';

export default Parse; 