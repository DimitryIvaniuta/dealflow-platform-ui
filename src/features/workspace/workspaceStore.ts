import { useAuthStore } from '@/features/auth/authStore';

/**
 * Workspace state is currently stored in authStore (so a token + workspace move together).
 * This file exists as the dedicated "workspace" feature entrypoint for future expansions
 * (workspace discovery, switching, membership display, etc.).
 */
export function useWorkspaceId() {
  return useAuthStore((s) => s.workspaceId);
}

export function useSetWorkspaceId() {
  return useAuthStore((s) => s.setWorkspaceId);
}
