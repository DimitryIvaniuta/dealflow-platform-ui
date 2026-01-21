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
  Opportunity,
  OpportunityFilterInput,
  OpportunityStage,
  createOpportunity,
  deleteOpportunity,
  fetchOpportunities,
  moveOpportunityStage,
  updateOpportunity
} from '@/features/opportunities/opportunityApi';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

type EditorMode = 'create' | 'edit';

const STAGES: OpportunityStage[] = ['INTAKE', 'DISCOVERY', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST', 'ARCHIVED'];

function money(v: string | null | undefined) {
  if (!v) return '';
  const n = Number(v);
  if (!Number.isFinite(n)) return v;
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(n);
}

export function OpportunitiesPage() {
  const ws = useWorkspaceId();
  const qc = useQueryClient();

  const [pagination, setPagination] = React.useState<GridPaginationModel>({ page: 0, pageSize: 25 });
  const [filter, setFilter] = React.useState<OpportunityFilterInput>({ stage: null, ownerMemberId: null, minAmount: '', maxAmount: '' });

  const [editorOpen, setEditorOpen] = React.useState(false);
  const [editorMode, setEditorMode] = React.useState<EditorMode>('create');
  const [editing, setEditing] = React.useState<Opportunity | null>(null);

  const queryKey = ['opportunities', ws, pagination.page, pagination.pageSize, filter];
  const q = useQuery({
    queryKey,
    enabled: !!ws,
    queryFn: async () => {
      const f: OpportunityFilterInput = {
        stage: filter.stage || null,
        ownerMemberId: filter.ownerMemberId?.trim() || null,
        minAmount: filter.minAmount?.trim() || null,
        maxAmount: filter.maxAmount?.trim() || null
      };
      return fetchOpportunities(ws!, normalizeEmptyFilter(f), pagination.page, pagination.pageSize);
    }
  });

  const mCreate = useMutation({
    mutationFn: createOpportunity,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['opportunities', ws] });
      setEditorOpen(false);
    }
  });

  const mUpdate = useMutation({
    mutationFn: updateOpportunity,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['opportunities', ws] });
      setEditorOpen(false);
    }
  });

  const mDelete = useMutation({
    mutationFn: async ({ opportunityId }: { opportunityId: string }) => deleteOpportunity(ws!, opportunityId),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['opportunities', ws] });
    }
  });

  const mMoveStage = useMutation({
    mutationFn: async ({ opportunityId, stage }: { opportunityId: string; stage: OpportunityStage }) =>
      moveOpportunityStage(ws!, opportunityId, stage),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['opportunities', ws] });
    }
  });

  if (!ws) {
    return (
      <>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
          Opportunities
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          Select a workspace to view opportunities.
        </Typography>
      </>
    );
  }

  const rows = q.data?.content ?? [];

  const cols: GridColDef<Opportunity>[] = [
    { field: 'title', headerName: 'Title', flex: 1, minWidth: 240 },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 160,
      valueFormatter: (p) => money(p.value as any)
    },
    {
      field: 'stage',
      headerName: 'Stage',
      width: 180,
      renderCell: (p) => (
        <TextField
          select
          size="small"
          value={p.row.stage}
          onChange={(e) => mMoveStage.mutate({ opportunityId: p.row.id, stage: e.target.value as any })}
          sx={{ minWidth: 160 }}
        >
          {STAGES.filter((s) => s !== 'ARCHIVED').map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </TextField>
      )
    },
    { field: 'expectedCloseDate', headerName: 'Close date', width: 140 },
    {
      field: 'customer',
      headerName: 'Customer',
      width: 220,
      valueGetter: (_, row) => row.customer?.displayName ?? ''
    },
    {
      field: 'owner',
      headerName: 'Owner',
      width: 200,
      valueGetter: (_, row) => row.owner?.displayName ?? ''
    },
    {
      field: 'actions',
      type: 'actions',
      width: 100,
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
            key="delete"
            icon={<DeleteIcon />}
            label="Archive"
            onClick={() => mDelete.mutate({ opportunityId: row.id })}
          />
        ];
      }
    }
  ];

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Opportunities
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
          New opportunity
        </Button>
      </Box>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} sx={{ mb: 2 }}>
        <TextField
          label="Stage"
          select
          size="small"
          value={filter.stage ?? ''}
          onChange={(e) => setFilter((f) => ({ ...f, stage: (e.target.value || null) as any }))}
          sx={{ width: 200 }}
        >
          <MenuItem value="">Any</MenuItem>
          {STAGES.filter((s) => s !== 'ARCHIVED').map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Owner member id"
          size="small"
          value={filter.ownerMemberId ?? ''}
          onChange={(e) => setFilter((f) => ({ ...f, ownerMemberId: e.target.value }))}
          sx={{ width: 320 }}
        />
        <TextField
          label="Min amount"
          size="small"
          value={filter.minAmount ?? ''}
          onChange={(e) => setFilter((f) => ({ ...f, minAmount: e.target.value }))}
          sx={{ width: 160 }}
        />
        <TextField
          label="Max amount"
          size="small"
          value={filter.maxAmount ?? ''}
          onChange={(e) => setFilter((f) => ({ ...f, maxAmount: e.target.value }))}
          sx={{ width: 160 }}
        />
        <Box sx={{ flex: 1 }} />
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => {
            setPagination({ page: 0, pageSize: pagination.pageSize });
            void qc.invalidateQueries({ queryKey: ['opportunities', ws] });
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
          rowCount={q.data?.totalElements ?? 0}
          paginationModel={pagination}
          onPaginationModelChange={setPagination}
          disableRowSelectionOnClick
          pageSizeOptions={[10, 25, 50, 100]}
        />
      </Box>

      <OpportunityEditorDialog
        open={editorOpen}
        mode={editorMode}
        initial={editing}
        onClose={() => setEditorOpen(false)}
        onSubmit={async (data) => {
          if (editorMode === 'create') {
            await mCreate.mutateAsync({ workspaceId: ws, ...data });
          } else if (editing) {
            await mUpdate.mutateAsync({
              workspaceId: ws,
              opportunityId: editing.id,
              title: data.title,
              amount: data.amount,
              expectedCloseDate: data.expectedCloseDate,
              stage: data.stage as any
            });
          }
        }}
      />
    </>
  );
}

function normalizeEmptyFilter(f: OpportunityFilterInput): OpportunityFilterInput | null {
  const has = Object.values(f).some((v) => v !== null && v !== undefined && String(v).trim() !== '');
  return has ? f : null;
}

function OpportunityEditorDialog(props: {
  open: boolean;
  mode: EditorMode;
  initial: Opportunity | null;
  onClose: () => void;
  onSubmit: (data: { title: string; amount?: string | null; expectedCloseDate?: string | null; stage: OpportunityStage }) => Promise<void>;
}) {
  const { open, mode, initial } = props;
  const [title, setTitle] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [expectedCloseDate, setExpectedCloseDate] = React.useState('');
  const [stage, setStage] = React.useState<OpportunityStage>('INTAKE');
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    setTitle(initial?.title ?? '');
    setAmount(initial?.amount ?? '');
    setExpectedCloseDate(initial?.expectedCloseDate ?? '');
    setStage((initial?.stage as OpportunityStage) ?? 'INTAKE');
  }, [open, initial]);

  return (
    <Dialog open={open} onClose={() => !saving && props.onClose()} fullWidth maxWidth="sm">
      <DialogTitle>{mode === 'create' ? 'New opportunity' : 'Edit opportunity'}</DialogTitle>
      <DialogContent sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextField label="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} helperText="Optional" />
        <TextField
          label="Expected close date"
          value={expectedCloseDate}
          onChange={(e) => setExpectedCloseDate(e.target.value)}
          helperText="YYYY-MM-DD (optional)"
        />
        <TextField label="Stage" select value={stage} onChange={(e) => setStage(e.target.value as any)}>
          {STAGES.filter((s) => s !== 'ARCHIVED').map((s) => (
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
          disabled={saving || !title.trim()}
          onClick={async () => {
            setSaving(true);
            try {
              await props.onSubmit({
                title: title.trim(),
                amount: amount.trim() || null,
                expectedCloseDate: expectedCloseDate.trim() || null,
                stage
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
