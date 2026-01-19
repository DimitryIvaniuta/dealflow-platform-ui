import type { CodegenConfig } from '@graphql-codegen/cli';

const baseUrl = process.env.VITE_API_BASE_URL ?? 'http://localhost:8080';
const endpoint = `${baseUrl.replace(/\/$/, '')}/graphql`;

const config: CodegenConfig = {
  schema: process.env.GRAPHQL_SCHEMA ?? endpoint,
  documents: ['src/graphql/operations/**/*.graphql'],
  generates: {
    'src/graphql/generated.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-query'],
      config: {
        fetcher: 'graphql-request',
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
