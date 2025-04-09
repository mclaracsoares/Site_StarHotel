import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Parse from '../config/back4app';

function LoginPage({ showRegister = false }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(showRegister);

  // Idealmente, você terá uma função para atualizar o estado global de autenticação
  // Ex: const { loginUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const user = await Parse.User.logIn(username, password);
      console.log('Usuário logado com sucesso:', user);
      // Disparar evento para atualizar UI
      window.dispatchEvent(new Event('userChange'));
      // Aqui você atualizaria o estado global/contexto
      // loginUser(user);
      navigate('/'); // Redireciona para a home page após login
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      setError(`Falha no login: ${err.message}`);
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Cria um novo objeto User do Parse
      const user = new Parse.User();
      user.set("username", username);
      user.set("password", password);
      user.set("email", email);

      // Outras propriedades opcionais
      user.set("isAdmin", false); // Garante que novos usuários não são admins

      // Registra o usuário
      const result = await user.signUp();
      console.log('Usuário registrado com sucesso:', result);
      
      // Usuário já está logado após registro no Parse
      window.dispatchEvent(new Event('userChange'));
      navigate('/'); // Redireciona para a home page após cadastro
    } catch (err) {
      console.error('Erro ao cadastrar:', err);
      setError(`Falha no cadastro: ${err.message}`);
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setError(null); // Limpa erros ao trocar de modo
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-playfair font-bold text-wine-900 text-center mb-6">
          {isRegister ? 'Cadastre-se' : 'Login'}
        </h1>
        
        {isRegister ? (
          // Formulário de Cadastro
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Usuário
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-wine-900 focus:ring focus:ring-wine-800 focus:ring-opacity-50"
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-wine-900 focus:ring focus:ring-wine-800 focus:ring-opacity-50"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-wine-900 focus:ring focus:ring-wine-800 focus:ring-opacity-50"
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-wine-900 hover:bg-wine-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wine-800 disabled:opacity-50"
              >
                {loading ? 'Cadastrando...' : 'Cadastrar'}
              </button>
            </div>
            
            <div className="text-center mt-4">
              <button 
                type="button" 
                onClick={toggleMode}
                className="text-wine-900 hover:underline"
              >
                Já tem uma conta? Faça login
              </button>
            </div>
          </form>
        ) : (
          // Formulário de Login
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Usuário
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-wine-900 focus:ring focus:ring-wine-800 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-wine-900 focus:ring focus:ring-wine-800 focus:ring-opacity-50"
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-wine-900 hover:bg-wine-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wine-800 disabled:opacity-50"
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </div>
            
            <div className="text-center mt-4">
              <button 
                type="button" 
                onClick={toggleMode}
                className="text-wine-900 hover:underline"
              >
                Não tem uma conta? Cadastre-se
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default LoginPage; 