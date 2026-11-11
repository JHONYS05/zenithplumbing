import Link from "next/link";
import { Logo } from "@/components/Logo";
import { logoutAction } from "./actions";

export function AdminBar({ active }: { active?: "pages" | "leads" | "settings" }) {
  return (
    <header className="admin-bar">
      <div className="admin-bar-left">
        <Link href="/admin" className="admin-brand">
          <Logo inverted />
          <span>Admin</span>
        </Link>
        <nav className="admin-tabs" aria-label="Admin sections">
          <Link href="/admin" aria-current={active === "pages" ? "page" : undefined}>
            Pages
          </Link>
          <Link href="/admin/leads" aria-current={active === "leads" ? "page" : undefined}>
            Leads
          </Link>
          <Link href="/admin/settings" aria-current={active === "settings" ? "page" : undefined}>
            Business info
          </Link>
        </nav>
      </div>
      <nav>
        <a href="/" target="_blank" rel="noopener" className="admin-hide-sm">
          View website ↗
        </a>
        <form action={logoutAction}>
          <button className="admin-link-btn">Log out</button>
        </form>
      </nav>
    </header>
  );
}
