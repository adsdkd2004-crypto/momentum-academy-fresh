"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, Lock, Clock3 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { subscribeMaterials } from "@/lib/firestore";
import MaterialCard from "./MaterialCard";
import type { Material, MaterialType, SubjectName } from "@/types";

const SUBJECTS: SubjectName[] = ["Mathematics", "Science", "English", "Social Science"];

export default function LibraryBrowser({
  title,
  description,
  materialTypes,
}: {
  title: string;
  description: string;
  materialTypes: MaterialType[];
}) {
  const { user, profile, loading, signInWithGoogle } = useAuth();
  const [classId, setClassId] = useState<"class-9" | "class-10">("class-10");
  const [subject, setSubject] = useState<SubjectName>("Mathematics");
  const [search, setSearch] = useState("");
  const [materials, setMaterials] = useState<Material[]>([]);

  const approved = profile?.status === "approved";

  useEffect(() => {
    if (!approved) return;
    const unsub = subscribeMaterials(classId, subject, materialTypes, setMaterials);
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classId, subject, approved]);

  const grouped = useMemo(() => {
    const filtered = materials.filter((m) =>
      `${m.chapterTitle} ${m.fileName}`.toLowerCase().includes(search.toLowerCase())
    );
    const map = new Map<string, Material[]>();
    for (const m of filtered) {
      if (!map.has(m.chapterTitle)) map.set(m.chapterTitle, []);
      map.get(m.chapterTitle)!.push(m);
    }
    return Array.from(map.entries());
  }, [materials, search]);

  return (
    <section className="container-app py-14">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">{title}</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-navy-700 dark:text-paper sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-navy-700/75 dark:text-paper/75">{description}</p>
      </div>

      {!loading && !user && (
        <div className="mx-auto mt-10 max-w-md card flex flex-col items-center gap-3 p-8 text-center">
          <Lock className="text-momentum-500" size={22} />
          <p className="text-sm text-navy-700/75 dark:text-paper/75">
            Login with Google to view and download study materials.
          </p>
          <button onClick={signInWithGoogle} className="btn-primary mt-1">
            Continue with Google
          </button>
        </div>
      )}

      {!loading && user && !approved && (
        <div className="mx-auto mt-10 max-w-md card flex flex-col items-center gap-3 p-8 text-center">
          <Clock3 className="text-momentum-500" size={22} />
          <p className="text-sm font-medium text-navy-700 dark:text-paper">
            {profile?.status === "rejected" && "Your account request was not approved."}
            {profile?.status === "suspended" && "Your account is currently suspended."}
            {(!profile || profile.status === "pending") &&
              "Your account is pending verification."}
          </p>
          <p className="text-xs text-navy-700/60 dark:text-paper/60">
            {(!profile || profile.status === "pending") &&
              "Once your teacher approves your account, materials will unlock here automatically."}
          </p>
        </div>
      )}

      {approved && (
        <div className="mt-10">
          <div className="mx-auto flex max-w-3xl flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex rounded-full bg-navy-50 p-1 dark:bg-white/5">
              {(["class-9", "class-10"] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setClassId(c)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    classId === c
                      ? "bg-navy-700 text-white"
                      : "text-navy-700/70 dark:text-paper/70"
                  }`}
                >
                  {c === "class-9" ? "Class 9" : "Class 10"}
                </button>
              ))}
            </div>

            <div className="flex flex-1 items-center gap-2 rounded-full border border-navy-100 bg-white px-4 py-2 dark:border-white/10 dark:bg-navy-800">
              <Search size={16} className="text-navy-700/50 dark:text-paper/50" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search chapter or file name..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-navy-700/40 dark:text-paper dark:placeholder:text-paper/40"
              />
            </div>
          </div>

          <div className="mx-auto mt-4 flex max-w-3xl flex-wrap gap-2">
            {SUBJECTS.map((s) => (
              <button
                key={s}
                onClick={() => setSubject(s)}
                className={`rounded-full border px-4 py-2 text-xs font-medium transition ${
                  subject === s
                    ? "border-momentum-500 bg-momentum-50 text-momentum-700 dark:bg-momentum-500/10 dark:text-momentum-300"
                    : "border-navy-100 text-navy-700/70 dark:border-white/10 dark:text-paper/70"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-3xl space-y-8">
            {grouped.length === 0 && (
              <p className="text-center text-sm text-navy-700/60 dark:text-paper/60">
                No materials uploaded here yet — check back soon.
              </p>
            )}
            {grouped.map(([chapterTitle, items]) => (
              <div key={chapterTitle}>
                <h3 className="font-display text-lg font-semibold text-navy-700 dark:text-paper">
                  {chapterTitle}
                </h3>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  {items.map((m) => (
                    <MaterialCard key={m.id} material={m} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && !user && (
        <p className="mt-8 text-center text-xs text-navy-700/50 dark:text-paper/50">
          New here? <Link href="/login?mode=register" className="text-momentum-600 underline">Register</Link> with your Gmail account.
        </p>
      )}
    </section>
  );
}
