import { redirect } from "next/navigation";
import { adminConfigured, isAdmin } from "@/lib/adminAuth";
import { Logo } from "@/components/Logo";
import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");
  return (
    <div className="admin-login">
      <div className="admin-card login-card">
        <Logo />
        <h1>Website Admin</h1>
        {adminConfigured() ? (
          <LoginForm />
        ) : (
          <p className="admin-note">
            The admin is turned off. Set an <code>ADMIN_PASSWORD</code> environment variable and restart the site
            to enable it.
          </p>
        )}
      </div>
    </div>
  );
}
