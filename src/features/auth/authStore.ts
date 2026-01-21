import { create } from 'zustand';
import { decodeJwt, getJwtRoles, getJwtSubject } from '@/shared/utils/jwt';
import { authLogin, authLogout, authRefresh } from '@/features/auth/authApi';

const LS_ACCESS = 'df_access_token';
const LS_REFRESH = 'df_refresh_token';
const LS_EXPIRES_AT = 'df_expires_at';
const LS_WS = 'df_workspace_id';

export type AuthState = {
  /** Access token (JWT). Kept as `token` for backward compatibility with existing UI code. */
  token: string | null;
  /** Refresh token (rotated on refresh). */
  refreshToken: string | null;
  /** Access token expiry instant (ISO string). */
  expiresAt: string | null;
  subject: string | null;
  roles: string[];
  workspaceId: string | null;
  setToken: (token: string | null) => void;
  setWorkspaceId: (ws: string | null) => void;
  /** Username/password login using backend REST endpoint. */
  login: (username: string, password: string) => Promise<void>;
  /** Refresh access token (rotates refresh token). */
  refresh: () => Promise<void>;
  /** Ensure token is fresh (refresh if expiring soon). */
  ensureFreshToken: () => Promise<void>;
  /** Logout (best-effort revoke refresh token), then clears local state. */
  logout: () => Promise<void>;
  hasAnyRole: (roles: string[]) => boolean;
};

function hydrate() {
  const token = localStorage.getItem(LS_ACCESS);
  const refreshToken = localStorage.getItem(LS_REFRESH);
  const expiresAt = localStorage.getItem(LS_EXPIRES_AT);
  if (!token) {
    return { token: null, refreshToken: refreshToken ?? null, expiresAt: expiresAt ?? null, subject: null, roles: [] as string[] };
  }
  const payload = decodeJwt(token);
  return {
    token,
    refreshToken: refreshToken ?? null,
    expiresAt: expiresAt ?? null,
    subject: getJwtSubject(payload),
    roles: getJwtRoles(payload)
  };
}

export const useAuthStore = create<AuthState>((set, get) => {
  const base = hydrate();
  const ws = localStorage.getItem(LS_WS);

  return {
    token: base.token,
    refreshToken: base.refreshToken,
    expiresAt: base.expiresAt,
    subject: base.subject,
    roles: base.roles,
    workspaceId: ws,

    setToken: (token) => {
      if (!token) {
        localStorage.removeItem(LS_ACCESS);
        localStorage.removeItem(LS_EXPIRES_AT);
        // keep refresh token untouched here; logout() clears it.
        set({ token: null, subject: null, roles: [], expiresAt: null });
        return;
      }
      localStorage.setItem(LS_ACCESS, token);
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

    login: async (username, password) => {
      const res = await authLogin({ username, password });
      localStorage.setItem(LS_ACCESS, res.accessToken);
      localStorage.setItem(LS_REFRESH, res.refreshToken);
      localStorage.setItem(LS_EXPIRES_AT, res.expiresAt);
      const payload = decodeJwt(res.accessToken);
      set({
        token: res.accessToken,
        refreshToken: res.refreshToken,
        expiresAt: res.expiresAt,
        subject: getJwtSubject(payload),
        roles: getJwtRoles(payload)
      });
    },

    refresh: async () => {
      const rt = get().refreshToken ?? localStorage.getItem(LS_REFRESH);
      if (!rt) return;
      const res = await authRefresh({ refreshToken: rt });
      localStorage.setItem(LS_ACCESS, res.accessToken);
      localStorage.setItem(LS_REFRESH, res.refreshToken);
      localStorage.setItem(LS_EXPIRES_AT, res.expiresAt);
      const payload = decodeJwt(res.accessToken);
      set({
        token: res.accessToken,
        refreshToken: res.refreshToken,
        expiresAt: res.expiresAt,
        subject: getJwtSubject(payload),
        roles: getJwtRoles(payload)
      });
    },

    ensureFreshToken: async () => {
      const token = get().token;
      const exp = get().expiresAt;
      const rt = get().refreshToken;
      if (!token || !exp || !rt) return;
      const expMs = Date.parse(exp);
      if (!Number.isFinite(expMs)) return;
      // refresh if expiring in < 60s
      if (expMs - Date.now() < 60_000) {
        await get().refresh();
      }
    },

    logout: async () => {
      const rt = get().refreshToken ?? localStorage.getItem(LS_REFRESH);
      try {
        if (rt) await authLogout({ refreshToken: rt });
      } finally {
        localStorage.removeItem(LS_ACCESS);
        localStorage.removeItem(LS_REFRESH);
        localStorage.removeItem(LS_EXPIRES_AT);
        set({ token: null, refreshToken: null, expiresAt: null, subject: null, roles: [] });
      }
    },

    hasAnyRole: (roles) => {
      const mine = new Set(get().roles.map((r) => r.toUpperCase()));
      return roles.some((r) => mine.has(r.toUpperCase()));
    }
  };
});
