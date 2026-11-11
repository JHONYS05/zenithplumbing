import { readDiskUpload } from "@/lib/contentStore";

/** Serves images uploaded through /admin when storing on disk (not used with Vercel Blob). */
export async function GET(_req: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const file = await readDiskUpload(name);
  if (!file) return new Response("Not found", { status: 404 });
  return new Response(new Uint8Array(file.data), {
    headers: {
      "Content-Type": file.type,
      // File names include a random suffix and never change, so they can be cached long-term.
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
