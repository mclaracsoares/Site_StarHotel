import Parse from 'parse/dist/parse.min.js'

// Configuração do Parse
const PARSE_APP_ID = '9KzCQQlfWXBDR704SpccARG8khwLsYdAHh9lL0Va'
const PARSE_JS_KEY = 'b1v8YRQXrP4S8o818FD4LGHBI9mpMyAzbOLVPVJN'
const PARSE_SERVER_URL = 'https://parseapi.back4app.com/'

// Inicialização do Parse
Parse.initialize(PARSE_APP_ID, PARSE_JS_KEY)
Parse.serverURL = PARSE_SERVER_URL

export default Parse 