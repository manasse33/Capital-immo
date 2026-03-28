import { useEffect, useMemo, useState } from 'react';
import { Edit3, Home, Plus, Search, Star, Trash2, Upload, X } from 'lucide-react';
import { toast } from 'sonner';
import PageHeader from '@/components/admin/PageHeader';
import DataTable, { type DataTableColumn } from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import TypeBadge from '@/components/admin/TypeBadge';
import AdminDrawer from '@/components/admin/AdminDrawer';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import EmptyState from '@/components/admin/EmptyState';
import { Spinner } from '@/components/ui/spinner';
import { Switch } from '@/components/ui/switch';
import {
  createBien,
  deleteBien,
  getBiens,
  toggleBienVedette,
  updateBien,
  type BienPayload,
} from '../../api/biens';
import type { ApiBien, BienStatut, BienTransaction, BienType } from '../../api/types';
import { formatPrix } from '../../utils/format';

type ImagePreview = {
  id: string;
  file: File;
  url: string;
};

const emptyForm: BienPayload = {
  titre: '',
  description: '',
  prix: 0,
  surface: 0,
  pieces: 0,
  chambres: 0,
  salle_de_bain: 0,
  etage: null,
  type: 'maison',
  transaction: 'vente',
  zone: '',
  quartier: '',
  reference: '',
  statut: 'disponible',
  en_vedette: false,
  caracteristiques: [],
  images: [],
};

const types: BienType[] = ['maison', 'villa', 'appartement', 'local', 'terrain'];
const transactions: BienTransaction[] = ['vente', 'location'];
const statuts: BienStatut[] = ['disponible', 'vendu', 'reserve'];

export default function AdminBiens() {
  const [biens, setBiens] = useState<ApiBien[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [transactionFilter, setTransactionFilter] = useState('all');
  const [statutFilter, setStatutFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingBien, setEditingBien] = useState<ApiBien | null>(null);
  const [form, setForm] = useState<BienPayload>(emptyForm);
  const [equipementsText, setEquipementsText] = useState('');
  const [newImagePreviews, setNewImagePreviews] = useState<ImagePreview[]>([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const resetUploadedImages = (previews: ImagePreview[]) => {
    previews.forEach((preview) => URL.revokeObjectURL(preview.url));
  };

  useEffect(() => {
    return () => {
      resetUploadedImages(newImagePreviews);
    };
  }, [newImagePreviews]);

  const loadBiens = async () => {
    setLoading(true);
    try {
      const [disponibles, vendus, reserves] = await Promise.all([
        getBiens({ statut: 'disponible', per_page: 1000 }),
        getBiens({ statut: 'vendu', per_page: 1000 }),
        getBiens({ statut: 'reserve', per_page: 1000 }),
      ]);

      const merged = [...disponibles, ...vendus, ...reserves];
      const unique = Array.from(new Map(merged.map((bien) => [bien.id, bien])).values());
      setBiens(unique);
    } catch {
      toast.error('Impossible de charger les biens');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadBiens();
  }, []);

  const filteredBiens = useMemo(() => {
    return biens.filter((bien) => {
      const matchesSearch =
        !search.trim() ||
        [bien.titre, bien.reference, bien.zone, bien.quartier]
          .join(' ')
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesType = typeFilter === 'all' || bien.type === typeFilter;
      const matchesTransaction = transactionFilter === 'all' || bien.transaction === transactionFilter;
      const matchesStatut = statutFilter === 'all' || bien.statut === statutFilter;

      return matchesSearch && matchesType && matchesTransaction && matchesStatut;
    });
  }, [biens, search, typeFilter, transactionFilter, statutFilter]);

  const hasActiveFilters =
    search.length > 0 || typeFilter !== 'all' || transactionFilter !== 'all' || statutFilter !== 'all';

  const referencePlaceholder = useMemo(() => {
    if (!form.titre.trim()) return 'CIG-001';

    const slug = form.titre
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 18);

    return `CIG-${slug || '001'}`;
  }, [form.titre]);

  const resetFilters = () => {
    setSearch('');
    setTypeFilter('all');
    setTransactionFilter('all');
    setStatutFilter('all');
  };

  const resetFormState = () => {
    resetUploadedImages(newImagePreviews);
    setNewImagePreviews([]);
    setEditingBien(null);
    setForm(emptyForm);
    setEquipementsText('');
  };

  const openCreateDrawer = () => {
    resetFormState();
    setDrawerOpen(true);
  };

  const openEditDrawer = (bien: ApiBien) => {
    resetUploadedImages(newImagePreviews);
    setNewImagePreviews([]);
    setEditingBien(bien);
    setForm({
      titre: bien.titre,
      description: bien.description,
      prix: bien.prix,
      surface: bien.surface,
      pieces: bien.pieces ?? 0,
      chambres: bien.chambres ?? 0,
      salle_de_bain: bien.salle_de_bain ?? 0,
      etage: bien.etage ?? null,
      type: bien.type,
      transaction: bien.transaction,
      zone: bien.zone,
      quartier: bien.quartier,
      reference: bien.reference,
      statut: bien.statut,
      en_vedette: bien.en_vedette,
      caracteristiques: bien.caracteristiques ?? [],
      images: [],
    });
    setEquipementsText((bien.caracteristiques ?? []).join('\n'));
    setDrawerOpen(true);
  };

  const handleFilesSelected = (files: FileList | null) => {
    if (!files?.length) return;

    const nextFiles = Array.from(files);
    const nextPreviews = nextFiles.map((file) => ({
      id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2)}`,
      file,
      url: URL.createObjectURL(file),
    }));

    setNewImagePreviews((prev) => [...prev, ...nextPreviews]);
    setForm((prev) => ({
      ...prev,
      images: [...(prev.images ?? []), ...nextFiles],
    }));
  };

  const removeNewPreview = (previewId: string) => {
    setNewImagePreviews((prev) => {
      const preview = prev.find((item) => item.id === previewId);
      if (preview) {
        URL.revokeObjectURL(preview.url);
      }

      const next = prev.filter((item) => item.id !== previewId);
      setForm((current) => ({
        ...current,
        images: next.map((item) => item.file),
      }));

      return next;
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);

    const payload: BienPayload = {
      ...form,
      reference: form.reference?.trim() ? form.reference.trim() : undefined,
      caracteristiques: equipementsText
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      images: newImagePreviews.length > 0 ? newImagePreviews.map((preview) => preview.file) : undefined,
    };

    try {
      if (editingBien) {
        await updateBien(editingBien.id, payload);
        toast.success('Bien mis a jour');
      } else {
        await createBien(payload);
        toast.success('Bien cree avec succes');
      }

      setDrawerOpen(false);
      resetFormState();
      await loadBiens();
    } catch {
      toast.error("Une erreur est survenue lors de l'enregistrement");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) return;

    try {
      await deleteBien(confirmDeleteId);
      toast.success('Bien supprime');
      setConfirmDeleteId(null);
      await loadBiens();
    } catch {
      toast.error('Impossible de supprimer ce bien');
    }
  };

  const handleToggleVedette = async (bienId: number) => {
    try {
      await toggleBienVedette(bienId);
      toast.success('Statut mis a jour');
      await loadBiens();
    } catch {
      toast.error('Une erreur est survenue');
    }
  };

  const columns = useMemo<DataTableColumn<ApiBien>[]>(
    () => [
      {
        key: 'select',
        header: '',
        headerClassName: 'w-10',
        cellClassName: 'w-10',
        render: (bien) => (
          <input
            type="checkbox"
            checked={selectedIds.includes(bien.id)}
            onChange={(event) =>
              setSelectedIds((prev) =>
                event.target.checked ? [...prev, bien.id] : prev.filter((id) => id !== bien.id)
              )
            }
            className="h-4 w-4 rounded border-slate-300"
          />
        ),
      },
      {
        key: 'bien',
        header: 'Bien',
        render: (bien) => (
          <div className="flex items-center gap-3">
            <img
              src={bien.images?.[0]?.url ?? 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=120'}
              alt={bien.titre}
              className="h-11 w-11 rounded-lg object-cover"
            />
            <div className="min-w-0">
              <p className="truncate font-medium text-slate-800">{bien.titre}</p>
              <p className="truncate text-xs text-slate-400">{bien.reference || 'Sans reference'}</p>
            </div>
          </div>
        ),
      },
      {
        key: 'type',
        header: 'Type',
        render: (bien) => <TypeBadge type={bien.type} />,
      },
      {
        key: 'transaction',
        header: 'Transaction',
        render: (bien) => (
          <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium capitalize text-slate-700">
            {bien.transaction}
          </span>
        ),
      },
      {
        key: 'statut',
        header: 'Statut',
        render: (bien) => <StatusBadge status={bien.statut} />,
      },
      {
        key: 'prix',
        header: 'Prix',
        render: (bien) => <span className="text-sm font-semibold text-slate-800">{formatPrix(bien.prix, bien.transaction)}</span>,
      },
      {
        key: 'vedette',
        header: '★',
        render: (bien) => (
          <button
            type="button"
            onClick={() => void handleToggleVedette(bien.id)}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-full border ${
              bien.en_vedette
                ? 'border-amber-200 bg-amber-50 text-amber-500'
                : 'border-slate-200 bg-white text-slate-400'
            }`}
          >
            <Star className={`h-4 w-4 ${bien.en_vedette ? 'fill-current' : ''}`} />
          </button>
        ),
      },
      {
        key: 'actions',
        header: '...',
        render: (bien) => (
          <div className="flex items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              type="button"
              onClick={() => openEditDrawer(bien)}
              className="text-slate-400 transition-colors hover:text-[#0D354E]"
              title="Editer"
            >
              <Edit3 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setConfirmDeleteId(bien.id)}
              className="text-slate-400 transition-colors hover:text-red-500"
              title="Supprimer"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ),
      },
    ],
    [selectedIds]
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Biens immobiliers"
        subtitle={`${filteredBiens.length} bien(s) dans le catalogue`}
        action={
          <button
            type="button"
            onClick={openCreateDrawer}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#0D354E] px-4 text-sm font-medium text-white hover:bg-[#0D354E]/90"
          >
            <Plus className="h-4 w-4" />
            Nouveau bien
          </button>
        }
      />

      <div className="flex flex-wrap gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
        <label className="relative min-w-[240px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Rechercher un bien..."
            className="h-9 w-full rounded-lg border border-slate-200 pl-10 pr-3 text-sm text-slate-700 focus:border-[#7A9E9F] focus:outline-none focus:ring-2 focus:ring-[#7A9E9F]/20"
          />
        </label>

        <select
          value={typeFilter}
          onChange={(event) => setTypeFilter(event.target.value)}
          className="h-9 rounded-lg border border-slate-200 px-3 text-sm text-slate-700 focus:border-[#7A9E9F] focus:outline-none focus:ring-2 focus:ring-[#7A9E9F]/20"
        >
          <option value="all">Tous les types</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          value={transactionFilter}
          onChange={(event) => setTransactionFilter(event.target.value)}
          className="h-9 rounded-lg border border-slate-200 px-3 text-sm text-slate-700 focus:border-[#7A9E9F] focus:outline-none focus:ring-2 focus:ring-[#7A9E9F]/20"
        >
          <option value="all">Toutes transactions</option>
          {transactions.map((transaction) => (
            <option key={transaction} value={transaction}>
              {transaction}
            </option>
          ))}
        </select>

        <select
          value={statutFilter}
          onChange={(event) => setStatutFilter(event.target.value)}
          className="h-9 rounded-lg border border-slate-200 px-3 text-sm text-slate-700 focus:border-[#7A9E9F] focus:outline-none focus:ring-2 focus:ring-[#7A9E9F]/20"
        >
          <option value="all">Tous les statuts</option>
          {statuts.map((statut) => (
            <option key={statut} value={statut}>
              {statut}
            </option>
          ))}
        </select>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 text-sm font-medium text-red-500 hover:bg-red-100"
          >
            <X className="h-4 w-4" />
            Reset
          </button>
        )}
      </div>

      <DataTable
        columns={columns}
        data={filteredBiens}
        loading={loading}
        rowKey={(bien) => bien.id}
        rowClassName={(bien) =>
          `group ${bien.statut !== 'disponible' ? 'opacity-60' : ''}`
        }
        emptyState={
          <EmptyState
            icon={Home}
            title="Aucun bien trouve"
            description="Ajoutez votre premier bien au catalogue."
            action={
              <button
                type="button"
                onClick={openCreateDrawer}
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#0D354E] px-4 text-sm font-medium text-white hover:bg-[#0D354E]/90"
              >
                <Plus className="h-4 w-4" />
                Ajouter un bien
              </button>
            }
          />
        }
      />

      <AdminDrawer
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          resetFormState();
        }}
        title={editingBien ? `Modifier : ${editingBien.titre}` : 'Nouveau bien'}
        description="Renseigner la fiche immobiliere et ses options de diffusion."
        footer={
          <div className="flex w-full justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setDrawerOpen(false);
                resetFormState();
              }}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              form="bien-form"
              disabled={saving}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0D354E] px-4 text-sm font-medium text-white hover:bg-[#0D354E]/90 disabled:opacity-70"
            >
              {saving && <Spinner className="h-4 w-4" />}
              Enregistrer
            </button>
          </div>
        }
      >
        <form id="bien-form" onSubmit={handleSubmit} className="space-y-6">
          <section className="space-y-4">
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Informations generales
            </h3>
            <div className="space-y-4">
              <input
                value={form.titre}
                onChange={(event) => setForm((prev) => ({ ...prev, titre: event.target.value }))}
                placeholder="Titre"
                required
                className="h-9 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 focus:border-[#7A9E9F] focus:outline-none focus:ring-2 focus:ring-[#7A9E9F]/20"
              />
              <textarea
                value={form.description}
                onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
                placeholder="Description"
                rows={4}
                className="w-full rounded-lg border border-slate-200 px-3 py-3 text-sm text-slate-700 focus:border-[#7A9E9F] focus:outline-none focus:ring-2 focus:ring-[#7A9E9F]/20"
              />
              <input
                value={form.reference ?? ''}
                onChange={(event) => setForm((prev) => ({ ...prev, reference: event.target.value }))}
                placeholder={referencePlaceholder}
                className="h-9 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 focus:border-[#7A9E9F] focus:outline-none focus:ring-2 focus:ring-[#7A9E9F]/20"
              />
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Localisation
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <input
                value={form.zone}
                onChange={(event) => setForm((prev) => ({ ...prev, zone: event.target.value }))}
                placeholder="Zone"
                className="h-9 rounded-lg border border-slate-200 px-3 text-sm text-slate-700 focus:border-[#7A9E9F] focus:outline-none focus:ring-2 focus:ring-[#7A9E9F]/20"
              />
              <input
                value={form.quartier}
                onChange={(event) => setForm((prev) => ({ ...prev, quartier: event.target.value }))}
                placeholder="Quartier"
                className="h-9 rounded-lg border border-slate-200 px-3 text-sm text-slate-700 focus:border-[#7A9E9F] focus:outline-none focus:ring-2 focus:ring-[#7A9E9F]/20"
              />
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Caracteristiques
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <select
                value={form.type}
                onChange={(event) => setForm((prev) => ({ ...prev, type: event.target.value as BienType }))}
                className="h-9 rounded-lg border border-slate-200 px-3 text-sm text-slate-700 focus:border-[#7A9E9F] focus:outline-none focus:ring-2 focus:ring-[#7A9E9F]/20"
              >
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <select
                value={form.transaction}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, transaction: event.target.value as BienTransaction }))
                }
                className="h-9 rounded-lg border border-slate-200 px-3 text-sm text-slate-700 focus:border-[#7A9E9F] focus:outline-none focus:ring-2 focus:ring-[#7A9E9F]/20"
              >
                {transactions.map((transaction) => (
                  <option key={transaction} value={transaction}>
                    {transaction}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="number"
                value={form.surface}
                onChange={(event) => setForm((prev) => ({ ...prev, surface: Number(event.target.value) }))}
                placeholder="Surface m2"
                className="h-9 rounded-lg border border-slate-200 px-3 text-sm text-slate-700 focus:border-[#7A9E9F] focus:outline-none focus:ring-2 focus:ring-[#7A9E9F]/20"
              />
              <input
                type="number"
                value={form.prix}
                onChange={(event) => setForm((prev) => ({ ...prev, prix: Number(event.target.value) }))}
                placeholder="Prix FCFA"
                className="h-9 rounded-lg border border-slate-200 px-3 text-sm text-slate-700 focus:border-[#7A9E9F] focus:outline-none focus:ring-2 focus:ring-[#7A9E9F]/20"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <input
                type="number"
                value={form.pieces ?? 0}
                onChange={(event) => setForm((prev) => ({ ...prev, pieces: Number(event.target.value) }))}
                placeholder="Pieces"
                className="h-9 rounded-lg border border-slate-200 px-3 text-sm text-slate-700 focus:border-[#7A9E9F] focus:outline-none focus:ring-2 focus:ring-[#7A9E9F]/20"
              />
              <input
                type="number"
                value={form.chambres ?? 0}
                onChange={(event) => setForm((prev) => ({ ...prev, chambres: Number(event.target.value) }))}
                placeholder="Chambres"
                className="h-9 rounded-lg border border-slate-200 px-3 text-sm text-slate-700 focus:border-[#7A9E9F] focus:outline-none focus:ring-2 focus:ring-[#7A9E9F]/20"
              />
              <input
                type="number"
                value={form.salle_de_bain ?? 0}
                onChange={(event) => setForm((prev) => ({ ...prev, salle_de_bain: Number(event.target.value) }))}
                placeholder="SDB"
                className="h-9 rounded-lg border border-slate-200 px-3 text-sm text-slate-700 focus:border-[#7A9E9F] focus:outline-none focus:ring-2 focus:ring-[#7A9E9F]/20"
              />
              <input
                type="number"
                value={form.etage ?? ''}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    etage: event.target.value ? Number(event.target.value) : null,
                  }))
                }
                placeholder="Etage"
                className="h-9 rounded-lg border border-slate-200 px-3 text-sm text-slate-700 focus:border-[#7A9E9F] focus:outline-none focus:ring-2 focus:ring-[#7A9E9F]/20"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <select
                value={form.statut}
                onChange={(event) => setForm((prev) => ({ ...prev, statut: event.target.value as BienStatut }))}
                className="h-9 rounded-lg border border-slate-200 px-3 text-sm text-slate-700 focus:border-[#7A9E9F] focus:outline-none focus:ring-2 focus:ring-[#7A9E9F]/20"
              >
                {statuts.map((statut) => (
                  <option key={statut} value={statut}>
                    {statut}
                  </option>
                ))}
              </select>

              <div className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-2.5">
                <span className="text-sm font-medium text-slate-700">En vedette</span>
                <Switch
                  checked={form.en_vedette ?? false}
                  onCheckedChange={(checked) => setForm((prev) => ({ ...prev, en_vedette: checked }))}
                  className="data-[state=checked]:bg-[#0D354E]"
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Equipements
            </h3>
            <textarea
              value={equipementsText}
              onChange={(event) => setEquipementsText(event.target.value)}
              rows={5}
              placeholder="Une ligne par equipement"
              className="w-full rounded-lg border border-slate-200 px-3 py-3 text-sm text-slate-700 focus:border-[#7A9E9F] focus:outline-none focus:ring-2 focus:ring-[#7A9E9F]/20"
            />
          </section>

          <section className="space-y-4">
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Images
            </h3>
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
              <Upload className="h-6 w-6 text-slate-400" />
              <p className="mt-3 text-sm font-medium text-slate-700">Glisser-deposer ou cliquer</p>
              <p className="mt-1 text-xs text-slate-400">PNG, JPG ou WEBP</p>
              <input
                type="file"
                multiple
                className="hidden"
                onChange={(event) => handleFilesSelected(event.target.files)}
              />
            </label>

            {(editingBien?.images?.length || newImagePreviews.length) > 0 && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {editingBien?.images?.map((image) => (
                  <div key={`existing-${image.id}`} className="relative overflow-hidden rounded-xl border border-slate-200">
                    <img src={image.url} alt={editingBien.titre} className="h-24 w-full object-cover" />
                    <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                      Existant
                    </span>
                  </div>
                ))}

                {newImagePreviews.map((preview) => (
                  <div key={preview.id} className="relative overflow-hidden rounded-xl border border-slate-200">
                    <img src={preview.url} alt={preview.file.name} className="h-24 w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeNewPreview(preview.id)}
                      className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-slate-700 hover:bg-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </form>
      </AdminDrawer>

      <ConfirmDialog
        open={confirmDeleteId !== null}
        onCancel={() => setConfirmDeleteId(null)}
        onConfirm={() => void handleDelete()}
        title="Supprimer ce bien ?"
        description="Cette action est irreversible. Le bien sera definitivement supprime."
        confirmLabel="Supprimer"
        danger
      />
    </div>
  );
}
