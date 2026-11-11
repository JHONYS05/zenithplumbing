import Image from "next/image";
import type { CmsImage } from "@/lib/cms";

/** Project photo grid from the admin. Renders nothing when there are no photos. */
export function Gallery({ images, heading = "Recent Projects" }: { images: CmsImage[]; heading?: string }) {
  if (!images.length) return null;
  return (
    <section className="section-block">
      <h2>{heading}</h2>
      <div className="gallery">
        {images.map((img, i) => (
          <figure key={img.src + i}>
            <div className="gallery-img">
              <Image src={img.src} alt={img.alt} fill sizes="(max-width: 640px) 50vw, 300px" className="cover" />
            </div>
            {img.alt && <figcaption>{img.alt}</figcaption>}
          </figure>
        ))}
      </div>
    </section>
  );
}
