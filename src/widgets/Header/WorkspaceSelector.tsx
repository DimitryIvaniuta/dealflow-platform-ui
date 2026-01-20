import React from 'react';
import { Box, TextField, Tooltip } from '@mui/material';
import { useAuthStore } from '@/features/auth/authStore';

export function WorkspaceSelector() {
  const workspaceId = useAuthStore((s) => s.workspaceId);
  const setWorkspaceId = useAuthStore((s) => s.setWorkspaceId);

  return (
    <Box sx={{ width: 360 }}>
      <Tooltip title="Workspace UUID (used as workspaceId variable in GraphQL calls)">
        <TextField
          size="small"
          fullWidth
          label="Workspace ID"
          value={workspaceId ?? ''}
          onChange={(e) => setWorkspaceId(e.target.value.trim() || null)}
        />
      </Tooltip>
    </Box>
  );
}
