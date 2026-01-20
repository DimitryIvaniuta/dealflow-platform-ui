import React from 'react';
import { Box, Button, Card, CardContent, Divider, Stack, TextField, Typography } from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/authStore';
import { createCustomer, fetchCustomers } from '@/features/customers/customerApi';

export function CustomersPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const workspaceId = useAuthStore((s) => s.workspaceId);
  const [text, setText] = React.useState('');
  const [displayName, setDisplayName] = React.useState('');
  const [email, setEmail] = React.useState('');

  const customersQuery = useQuery({
    queryKey: ['customers', workspaceId, text],
    queryFn: () => {
      if (!workspaceId) throw new Error('Workspace ID is required');
      return fetchCustomers(workspaceId, text ? { text } : null, 0, 25);
    },
    enabled: !!workspaceId
  });

  const createMutation = useMutation({
    mutationFn: () => {
      if (!workspaceId) throw new Error('Workspace ID is required');
      return createCustomer({ workspaceId, displayName: displayName.trim(), email: email.trim() || null });
    },
    onSuccess: (c) => {
      qc.invalidateQueries({ queryKey: ['customers', workspaceId] });
      setDisplayName('');
      setEmail('');
      navigate(`/customers/${c.id}`);
    }
  });

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
        Customers
      </Typography>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>Create customer</Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={1}>
            <TextField label="Display name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} fullWidth />
            <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
            <Button
              variant="contained"
              disabled={!displayName.trim() || createMutation.isPending || !workspaceId}
              onClick={() => createMutation.mutate()}
            >
              Create
            </Button>
          </Stack>
          {createMutation.isError ? (
            <Typography variant="body2" sx={{ color: 'error.main', mt: 1 }}>
              {(createMutation.error as Error).message}
            </Typography>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} alignItems="center">
            <Typography variant="h6" sx={{ flex: 1 }}>Customer list</Typography>
            <TextField
              label="Search"
              value={text}
              onChange={(e) => setText(e.target.value)}
              size="small"
              sx={{ width: 320 }}
            />
          </Stack>
          <Divider sx={{ my: 2 }} />

          {!workspaceId ? (
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              Enter Workspace ID in header to load customers.
            </Typography>
          ) : customersQuery.isLoading ? (
            <Typography variant="body2">Loading...</Typography>
          ) : customersQuery.isError ? (
            <Typography variant="body2" sx={{ color: 'error.main' }}>
              {(customersQuery.error as Error).message}
            </Typography>
          ) : (
            <Stack spacing={1}>
              {customersQuery.data?.items.map((c) => (
                <Button
                  key={c.id}
                  variant="outlined"
                  color="inherit"
                  sx={{ justifyContent: 'space-between', textTransform: 'none' }}
                  onClick={() => navigate(`/customers/${c.id}`)}
                >
                  <span>{c.displayName}</span>
                  <span style={{ opacity: 0.7 }}>{c.status}</span>
                </Button>
              ))}
            </Stack>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
