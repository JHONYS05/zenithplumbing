import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
    <Header />
    <main id="main">
    <section className="section">
      <div className="container narrow center">
        <h1>Page not found</h1>
        <p>The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <p>
          <Link href="/" className="btn btn-primary">
            Back to home
          </Link>
        </p>
      </div>
    </section>
    </main>
    <Footer />
    </>
  );
}
