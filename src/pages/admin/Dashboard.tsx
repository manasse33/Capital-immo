import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ArrowRight, CheckCircle, Home, MessageSquare, RefreshCw, Settings, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import PageHeader from '@/components/admin/PageHeader';
import StatsCard from '@/components/admin/StatsCard';
import TypeBadge from '@/components/admin/TypeBadge';
import EmptyState from '@/components/admin/EmptyState';
import { getDashboardActivity, getDashboardCharts, getDashboardStats } from '../../api/dashboard';
import type { ApiDashboardActivity, ApiDashboardCharts, ApiDashboardStats } from '../../api/types';
import { formatPrix } from '../../utils/format';

export default function AdminDashboard() {
  const [stats, setStats] = useState<ApiDashboardStats | null>(null);
  const [activity, setActivity] = useState<ApiDashboardActivity | null>(null);
  const [charts, setCharts] = useState<ApiDashboardCharts | null>(null);
  const [loading, setLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadDashboard = async () => {
      if (isMounted) {
        setLoading(true);
        setDashboardError(null);
      }

      try {
        const [statsData, activityData, chartsData] = await Promise.all([
          getDashboardStats(),
          getDashboardActivity(),
          getDashboardCharts(),
        ]);

        if (isMounted) {
          setStats(statsData);
          setActivity(activityData);
          setCharts(chartsData);
        }
      } catch {
        if (isMounted) {
          setDashboardError('Impossible de charger le tableau de bord.');
        }
        toast.error('Impossible de charger le dashboard');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadDashboard();

    return () => {
      isMounted = false;
    };
  }, [reloadToken]);

  const latestBiens = (activity?.derniers_biens ?? []).slice(0, 5);
  const latestContacts = (activity?.derniers_contacts ?? []).slice(0, 5);
  const biensPerMonth = charts?.biens_par_mois ?? [];
  const contactsPerMonth = charts?.contacts_par_mois ?? [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tableau de bord"
        subtitle="Vue d'ensemble de l'activite immobiliere et commerciale."
        action={
          <>
            <button
              type="button"
              onClick={() => setReloadToken((prev) => prev + 1)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:border-[#7A9E9F]/40 hover:text-[#0D354E]"
            >
              <RefreshCw className="h-4 w-4" />
              Actualiser
            </button>
            <Link
              to="/admin/biens"
              className="inline-flex items-center gap-2 rounded-xl bg-[#0D354E] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(13,53,78,0.12)] transition-transform hover:-translate-y-0.5"
            >
              Gerer les biens
              <ArrowRight className="h-4 w-4" />
            </Link>
          </>
        }
      />

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1.35fr_0.95fr]">
        <div className="rounded-[1.5rem] border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#7A9E9F]">
                Actions rapides
              </p>
              <h2 className="mt-2 text-xl font-semibold text-slate-800">
                Accede vite aux taches les plus frequentes.
              </h2>
            </div>
            {!loading && stats && (
              <div className="rounded-full bg-[#7A9E9F]/10 px-3 py-1 text-xs font-semibold text-[#0D354E]">
                {stats.contacts.non_lus} contact(s) non lu(s)
              </div>
            )}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Link
              to="/admin/biens"
              className="rounded-[1.2rem] border border-[#0D354E]/8 bg-[#0D354E]/[0.03] p-4 transition-colors hover:border-[#0D354E]/20 hover:bg-[#0D354E]/[0.05]"
            >
              <Home className="h-5 w-5 text-[#0D354E]" />
              <p className="mt-4 text-sm font-semibold text-slate-800">Catalogue des biens</p>
              <p className="mt-1 text-sm leading-6 text-slate-500">Mettre a jour les annonces et disponibilites.</p>
            </Link>

            <Link
              to="/admin/contacts"
              className="rounded-[1.2rem] border border-[#7A9E9F]/15 bg-[#7A9E9F]/[0.06] p-4 transition-colors hover:border-[#7A9E9F]/30 hover:bg-[#7A9E9F]/[0.09]"
            >
              <MessageSquare className="h-5 w-5 text-[#7A9E9F]" />
              <p className="mt-4 text-sm font-semibold text-slate-800">Demandes clients</p>
              <p className="mt-1 text-sm leading-6 text-slate-500">Prioriser les messages et repondre plus vite.</p>
            </Link>

            <Link
              to="/admin/services"
              className="rounded-[1.2rem] border border-slate-200 bg-slate-50/70 p-4 transition-colors hover:border-slate-300 hover:bg-slate-50"
            >
              <Star className="h-5 w-5 text-amber-500" />
              <p className="mt-4 text-sm font-semibold text-slate-800">Services</p>
              <p className="mt-1 text-sm leading-6 text-slate-500">Verifier l'offre et les contenus de service.</p>
            </Link>

            <Link
              to="/admin/entreprise"
              className="rounded-[1.2rem] border border-slate-200 bg-white p-4 transition-colors hover:border-slate-300 hover:bg-slate-50/70"
            >
              <Settings className="h-5 w-5 text-slate-500" />
              <p className="mt-4 text-sm font-semibold text-slate-800">Entreprise</p>
              <p className="mt-1 text-sm leading-6 text-slate-500">Mettre a jour les infos visibles sur le site.</p>
            </Link>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-slate-100 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#7A9E9F]">Priorites</p>
          <div className="mt-4 space-y-3">
            <div className="rounded-[1.1rem] bg-slate-50 px-4 py-3">
              <p className="text-sm font-medium text-slate-700">Contacts non lus</p>
              <p className="mt-1 text-2xl font-bold text-[#0D354E]">{stats?.contacts.non_lus ?? 0}</p>
            </div>
            <div className="rounded-[1.1rem] bg-slate-50 px-4 py-3">
              <p className="text-sm font-medium text-slate-700">Biens reserves</p>
              <p className="mt-1 text-2xl font-bold text-[#0D354E]">{stats?.biens.reserves ?? 0}</p>
            </div>
            <div className="rounded-[1.1rem] bg-slate-50 px-4 py-3">
              <p className="text-sm font-medium text-slate-700">Equipe</p>
              <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                <Users className="h-4 w-4 text-[#7A9E9F]" />
                <span>Garder les fiches et contenus a jour.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {dashboardError && !loading && (
        <section className="rounded-[1.4rem] border border-red-100 bg-red-50/80 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-base font-semibold text-red-700">Chargement incomplet</h3>
              <p className="mt-1 text-sm text-red-600">{dashboardError}</p>
            </div>
            <button
              type="button"
              onClick={() => setReloadToken((prev) => prev + 1)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-red-700 transition-colors hover:bg-red-100"
            >
              <RefreshCw className="h-4 w-4" />
              Reessayer
            </button>
          </div>
        </section>
      )}

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          icon={Home}
          label="Biens disponibles"
          value={stats?.biens.disponibles ?? 0}
          trend={`${stats?.biens.total ?? 0}`}
          trendLabel="au total"
          trendDirection="up"
          colorClass="bg-[#0D354E]/10 text-[#0D354E]"
          loading={loading}
        />
        <StatsCard
          icon={MessageSquare}
          label="Contacts ce mois"
          value={stats?.contacts.ce_mois ?? 0}
          trend={`${stats?.contacts.non_lus ?? 0}`}
          trendLabel="non lus"
          trendDirection="up"
          colorClass="bg-[#7A9E9F]/10 text-[#7A9E9F]"
          loading={loading}
        />
        <StatsCard
          icon={CheckCircle}
          label="Biens vendus"
          value={stats?.biens.vendus ?? 0}
          trend={`${stats?.biens.reserves ?? 0}`}
          trendLabel="reserves"
          trendDirection="up"
          colorClass="bg-emerald-50 text-emerald-600"
          loading={loading}
        />
        <StatsCard
          icon={Star}
          label="En vedette"
          value={stats?.biens.en_vedette ?? 0}
          trend={`${stats?.biens.vues_total ?? 0}`}
          trendLabel="vues totales"
          trendDirection="up"
          colorClass="bg-amber-50 text-amber-600"
          loading={loading}
        />
      </section>

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <h3 className="text-base font-semibold text-slate-800">Biens ajoutes par mois</h3>
            <p className="text-[13px] text-slate-400">Evolution du catalogue immobilier.</p>
          </div>
          <div className="h-[220px]">
            {loading ? (
              <div className="h-full animate-pulse rounded-xl bg-slate-100" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={biensPerMonth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis
                    dataKey="mois"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: '#64748B', fontSize: 12 }}
                  />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(15, 23, 42, 0.08)',
                    }}
                  />
                  <Bar dataKey="total" fill="#0D354E" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <h3 className="text-base font-semibold text-slate-800">Contacts par mois</h3>
            <p className="text-[13px] text-slate-400">Suivi des demandes commerciales.</p>
          </div>
          <div className="h-[220px]">
            {loading ? (
              <div className="h-full animate-pulse rounded-xl bg-slate-100" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={contactsPerMonth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis
                    dataKey="mois"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: '#64748B', fontSize: 12 }}
                  />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(15, 23, 42, 0.08)',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#7A9E9F"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-800">Derniers biens ajoutes</h3>
            <Link to="/admin/biens" className="text-sm font-medium text-[#7A9E9F] hover:text-[#0D354E]">
              Voir tous -&gt;
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex animate-pulse items-center gap-3 py-3">
                  <div className="h-10 w-10 rounded-lg bg-slate-200" />
                  <div className="min-w-0 flex-1">
                    <div className="h-3 w-36 rounded bg-slate-200" />
                    <div className="mt-2 h-2 w-20 rounded bg-slate-100" />
                  </div>
                  <div className="h-5 w-16 rounded-full bg-slate-200" />
                  <div className="h-3 w-20 rounded bg-slate-200" />
                </div>
              ))}
            </div>
          ) : latestBiens.length > 0 ? (
            <div>
              {latestBiens.map((bien) => (
                <div key={bien.id} className="flex items-center gap-3 border-b border-slate-50 py-3 last:border-0">
                  <img
                    src={bien.images?.[0]?.url ?? 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=120'}
                    alt={bien.titre}
                    className="h-10 w-10 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-800">{bien.titre}</p>
                    <p className="truncate text-xs text-slate-400">{bien.reference || 'Sans reference'}</p>
                  </div>
                  <TypeBadge type={bien.type} />
                  <p className="text-sm font-semibold text-slate-800">{formatPrix(bien.prix, bien.transaction)}</p>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Home}
              title="Aucun bien trouve"
              description="Ajoutez votre premier bien au catalogue."
            />
          )}
        </div>

        <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-800">Derniers contacts</h3>
            <Link to="/admin/contacts" className="text-sm font-medium text-[#7A9E9F] hover:text-[#0D354E]">
              Voir tous -&gt;
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex animate-pulse items-center gap-3 py-3">
                  <div className="h-9 w-9 rounded-full bg-slate-200" />
                  <div className="min-w-0 flex-1">
                    <div className="h-3 w-28 rounded bg-slate-200" />
                    <div className="mt-2 h-2 w-32 rounded bg-slate-100" />
                  </div>
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                </div>
              ))}
            </div>
          ) : latestContacts.length > 0 ? (
            <div>
              {latestContacts.map((contact) => (
                <div key={contact.id} className="flex items-center gap-3 border-b border-slate-50 py-3 last:border-0">
                  <div className="relative">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7A9E9F]/15 text-sm font-semibold text-[#0D354E]">
                      {contact.nom.slice(0, 1).toUpperCase()}
                    </div>
                    {!contact.is_read && (
                      <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-green-500" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-800">{contact.nom}</p>
                    <p className="truncate text-xs text-slate-400">{contact.objet}</p>
                  </div>
                  <p className="text-xs text-slate-400">
                    {contact.created_at
                      ? formatDistanceToNow(new Date(contact.created_at), {
                          addSuffix: true,
                          locale: fr,
                        })
                      : 'recent'}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={MessageSquare}
              title="Aucun contact"
              description="Les demandes clients apparaitront ici."
            />
          )}
        </div>
      </section>
    </div>
  );
}
