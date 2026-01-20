import { getIntrospectionQuery, buildClientSchema, printSchema } from 'graphql';
import { writeFile } from 'node:fs/promises';

const baseUrl = process.env.VITE_API_BASE_URL ?? 'http://localhost:8080';
const endpoint = `${baseUrl.replace(/\/$/, '')}/graphql`;
const outPath = new URL('../schema.graphql', import.meta.url);

const token = process.env.DF_TOKEN;

const res = await fetch(endpoint, {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    ...(token ? { authorization: `Bearer ${token}` } : {})
  },
  body: JSON.stringify({ query: getIntrospectionQuery() })
});

if (!res.ok) {
  console.error(`Failed to download schema: ${res.status} ${res.statusText}`);
  console.error(await res.text());
  process.exit(1);
}

const json = await res.json();
if (json.errors) {
  console.error('Introspection returned errors:');
  console.error(JSON.stringify(json.errors, null, 2));
  process.exit(1);
}

const schema = buildClientSchema(json.data);
const sdl = printSchema(schema);
await writeFile(outPath, sdl, 'utf8');
console.log(`Schema written to ${outPath.pathname}`);
