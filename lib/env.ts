/**
 * Reads settings (environment variables) safely.
 * A setting that exists but is empty — common when copying .env.example into Vercel — is treated
 * as "not set", so the built-in default is used instead of an empty value.
 */
export function env(name: string): string | undefined {
  const v = process.env[name]?.trim();
  return v ? v : undefined;
}

/**
 * The Vercel Blob read/write token.
 * Vercel names it BLOB_READ_WRITE_TOKEN by default, but if the store was connected with a custom
 * prefix (e.g. "MY_STORE" → MY_STORE_READ_WRITE_TOKEN) we still find it.
 */
export function blobToken(): string | undefined {
  const direct = env("BLOB_READ_WRITE_TOKEN");
  if (direct) return direct;
  for (const [key, value] of Object.entries(process.env)) {
    if (key.endsWith("READ_WRITE_TOKEN") && value?.trim().startsWith("vercel_blob_rw_")) return value.trim();
  }
  return undefined;
}
