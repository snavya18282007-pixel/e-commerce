import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import { useUserStore } from '../store/userStore';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser, setToken } = useUserStore();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await registerUser({ name, email, password });
      setToken(data.token);
      setUser(data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md mt-10 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold text-center text-zinc-800">Create an Account</h2>
      {error && <p className="mb-4 text-sm text-rose-600 text-center">{error}</p>}
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700">Full Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded border border-zinc-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
          />
        </div>
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
            minLength="6"
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
          {loading ? 'Creating account...' : 'Register'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-zinc-600">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-rose-600 hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
