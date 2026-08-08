"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { LayoutDashboard, Users, FolderUp, Megaphone } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const TABS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/students", label: "Students", icon: Users },
  { href: "/admin/materials", label: "Materials", icon: FolderUp },
  { href: "/admin/notices", label: "Notices", icon: Megaphone },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && (!user || profile?.role !== "admin")) {
      router.replace("/login");
    }
  }, [loading, user, profile, router]);

  if (loading || !user || profile?.role !== "admin") {
    return (
      <div className="container-app flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-navy-700/60 dark:text-paper/60">Checking access...</p>
      </div>
    );
  }

  return (
    <div className="container-app py-10">
      <h1 className="font-display text-2xl font-semibold text-navy-700 dark:text-paper">
        Admin Dashboard
      </h1>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
        {TABS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition ${
              pathname === href
                ? "border-navy-700 bg-navy-700 text-white"
                : "border-navy-100 text-navy-700/70 dark:border-white/10 dark:text-paper/70"
            }`}
          >
            <Icon size={14} /> {label}
          </Link>
        ))}
      </div>

      <div className="mt-6">{children}</div>
    </div>
  );
}
