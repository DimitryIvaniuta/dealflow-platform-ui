import { GraphQLClient } from 'graphql-request';
import { useAuthStore } from '@/features/auth/authStore';

export function createGraphqlClient() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
  const endpoint = `${baseUrl.replace(/\/$/, '')}/graphql`;

  const token = useAuthStore.getState().token;
  return new GraphQLClient(endpoint, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
}
