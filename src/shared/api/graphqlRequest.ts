import { useAuthStore } from '@/features/auth/authStore';

type GraphQlError = { message: string; path?: (string | number)[] };
type GraphQlResponse<T> = { data?: T; errors?: GraphQlError[] };

function baseUrl() {
  return (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080').replace(/\/$/, '');
}

/**
 * Auth-aware GraphQL requester.
 * - Adds Bearer access token
 * - Proactively refreshes when token expires soon
 * - On 401: refreshes once and retries exactly once
 */
export async function graphqlRequest<T>(query: string, variables: Record<string, any> = {}): Promise<T> {
  const endpoint = `${baseUrl()}/graphql`;
  const state = useAuthStore.getState();
  await state.ensureFreshToken();

  const attempt = async (): Promise<{ status: number; json: GraphQlResponse<T> }> => {
    const token = useAuthStore.getState().token;
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ query, variables })
    });
    const json = (await res.json()) as GraphQlResponse<T>;
    return { status: res.status, json };
  };

  let r = await attempt();
  if (r.status === 401) {
    // refresh and retry once
    await useAuthStore.getState().refresh();
    r = await attempt();
  }

  if (r.json.errors && r.json.errors.length) {
    const message = r.json.errors.map((e) => e.message).join('; ');
    throw new Error(message);
  }
  if (!r.json.data) throw new Error('No data returned from GraphQL');
  return r.json.data;
}
