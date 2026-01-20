import React from 'react';
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useQuery } from '@tanstack/react-query';
import { PageHeader } from '@/shared/components/PageHeader';
import { SectionCard } from '@/shared/components/SectionCard';
import { JsonBlock } from '@/shared/components/JsonBlock';
import { Centered } from '@/shared/components/Centered';
import { useAuthStore } from '@/features/auth/authStore';
import { decodeJwt, getJwtRoles } from '@/shared/utils/jwt';

type Health = {
  status?: string;
  components?: Record<string, any>;
};

function useBackendHealth() {
  const baseUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080').replace(/\/$/, '');
  return useQuery({
    queryKey: ['actuator', 'health', baseUrl],
    queryFn: async (): Promise<Health> => {
      const r = await fetch(`${baseUrl}/actuator/health`, { headers: { Accept: 'application/json' } });
      if (!r.ok) throw new Error(`Health check failed (${r.status})`);
      return (await r.json()) as Health;
    },
    staleTime: 10_000
  });
}

function TabPanel(props: { value: number; index: number; children: React.ReactNode }) {
  const { value, index, children } = props;
  if (value !== index) return null;
  return <Box sx={{ mt: 2 }}>{children}</Box>;
}

export function AdminPage() {
  const [tab, setTab] = React.useState(0);

  const token = useAuthStore((s) => s.token);
  const subject = useAuthStore((s) => s.subject);
  const workspaceId = useAuthStore((s) => s.workspaceId);
  const roles = useAuthStore((s) => s.roles);

  const baseUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080').replace(/\/$/, '');
  const gqlUrl = `${baseUrl}/graphql`;

  const payload = React.useMemo(() => (token ? decodeJwt(token) : {}), [token]);
  const tokenRoles = React.useMemo(() => (token ? getJwtRoles(payload) : []), [token, payload]);
  const { data: health, isLoading: healthLoading, error: healthError, refetch } = useBackendHealth();

  const copy = async (v: string) => {
    try {
      await navigator.clipboard.writeText(v);
    } catch {
      // ignore
    }
  };

  return (
    <Box>
      <PageHeader
        title="Administration"
        subtitle="RBAC-aware tooling, environment diagnostics, and developer utilities"
        crumbs={[{ label: 'Administration' }]}
      />

      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{ mt: 2, borderBottom: '1px solid rgba(255,255,255,0.08)' }}
      >
        <Tab label="RBAC & Token" />
        <Tab label="Backend Health" />
        <Tab label="Developer Tools" />
      </Tabs>

      <TabPanel value={tab} index={0}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <SectionCard
              title="Session"
              subtitle="What the UI currently uses for authorization"
              action={
                token ? (
                  <Button size="small" startIcon={<ContentCopyIcon />} onClick={() => copy(token)}>
                    Copy token
                  </Button>
                ) : null
              }
            >
              <Stack spacing={1.5}>
                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Subject:
                  </Typography>
                  <Chip size="small" label={subject ?? '—'} />
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Workspace:
                  </Typography>
                  <Chip size="small" label={workspaceId ?? '—'} />
                </Stack>

                <Divider />

                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  Effective roles
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {(roles?.length ? roles : tokenRoles).length ? (
                    (roles?.length ? roles : tokenRoles).map((r) => <Chip key={r} size="small" label={r} />)
                  ) : (
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)' }}>
                      No roles found in token.
                    </Typography>
                  )}
                </Stack>
              </Stack>
            </SectionCard>
          </Grid>

          <Grid item xs={12} lg={6}>
            <SectionCard title="Token claims" subtitle="Decoded JWT payload (read-only)">
              {token ? <JsonBlock value={payload} maxHeight={420} /> : <Typography>No token</Typography>}
            </SectionCard>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tab} index={1}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={5}>
            <SectionCard
              title="Actuator health"
              subtitle={`${baseUrl}/actuator/health`}
              action={
                <Stack direction="row" spacing={1}>
                  <Button size="small" startIcon={<OpenInNewIcon />} href={`${baseUrl}/actuator/health`} target="_blank">
                    Open
                  </Button>
                  <Button size="small" onClick={() => refetch()}>
                    Refresh
                  </Button>
                </Stack>
              }
            >
              {healthLoading ? (
                <Centered>
                  <Typography>Loading…</Typography>
                </Centered>
              ) : healthError ? (
                <Typography sx={{ color: '#ffb4b4' }}>{String(healthError)}</Typography>
              ) : (
                <Stack spacing={1}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      Status:
                    </Typography>
                    <Chip size="small" label={health?.status ?? 'unknown'} />
                  </Stack>
                  <JsonBlock value={health} maxHeight={420} />
                </Stack>
              )}
            </SectionCard>
          </Grid>

          <Grid item xs={12} lg={7}>
            <SectionCard title="Backend endpoints" subtitle="Quick links for diagnostics">
              <Stack spacing={2}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems={{ sm: 'center' }}>
                  <Typography variant="body2" sx={{ minWidth: 160, color: 'rgba(255,255,255,0.7)' }}>
                    GraphQL endpoint
                  </Typography>
                  <Chip size="small" label={gqlUrl} />
                  <Button size="small" startIcon={<OpenInNewIcon />} href={gqlUrl} target="_blank">
                    Open
                  </Button>
                  <Button size="small" startIcon={<ContentCopyIcon />} onClick={() => copy(gqlUrl)}>
                    Copy
                  </Button>
                </Stack>

                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)' }}>
                  If your backend requires JWT for GraphQL introspection, set <b>DF_TOKEN</b> before running
                  schema download/codegen.
                </Typography>
              </Stack>
            </SectionCard>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tab} index={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <SectionCard title="GraphQL codegen" subtitle="Generate typed operations + React Query hooks">
              <Stack spacing={1.5}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  Run in terminal:
                </Typography>
                <JsonBlock
                  value={[
                    'export VITE_API_BASE_URL=http://localhost:8080',
                    'export DF_TOKEN="<YOUR_JWT>"  # optional, if introspection is secured',
                    'npm run schema:download',
                    'npm run codegen'
                  ].join('\n')}
                  maxHeight={220}
                />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)' }}>
                  Output: <b>src/graphql/generated.ts</b>
                </Typography>
              </Stack>
            </SectionCard>
          </Grid>

          <Grid item xs={12} lg={6}>
            <SectionCard title="RBAC navigation" subtitle="Admin areas are hidden for VIEWER">
              <Stack spacing={1.5}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  The sidebar hides the "Administration" section unless your token contains any of:
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {['ADMIN', 'OWNER', 'AGENT'].map((r) => (
                    <Chip key={r} size="small" label={r} />
                  ))}
                </Stack>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)' }}>
                  Security is still enforced by the backend. UI hiding is only a UX optimization.
                </Typography>
              </Stack>
            </SectionCard>
          </Grid>
        </Grid>
      </TabPanel>
    </Box>
  );
}
