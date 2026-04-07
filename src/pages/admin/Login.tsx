import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { staticAssets } from '@/assets';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const target = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/admin';
      navigate(target, { replace: true });
    }
  }, [user, location.state, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signIn({ email, password });
      const target = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/admin';
      navigate(target, { replace: true });
    } catch {
      setError("Identifiants invalides. Merci de reessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-shell admin-login-shell flex min-h-screen items-center justify-center px-4 py-8 lg:px-8">
      <div className="admin-login-frame w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/80 bg-white/92 shadow-[0_30px_90px_rgba(13,53,78,0.12)]">
        <div className="grid min-h-[680px] lg:grid-cols-[0.9fr_1.1fr]">
          <section className="flex items-center px-7 py-10 md:px-10 lg:px-14">
            <div className="w-full max-w-md">
              <div className="flex items-center gap-4">
                <div className="rounded-[1.35rem] bg-[#0D354E] px-4 py-3 shadow-[0_18px_36px_rgba(13,53,78,0.18)]">
                  <img
                    src={staticAssets.logo}
                    alt="Capital Immo Group"
                    className="h-10 w-auto object-contain"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7A9E9F]">
                    Capital Immo
                  </p>
                  <p className="mt-1 text-sm text-slate-500">Espace administrateur</p>
                </div>
              </div>

              <div className="mt-12">
                <p className="text-sm uppercase tracking-[0.26em] text-[#7A9E9F]">Connexion</p>
                <h1 className="mt-4 text-4xl font-bold leading-tight text-[#0D354E] md:text-[3.2rem]">
                  Espace administrateur
                </h1>
              </div>

              <form onSubmit={handleSubmit} className="mt-10 space-y-5">
                <div className="space-y-2">
                  <label className="admin-label">Email</label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7A9E9F]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="admin-login-input pl-11"
                      placeholder="admin@capitalimogroup.com"
                      autoComplete="email"
                      autoFocus
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="admin-label">Mot de passe</label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7A9E9F]" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="admin-login-input pl-11 pr-12"
                      placeholder="********"
                      autoComplete="current-password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-[#0D354E]"
                      aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="rounded-[1rem] border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    disabled={loading}
                    className="admin-login-submit w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:min-w-[200px]"
                  >
                    <span>{loading ? 'Connexion...' : 'Se connecter'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          </section>

          <section className="admin-login-art-side relative hidden overflow-hidden lg:flex">
            <div className="admin-login-art-blob" />
            <div className="admin-login-art-ring" />

            <div className="relative z-10 flex w-full items-center justify-center p-12">
              <div className="admin-login-art-core">
                <div className="admin-login-art-center">
                  <div className="admin-login-art-logo">
                    <img
                      src={staticAssets.logo}
                      alt="Capital Immo Group"
                      className="h-16 w-auto object-contain"
                    />
                  </div>
                </div>

                <div className="admin-login-art-chip admin-login-art-chip-top">Biens</div>
                <div className="admin-login-art-chip admin-login-art-chip-left">Services</div>
                <div className="admin-login-art-chip admin-login-art-chip-right">Contenus</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
