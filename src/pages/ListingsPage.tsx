import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useWorkspaceId } from '@/features/workspace/workspaceStore';
import {
  Listing,
  ListingFilterInput,
  ListingStatus,
  createListing,
  deleteListing,
  fetchListings,
  publishListing,
  updateListing
} from '@/features/listings/listingApi';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishIcon from '@mui/icons-material/Publish';
import AddIcon from '@mui/icons-material/Add';

type EditorMode = 'create' | 'edit';

function money(v: string | null | undefined) {
  if (!v) return '';
  const n = Number(v);
  if (!Number.isFinite(n)) return v;
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

const STATUSES: ListingStatus[] = ['DRAFT', 'PUBLISHED', 'ARCHIVED'];

export function ListingsPage() {
  const ws = useWorkspaceId();
  const qc = useQueryClient();

  const [pagination, setPagination] = React.useState<GridPaginationModel>({ page: 0, pageSize: 25 });
  const [filter, setFilter] = React.useState<ListingFilterInput>({ city: '', status: null, minPrice: '', maxPrice: '' });

  const [editorOpen, setEditorOpen] = React.useState(false);
  const [editorMode, setEditorMode] = React.useState<EditorMode>('create');
  const [editing, setEditing] = React.useState<Listing | null>(null);

  const queryKey = ['listings', ws, pagination.page, pagination.pageSize, filter];
  const q = useQuery({
    queryKey,
    enabled: !!ws,
    queryFn: async () => {
      const f: ListingFilterInput = {
        city: filter.city?.trim() || null,
        status: filter.status || null,
        minPrice: filter.minPrice?.trim() || null,
        maxPrice: filter.maxPrice?.trim() || null
      };
      return fetchListings(ws!, normalizeEmptyFilter(f), pagination.page, pagination.pageSize);
    }
  });

  const mCreate = useMutation({
    mutationFn: createListing,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['listings', ws] });
      setEditorOpen(false);
    }
  });
  const mUpdate = useMutation({
    mutationFn: updateListing,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['listings', ws] });
      setEditorOpen(false);
    }
  });
  const mDelete = useMutation({
    mutationFn: async ({ listingId }: { listingId: string }) => deleteListing(ws!, listingId),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['listings', ws] });
    }
  });
  const mPublish = useMutation({
    mutationFn: async ({ listingId }: { listingId: string }) => publishListing(ws!, listingId),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['listings', ws] });
    }
  });

  if (!ws) {
    return (
      <>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
          Listings
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          Select a workspace to view listings.
        </Typography>
      </>
    );
  }

  const rows = q.data?.items ?? [];
  const pageInfo = q.data?.pageInfo;

  const cols: GridColDef<Listing>[] = [
    { field: 'title', headerName: 'Title', flex: 1, minWidth: 220 },
    { field: 'city', headerName: 'City', width: 160 },
    {
      field: 'askingPrice',
      headerName: 'Asking',
      width: 150,
      valueFormatter: (p) => money(p.value as any)
    },
    { field: 'status', headerName: 'Status', width: 140 },
    {
      field: 'customer',
      headerName: 'Customer',
      width: 220,
      valueGetter: (_, row) => row.customer?.displayName ?? ''
    },
    {
      field: 'actions',
      type: 'actions',
      width: 120,
      getActions: (params) => {
        const row = params.row;
        return [
          <GridActionsCellItem
            key="edit"
            icon={<EditIcon />}
            label="Edit"
            onClick={() => {
              setEditorMode('edit');
              setEditing(row);
              setEditorOpen(true);
            }}
          />,
          <GridActionsCellItem
            key="publish"
            icon={<PublishIcon />}
            label="Publish"
            disabled={row.status === 'PUBLISHED' || row.status === 'ARCHIVED'}
            onClick={() => mPublish.mutate({ listingId: row.id })}
          />,
          <GridActionsCellItem
            key="delete"
            icon={<DeleteIcon />}
            label="Archive"
            onClick={() => mDelete.mutate({ listingId: row.id })}
          />
        ];
      }
    }
  ];

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Listings
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setEditorMode('create');
            setEditing(null);
            setEditorOpen(true);
          }}
        >
          New listing
        </Button>
      </Box>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} sx={{ mb: 2 }}>
        <TextField
          label="City"
          size="small"
          value={filter.city ?? ''}
          onChange={(e) => setFilter((f) => ({ ...f, city: e.target.value }))}
        />
        <TextField
          label="Status"
          select
          size="small"
          value={filter.status ?? ''}
          onChange={(e) => setFilter((f) => ({ ...f, status: (e.target.value || null) as any }))}
          sx={{ width: 180 }}
        >
          <MenuItem value="">Any</MenuItem>
          {STATUSES.map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Min price"
          size="small"
          value={filter.minPrice ?? ''}
          onChange={(e) => setFilter((f) => ({ ...f, minPrice: e.target.value }))}
          sx={{ width: 160 }}
        />
        <TextField
          label="Max price"
          size="small"
          value={filter.maxPrice ?? ''}
          onChange={(e) => setFilter((f) => ({ ...f, maxPrice: e.target.value }))}
          sx={{ width: 160 }}
        />
        <Box sx={{ flex: 1 }} />
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => {
            setPagination({ page: 0, pageSize: pagination.pageSize });
            void qc.invalidateQueries({ queryKey: ['listings', ws] });
          }}
        >
          Apply
        </Button>
      </Stack>

      <Box sx={{ height: 640, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={cols}
          getRowId={(r) => r.id}
          loading={q.isLoading}
          paginationMode="server"
          rowCount={pageInfo?.totalElements ?? 0}
          paginationModel={pagination}
          onPaginationModelChange={setPagination}
          disableRowSelectionOnClick
          pageSizeOptions={[10, 25, 50, 100]}
        />
      </Box>

      <ListingEditorDialog
        open={editorOpen}
        mode={editorMode}
        initial={editing}
        onClose={() => setEditorOpen(false)}
        onSubmit={async (data) => {
          if (editorMode === 'create') {
            await mCreate.mutateAsync({ workspaceId: ws, ...data, askingPrice: data.askingPrice });
          } else if (editing) {
            await mUpdate.mutateAsync({
              workspaceId: ws,
              listingId: editing.id,
              title: data.title,
              city: data.city,
              askingPrice: data.askingPrice,
              status: data.status as any
            });
          }
        }}
      />
    </>
  );
}

function normalizeEmptyFilter(f: ListingFilterInput): ListingFilterInput | null {
  const has = Object.values(f).some((v) => v !== null && v !== undefined && String(v).trim() !== '');
  return has ? f : null;
}

function ListingEditorDialog(props: {
  open: boolean;
  mode: EditorMode;
  initial: Listing | null;
  onClose: () => void;
  onSubmit: (data: { title: string; city: string; askingPrice: string; status: ListingStatus }) => Promise<void>;
}) {
  const { open, mode, initial } = props;
  const [title, setTitle] = React.useState('');
  const [city, setCity] = React.useState('');
  const [askingPrice, setAskingPrice] = React.useState('');
  const [status, setStatus] = React.useState<ListingStatus>('DRAFT');
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    setTitle(initial?.title ?? '');
    setCity(initial?.city ?? '');
    setAskingPrice(initial?.askingPrice ?? '');
    setStatus((initial?.status as ListingStatus) ?? 'DRAFT');
  }, [open, initial]);

  return (
    <Dialog open={open} onClose={() => !saving && props.onClose()} fullWidth maxWidth="sm">
      <DialogTitle>{mode === 'create' ? 'New listing' : 'Edit listing'}</DialogTitle>
      <DialogContent sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextField label="City" value={city} onChange={(e) => setCity(e.target.value)} />
        <TextField
          label="Asking price"
          value={askingPrice}
          onChange={(e) => setAskingPrice(e.target.value)}
          helperText="Number (sent as BigDecimal)"
        />
        <TextField
          label="Status"
          select
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
        >
          {STATUSES.filter((s) => s !== 'ARCHIVED').map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={props.onClose} disabled={saving}>
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={saving || !title.trim() || !city.trim() || !askingPrice.trim()}
          onClick={async () => {
            setSaving(true);
            try {
              await props.onSubmit({
                title: title.trim(),
                city: city.trim(),
                askingPrice: askingPrice.trim(),
                status
              });
            } finally {
              setSaving(false);
            }
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
