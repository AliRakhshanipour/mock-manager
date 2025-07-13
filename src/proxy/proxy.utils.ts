import { createHash } from 'crypto';

export function computeRequestHash(
  method: string,
  headers: Record<string, any>,
  query: Record<string, any>,
  body: any,
): string {
  const raw = JSON.stringify({ method, headers, query, body });
  return createHash('sha256').update(raw).digest('hex');
}

export function normalizeHeaders(headers: any): Record<string, string> {
  const result: Record<string, string> = {};
  for (const key in headers) {
    if (typeof headers[key] === 'string') result[key] = headers[key];
  }
  return result;
}
