import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Parse from '../config/back4app';

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Idealmente, você terá uma função para atualizar o estado global de autenticação
  // Ex: const { loginUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const user = await Parse.User.logIn(username, password);
      console.log('Usuário logado com sucesso:', user);
      // Aqui você atualizaria o estado global/contexto
      // loginUser(user);
      alert('Login bem-sucedido!'); // Placeholder
      navigate('/'); // Redireciona para a home page após login
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      setError(`Falha no login: ${err.message}`);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-playfair font-bold text-wine-900 text-center mb-6">
          Login
        </h1>
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
        </form>
      </div>
    </div>
  );
}

export default LoginPage; 