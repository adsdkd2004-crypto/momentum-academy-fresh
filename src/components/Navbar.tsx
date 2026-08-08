"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/context/AuthContext";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/notes", label: "Notes Library" },
  { href: "/dpp", label: "DPP Library" },
  { href: "/notices", label: "Notice Board" },
  { href: "/fees", label: "Fee Structure" },
  { href: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { user, profile, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-navy-100/70 bg-paper/90 backdrop-blur dark:border-navy-700/60 dark:bg-navy-900/90">
      <div className="container-app flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Image src="/logo.png" alt="Momentum Academy" width={36} height={36} className="rounded-full" />
          <span className="font-display text-lg font-semibold text-navy-700 dark:text-paper">
            Momentum Academy
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition hover:text-momentum-600 ${
                pathname === l.href
                  ? "text-momentum-600"
                  : "text-navy-700/80 dark:text-paper/80"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          {user ? (
            <>
              {profile?.role === "admin" && (
                <Link href="/admin" className="btn-secondary !px-4 !py-2 text-xs">
                  Admin
                </Link>
              )}
              <button onClick={() => signOut()} className="btn-secondary !px-4 !py-2 text-xs">
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn-secondary !px-4 !py-2 text-xs">
                Login
              </Link>
              <Link href="/login?mode=register" className="btn-primary !px-4 !py-2 text-xs">
                Register
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-700/15 text-navy-700 dark:border-white/15 dark:text-paper"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-navy-100/70 bg-paper px-5 pb-6 pt-2 dark:border-navy-700/60 dark:bg-navy-900 lg:hidden">
          <nav className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-navy-700 hover:bg-navy-50 dark:text-paper dark:hover:bg-white/5"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex gap-3">
            {user ? (
              <>
                {profile?.role === "admin" && (
                  <Link href="/admin" className="btn-secondary flex-1 !py-3 text-xs">
                    Admin
                  </Link>
                )}
                <button onClick={() => signOut()} className="btn-secondary flex-1 !py-3 text-xs">
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="btn-secondary flex-1 !py-3 text-xs">
                  Login
                </Link>
                <Link href="/login?mode=register" className="btn-primary flex-1 !py-3 text-xs">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
