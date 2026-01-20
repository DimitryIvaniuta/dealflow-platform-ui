import React from 'react';
import { Box, Button, Card, CardContent, Chip, Divider, Stack, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/authStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addCustomerNote, fetchCustomerTimeline } from '@/features/timeline/timelineApi';

function fmt(iso: string) {
  try { return new Date(iso).toLocaleString(); } catch { return iso; }
}

export function CustomerDetailPage() {
  const { customerId } = useParams();
  const workspaceId = useAuthStore((s) => s.workspaceId);
  const qc = useQueryClient();

  const [text, setText] = React.useState('');
  const [note, setNote] = React.useState('');

  const timelineQuery = useQuery({
    queryKey: ['customerTimeline', workspaceId, customerId, text],
    queryFn: () => {
      if (!workspaceId) throw new Error('Workspace ID is required');
      if (!customerId) throw new Error('Customer ID is required');
      return fetchCustomerTimeline(workspaceId, customerId, text ? { text } : null, 0, 50);
    },
    enabled: !!workspaceId && !!customerId
  });

  const addNoteMutation = useMutation({
    mutationFn: () => {
      if (!workspaceId) throw new Error('Workspace ID is required');
      if (!customerId) throw new Error('Customer ID is required');
      return addCustomerNote(workspaceId, customerId, note.trim());
    },
    onSuccess: () => {
      setNote('');
      qc.invalidateQueries({ queryKey: ['customerTimeline', workspaceId, customerId] });
    }
  });

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
        Customer timeline
      </Typography>
      <Typography variant="body2" sx={{ opacity: 0.7, mb: 2 }}>
        Customer ID: {customerId}
      </Typography>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>Add note</Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} alignItems="stretch">
            <TextField
              label="Note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              disabled={!note.trim() || addNoteMutation.isPending || !workspaceId || !customerId}
              onClick={() => addNoteMutation.mutate()}
            >
              Add
            </Button>
          </Stack>
          {addNoteMutation.isError ? (
            <Typography variant="body2" sx={{ color: 'error.main', mt: 1 }}>
              {(addNoteMutation.error as Error).message}
            </Typography>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} alignItems="center">
            <Typography variant="h6" sx={{ flex: 1 }}>Events</Typography>
            <TextField
              label="Search (summary + payload)"
              value={text}
              onChange={(e) => setText(e.target.value)}
              size="small"
              sx={{ width: 360 }}
            />
          </Stack>

          <Divider sx={{ my: 2 }} />

          {!workspaceId ? (
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              Enter Workspace ID in header.
            </Typography>
          ) : timelineQuery.isLoading ? (
            <Typography variant="body2">Loading...</Typography>
          ) : timelineQuery.isError ? (
            <Typography variant="body2" sx={{ color: 'error.main' }}>
              {(timelineQuery.error as Error).message}
            </Typography>
          ) : (
            <Stack spacing={1}>
              {timelineQuery.data?.items.map((e) => (
                <Box key={e.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1, flexWrap: 'wrap' }}>
                    <Chip label={e.eventType} size="small" color="primary" />
                    <Chip label={e.category} size="small" variant="outlined" />
                    <Chip label={e.source} size="small" variant="outlined" />
                    <Typography variant="caption" sx={{ opacity: 0.7 }}>
                      {fmt(e.occurredAt)} • {e.actorSubject}
                    </Typography>
                  </Stack>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {e.summary}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8, mt: 0.5, whiteSpace: 'pre-wrap' }}>
                    {JSON.stringify(e.payload, null, 2)}
                  </Typography>
                </Box>
              ))}
            </Stack>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
