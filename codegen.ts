import type { CodegenConfig } from '@graphql-codegen/cli';
import { existsSync } from 'node:fs';

const baseUrl = process.env.VITE_API_BASE_URL ?? 'http://localhost:8080';
const endpoint = `${baseUrl.replace(/\/$/, '')}/graphql`;
const localSchema = './schema.graphql';

const config: CodegenConfig = {
  // Prefer a local SDL file (works even when /graphql is authenticated).
  // Generate it via: npm run schema:download
  schema: process.env.GRAPHQL_SCHEMA ?? (existsSync(localSchema) ? localSchema : endpoint),
  documents: ['src/graphql/operations/**/*.graphql'],
  generates: {
    'src/graphql/generated.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-query'],
      config: {
        // Avoid bringing gql/graphql-tag into the bundle.
        // Codegen will emit raw document strings.
        documentMode: 'string',
        // Use our auth-aware fetcher (adds JWT + refresh retry)
        fetcher: {
          func: '@/shared/api/codegenFetcher#fetcher'
        },
        exposeQueryKeys: true,
        exposeMutationKeys: true,
        addInfiniteQuery: false,
        scalars: {
          UUID: 'string',
          Instant: 'string'
        }
      }
    }
  }
};

export default config;
