export type JwtPayload = Record<string, unknown>;

export function decodeJwt(token: string): JwtPayload {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return {};
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64 + '==='.slice((base64.length + 3) % 4);
    const decoded = atob(padded);
    return JSON.parse(decoded) as JwtPayload;
  } catch (e) {
    return {};
  }
}

export function getJwtSubject(payload: JwtPayload): string | null {
  const sub = payload['sub'];
  return typeof sub === 'string' ? sub : null;
}

export function getJwtRoles(payload: JwtPayload): string[] {
  // Supports common Keycloak-style fields and simple "roles" claim.
  const rolesDirect = payload['roles'];
  const realm = payload['realm_access'];

  const out: string[] = [];
  if (Array.isArray(rolesDirect)) {
    for (const r of rolesDirect) if (typeof r === 'string') out.push(r);
  }

  if (realm && typeof realm === 'object') {
    const rr = (realm as Record<string, unknown>)['roles'];
    if (Array.isArray(rr)) {
      for (const r of rr) if (typeof r === 'string') out.push(r);
    }
  }

  // De-dup
  return Array.from(new Set(out));
}
