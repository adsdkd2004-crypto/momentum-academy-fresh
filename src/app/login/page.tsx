"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import { Chrome, ShieldCheck, Clock3, XCircle, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const params = useSearchParams();
  const router = useRouter();
  const isRegister = params.get("mode") === "register";
  const { user, profile, loading, signInWithGoogle } = useAuth();

  useEffect(() => {
    if (!loading && user && profile?.status === "approved") {
      router.replace("/notes");
    }
  }, [loading, user, profile, router]);

  return (
    <section className="container-app flex min-h-[70vh] items-center justify-center py-16">
      <div className="card w-full max-w-sm p-8 text-center">
        <Image
          src="/logo.png"
          alt="Momentum Academy"
          width={64}
          height={64}
          className="mx-auto rounded-full"
        />
        <h1 className="mt-5 font-display text-2xl font-semibold text-navy-700 dark:text-paper">
          {isRegister ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mt-2 text-sm text-navy-700/70 dark:text-paper/70">
          {isRegister
            ? "Sign up with your Gmail account. Your teacher approves every new account before materials unlock."
            : "Sign in with the Gmail account you registered with."}
        </p>

        {!user && (
          <button onClick={signInWithGoogle} className="btn-primary mt-6 w-full">
            <Chrome size={16} /> Continue with Google
          </button>
        )}

        {user && profile?.status === "pending" && (
          <div className="mt-6 flex flex-col items-center gap-2 rounded-lg bg-navy-50 p-4 dark:bg-white/5">
            <Clock3 className="text-momentum-500" size={20} />
            <p className="text-sm font-medium text-navy-700 dark:text-paper">
              Pending Verification
            </p>
            <p className="text-xs text-navy-700/60 dark:text-paper/60">
              Your teacher will approve your account shortly. You&apos;ll get access
              to notes and DPPs as soon as it&apos;s approved.
            </p>
          </div>
        )}

        {user && profile?.status === "rejected" && (
          <div className="mt-6 flex flex-col items-center gap-2 rounded-lg bg-red-50 p-4 dark:bg-red-500/10">
            <XCircle className="text-red-500" size={20} />
            <p className="text-sm text-red-600 dark:text-red-400">
              This account request was not approved. Please contact us.
            </p>
          </div>
        )}

        {user && profile?.status === "suspended" && (
          <div className="mt-6 flex flex-col items-center gap-2 rounded-lg bg-red-50 p-4 dark:bg-red-500/10">
            <XCircle className="text-red-500" size={20} />
            <p className="text-sm text-red-600 dark:text-red-400">
              Your account is suspended. Please contact us for details.
            </p>
          </div>
        )}

        {user && profile?.status === "approved" && (
          <div className="mt-6 flex flex-col items-center gap-2 rounded-lg bg-momentum-50 p-4 dark:bg-momentum-500/10">
            <CheckCircle2 className="text-momentum-500" size={20} />
            <p className="text-sm text-momentum-700 dark:text-momentum-300">
              You&apos;re approved — redirecting to your library...
            </p>
          </div>
        )}

        <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-navy-700/50 dark:text-paper/50">
          <ShieldCheck size={13} /> Gmail sign-in only — no passwords stored.
        </p>
      </div>
    </section>
  );
}
