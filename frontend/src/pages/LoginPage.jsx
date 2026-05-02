import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import { useUserStore } from '../store/userStore';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser, setToken } = useUserStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await loginUser({ email, password });
      setToken(data.token);
      setUser(data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md mt-10 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold text-center text-zinc-800">Login to Keerthi&apos;s</h2>
      {error && <p className="mb-4 text-sm text-rose-600 text-center">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border border-zinc-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border border-zinc-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-rose-600 py-2.5 text-sm font-bold uppercase text-white hover:bg-rose-700 disabled:opacity-70 transition-colors"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-zinc-600">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="font-semibold text-rose-600 hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
