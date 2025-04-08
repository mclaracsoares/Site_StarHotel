import Parse from 'parse/dist/parse.min.js'

// Inicializa o Parse com suas credenciais do Back4App
Parse.initialize(
  import.meta.env.VITE_BACK4APP_APP_ID,
  import.meta.env.VITE_BACK4APP_JS_KEY
)
Parse.serverURL = 'https://parseapi.back4app.com/'

export default Parse