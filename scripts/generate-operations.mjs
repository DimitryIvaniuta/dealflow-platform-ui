import { readFile, writeFile, rm, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import {
  buildSchema,
  isEnumType,
  isInputObjectType,
  isInterfaceType,
  isListType,
  isNonNullType,
  isObjectType,
  isScalarType,
  isUnionType,
  printType
} from 'graphql';

/**
 * Auto-generates .graphql operation documents from the **downloaded** schema SDL.
 *
 * Goal: when backend schema changes, you should not manually edit TS query strings.
 * You regenerate:
 *  - schema.graphql (introspection)
 *  - operation docs (this file)
 *  - typed React Query hooks (graphql-codegen)
 *
 * Notes:
 * - This generates a *usable default* selection set: scalars/enums + best-effort nested IDs.
 * - For UI-specific projections, you can still keep hand-written ops in src/graphql/operations/*.graphql
 *   and they will coexist.
 */

// IMPORTANT (Windows): do NOT use URL.pathname for filesystem paths.
// It becomes `/J:/...` which existsSync() treats as a non-existent POSIX path.
// Use CWD-based absolute paths instead (npm runs scripts with project root as CWD).
const schemaPath = path.resolve(process.cwd(), 'schema.graphql');
const outDir = path.resolve(process.cwd(), 'src/graphql/operations/_generated');

console.log('Schema path:', schemaPath);
if (!existsSync(schemaPath)) {
  console.error('schema.graphql not found. Run: npm run schema:download');
  process.exit(1);
}

const sdl = await readFile(schemaPath, 'utf8');
const schema = buildSchema(sdl);

// Helpers
const unwrap = (t) => {
  let type = t;
  while (isNonNullType(type) || isListType(type)) type = type.ofType;
  return type;
};

const printArgType = (t) => {
  // graphql's printType works for named types, not wrappers; we need a simple printer
  if (isNonNullType(t)) return `${printArgType(t.ofType)}!`;
  if (isListType(t)) return `[${printArgType(t.ofType)}]`;
  return t.name;
};

const pascal = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function pickNestedFields(objType) {
  // Prefer typical UI identity fields
  const fields = objType.getFields();
  const preferred = ['id', 'displayName', 'name', 'title', 'email', 'status', 'stage'];
  const picked = [];
  for (const p of preferred) if (fields[p]) picked.push(p);
  // Always include id if present
  if (!picked.includes('id') && fields.id) picked.unshift('id');
  // Limit
  return picked.slice(0, 3);
}

function selectionSetFor(type, depth = 0, seen = new Set()) {
  const named = unwrap(type);
  if (!named) return '';
  if (isScalarType(named) || isEnumType(named)) return '';
  if (isUnionType(named) || isInterfaceType(named)) {
    // Keep it simple: do not auto-expand unions/interfaces
    return '';
  }
  if (!isObjectType(named)) return '';
  if (depth > 2) return '';

  if (seen.has(named.name)) return '';
  seen.add(named.name);

  const fields = named.getFields();
  const lines = [];
  for (const [fname, f] of Object.entries(fields)) {
    const fNamed = unwrap(f.type);
    if (isScalarType(fNamed) || isEnumType(fNamed)) {
      lines.push(fname);
      continue;
    }
    if (isObjectType(fNamed)) {
      const nested = pickNestedFields(fNamed);
      if (nested.length) {
        lines.push(`${fname} { ${nested.join(' ')} }`);
      }
    }
  }
  seen.delete(named.name);
  if (!lines.length) return '';
  return `{
  ${lines.join('\n  ')}
}`;
}

function buildOperation(kind, field) {
  // Prefix to avoid clashing with hand-written operations (same field names).
  const opName = `Auto${pascal(field.name)}`;
  const args = field.args ?? [];
  const varDefs = args.map((a) => `$${a.name}: ${printArgType(a.type)}`).join(', ');
  const argMap = args.map((a) => `${a.name}: $${a.name}`).join(', ');

  const sel = selectionSetFor(field.type);
  const varDefsBlock = varDefs ? `(${varDefs})` : '';
  const argBlock = argMap ? `(${argMap})` : '';

  // If return type is scalar/enum, no selection set
  const body = sel ? `${field.name}${argBlock} ${sel}` : `${field.name}${argBlock}`;
  return `${kind} ${opName}${varDefsBlock} {
  ${body}
}`;
}

async function generate() {
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });

  const queryType = schema.getQueryType();
  const mutationType = schema.getMutationType();

  const files = [];

  if (queryType) {
    for (const field of Object.values(queryType.getFields())) {
      // Skip introspection
      if (field.name.startsWith('__')) continue;
      files.push({
        name: `query.${field.name}.graphql`,
        content: buildOperation('query', field)
      });
    }
  }

  if (mutationType) {
    for (const field of Object.values(mutationType.getFields())) {
      if (field.name.startsWith('__')) continue;
      files.push({
        name: `mutation.${field.name}.graphql`,
        content: buildOperation('mutation', field)
      });
    }
  }

  // Write
  for (const f of files) {
    await writeFile(path.join(outDir, f.name), `${f.content}\n`, 'utf8');
  }

  console.log(`Generated ${files.length} operation documents into ${outDir}`);
}

await generate();
