import { create } from 'zustand';
import { decodeJwt, getJwtRoles, getJwtSubject } from '@/shared/utils/jwt';

const LS_TOKEN = 'df_token';
const LS_WS = 'df_workspace_id';

export type AuthState = {
  token: string | null;
  subject: string | null;
  roles: string[];
  workspaceId: string | null;
  setToken: (token: string | null) => void;
  setWorkspaceId: (ws: string | null) => void;
  logout: () => void;
  hasAnyRole: (roles: string[]) => boolean;
};

function hydrateToken() {
  const token = localStorage.getItem(LS_TOKEN);
  if (!token) return { token: null, subject: null, roles: [] as string[] };
  const payload = decodeJwt(token);
  return { token, subject: getJwtSubject(payload), roles: getJwtRoles(payload) };
}

export const useAuthStore = create<AuthState>((set, get) => {
  const base = hydrateToken();
  const ws = localStorage.getItem(LS_WS);

  return {
    token: base.token,
    subject: base.subject,
    roles: base.roles,
    workspaceId: ws,

    setToken: (token) => {
      if (!token) {
        localStorage.removeItem(LS_TOKEN);
        set({ token: null, subject: null, roles: [] });
        return;
      }
      localStorage.setItem(LS_TOKEN, token);
      const payload = decodeJwt(token);
      set({ token, subject: getJwtSubject(payload), roles: getJwtRoles(payload) });
    },

    setWorkspaceId: (workspaceId) => {
      if (!workspaceId) {
        localStorage.removeItem(LS_WS);
        set({ workspaceId: null });
        return;
      }
      localStorage.setItem(LS_WS, workspaceId);
      set({ workspaceId });
    },

    logout: () => {
      localStorage.removeItem(LS_TOKEN);
      set({ token: null, subject: null, roles: [] });
    },

    hasAnyRole: (roles) => {
      const mine = new Set(get().roles.map((r) => r.toUpperCase()));
      return roles.some((r) => mine.has(r.toUpperCase()));
    }
  };
});
