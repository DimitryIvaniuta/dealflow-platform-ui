import { getIntrospectionQuery, buildClientSchema, printSchema } from 'graphql';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import dotenv from 'dotenv';

// Node scripts do NOT load .env automatically. Load both (optional) files:
// - .env.codegen (recommended for codegen-only secrets)
// - .env (fallback)
dotenv.config({ path: path.resolve(process.cwd(), '.env.codegen') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const baseUrl = process.env.VITE_API_BASE_URL ?? 'http://localhost:8080';
const endpoint = `${baseUrl.replace(/\/$/, '')}/graphql`;
// IMPORTANT (Windows): write by CWD, not URL.pathname (`/J:/...`).
// npm runs scripts with the project root as CWD.
const outFile = path.resolve(process.cwd(), 'schema.graphql');

async function resolveToken() {
  // console.log('Token start: '+JSON.stringify(process.env));
  // Option 1: explicit token
  if (process.env.DF_TOKEN) return process.env.DF_TOKEN;

  // Option 2: auto-login for local dev/CI
  const username = process.env.DF_USERNAME;
  const password = process.env.DF_PASSWORD;
  // If DF_USERNAME/DF_PASSWORD are set, we can auto-login and fetch a token.
  if (!username || !password) return undefined;

  const loginUrl = `${baseUrl.replace(/\/$/, '')}/api/auth/login`;
  const r = await fetch(loginUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (!r.ok) {
    console.error(`Login failed while downloading schema: ${r.status} ${r.statusText}`);
    console.error(await r.text());
    process.exit(1);
  }

  const j = await r.json();
  return j.accessToken;
}

const token = await resolveToken();

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
await writeFile(outFile, sdl, 'utf8');
console.log(`Schema written to ${outFile}`);
