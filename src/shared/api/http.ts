export class HttpError extends Error {
  status: number;
  body: any;

  constructor(status: number, message: string, body: any) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

type HttpJsonOptions = {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
};

/**
 * Small fetch helper for JSON REST endpoints.
 * - Always sends/accepts JSON
 * - Throws HttpError with parsed body when possible
 */
export async function httpJson<T = any>(url: string, opts: HttpJsonOptions = {}): Promise<T> {
  const res = await fetch(url, {
    method: opts.method ?? 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(opts.headers ?? {})
    },
    body: opts.body === undefined ? undefined : JSON.stringify(opts.body)
  });

  const text = await res.text();
  const maybeJson = text ? safeJson(text) : null;

  if (!res.ok) {
    const msg = (maybeJson && (maybeJson.message || maybeJson.error)) || res.statusText || 'Request failed';
    throw new HttpError(res.status, msg, maybeJson ?? text);
  }

  return (maybeJson ?? (text as any)) as T;
}

function safeJson(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
