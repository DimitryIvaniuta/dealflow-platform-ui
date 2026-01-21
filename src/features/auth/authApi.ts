import { httpJson } from '@/shared/api/http';

export type LoginRequest = { username: string; password: string };
export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresAt: string; // ISO
  subject: string;
};

export type RefreshRequest = { refreshToken: string };
export type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresAt: string;
};

export type LogoutRequest = { refreshToken: string };

export type PasswordResetRequest = { emailOrUsername: string };
export type PasswordResetConfirmRequest = { token: string; newPassword: string };

function baseUrl() {
  return (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080').replace(/\/$/, '');
}

export async function authLogin(body: LoginRequest): Promise<LoginResponse> {
  return httpJson<LoginResponse>(`${baseUrl()}/api/auth/login`, { method: 'POST', body });
}

export async function authRefresh(body: RefreshRequest): Promise<RefreshResponse> {
  return httpJson<RefreshResponse>(`${baseUrl()}/api/auth/refresh`, { method: 'POST', body });
}

export async function authLogout(body: LogoutRequest): Promise<void> {
  await httpJson(`${baseUrl()}/api/auth/logout`, { method: 'POST', body });
}

export async function passwordResetRequest(body: PasswordResetRequest): Promise<void> {
  await httpJson(`${baseUrl()}/api/auth/password-reset/request`, { method: 'POST', body });
}

export async function passwordResetConfirm(body: PasswordResetConfirmRequest): Promise<void> {
  await httpJson(`${baseUrl()}/api/auth/password-reset/confirm`, { method: 'POST', body });
}
