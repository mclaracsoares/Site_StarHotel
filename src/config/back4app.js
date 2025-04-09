import Parse from 'parse/dist/parse.min.js'

// Configuração do Parse
const PARSE_APP_ID = import.meta.env.VITE_BACK4APP_APPLICATION_ID
const PARSE_JS_KEY = import.meta.env.VITE_BACK4APP_JAVASCRIPT_KEY
const PARSE_SERVER_URL = 'https://parseapi.back4app.com/'

// Inicialização do Parse
Parse.initialize(PARSE_APP_ID, PARSE_JS_KEY)
Parse.serverURL = PARSE_SERVER_URL

export default Parse 