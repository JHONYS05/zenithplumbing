import { readUpload } from "@/lib/contentStore";

/** Serves images uploaded through /admin (stored on disk, or in the private Vercel Blob store). */
export async function GET(_req: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const file = await readUpload(name);
  if (!file) return new Response("Not found", { status: 404 });
  return new Response(file.body as BodyInit, {
    headers: {
      "Content-Type": file.type,
      // File names include a random suffix and never change, so they can be cached long-term.
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
