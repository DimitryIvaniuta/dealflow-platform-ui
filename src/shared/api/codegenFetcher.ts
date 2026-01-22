import type { DocumentNode } from 'graphql';
import { print } from 'graphql';
import { graphqlRequest } from '@/shared/api/graphqlRequest';

/**
 * Fetcher for graphql-codegen generated hooks (typescript-react-query).
 *
 * Why:
 * - we already have a production-grade requester (JWT header + refresh + single retry)
 * - codegen should use the same requester so all hooks automatically inherit auth behavior
 */
export function fetcher<TData, TVariables extends Record<string, any>>(
  document: string | DocumentNode,
  variables?: TVariables
): Promise<TData> {
  const query = typeof document === 'string' ? document : print(document);
  return graphqlRequest<TData>(query, (variables ?? {}) as Record<string, any>);
}
