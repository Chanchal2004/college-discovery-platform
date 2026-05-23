'use client';
import { useState } from 'react';
import { authAPI } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await authAPI.login(form.email, form.password);
      login(data.user, data.token);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-[#9898b0]">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-[#e17055]/10 text-[#e17055] text-sm text-center animate-slide-down">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-[#9898b0] mb-1.5">Email</label>
            <input
              type="email" required
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="w-full bg-[#12121a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#9898b0] outline-none focus:border-[#6c5ce7]/50 transition-colors"
              placeholder="you@example.com"
              id="login-email"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#9898b0] mb-1.5">Password</label>
            <input
              type="password" required
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              className="w-full bg-[#12121a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#9898b0] outline-none focus:border-[#6c5ce7]/50 transition-colors"
              placeholder="••••••••"
              id="login-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#6c5ce7] text-white font-semibold hover:bg-[#5b4bd6] disabled:opacity-50 transition-all"
            id="login-submit"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <p className="text-center text-sm text-[#9898b0]">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-[#a29bfe] hover:underline">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
