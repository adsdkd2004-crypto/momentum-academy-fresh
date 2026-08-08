"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Trash2 } from "lucide-react";
import { subscribeAllStudents, setStudentStatus, deleteStudent } from "@/lib/firestore";
import type { StudentProfile, StudentStatus } from "@/types";

const STATUS_STYLES: Record<StudentStatus, string> = {
  approved: "bg-momentum-50 text-momentum-700 dark:bg-momentum-500/10 dark:text-momentum-300",
  pending: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
  rejected: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
  suspended: "bg-navy-100 text-navy-700 dark:bg-white/10 dark:text-paper",
};

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const unsub = subscribeAllStudents((s) => setStudents(s));
    return () => unsub();
  }, []);

  const filtered = useMemo(
    () =>
      students.filter((s) =>
        `${s.name} ${s.email}`.toLowerCase().includes(search.toLowerCase())
      ),
    [students, search]
  );

  return (
    <div className="card p-6">
      <div className="flex items-center gap-2 rounded-full border border-navy-100 bg-white px-4 py-2 dark:border-white/10 dark:bg-navy-800">
        <Search size={16} className="text-navy-700/50 dark:text-paper/50" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-navy-700/40 dark:text-paper dark:placeholder:text-paper/40"
        />
      </div>

      <div className="mt-5 space-y-3">
        {filtered.map((s) => (
          <div
            key={s.uid}
            className="flex flex-col gap-3 rounded-xl border border-navy-100 p-4 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-sm font-semibold text-navy-700 dark:text-paper">{s.name}</p>
              <p className="text-xs text-navy-700/60 dark:text-paper/60">{s.email}</p>
              <span
                className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${STATUS_STYLES[s.status]}`}
              >
                {s.status}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {s.status !== "approved" && (
                <button
                  onClick={() => setStudentStatus(s.uid, "approved")}
                  className="btn-secondary !px-3 !py-1.5 text-xs"
                >
                  Approve
                </button>
              )}
              {s.status !== "rejected" && (
                <button
                  onClick={() => setStudentStatus(s.uid, "rejected")}
                  className="btn-secondary !px-3 !py-1.5 text-xs"
                >
                  Reject
                </button>
              )}
              {s.status !== "suspended" && (
                <button
                  onClick={() => setStudentStatus(s.uid, "suspended")}
                  className="btn-secondary !px-3 !py-1.5 text-xs"
                >
                  Suspend
                </button>
              )}
              <button
                onClick={() => {
                  if (confirm(`Delete ${s.name}? This cannot be undone.`)) {
                    deleteStudent(s.uid);
                  }
                }}
                className="btn-secondary !px-3 !py-1.5 text-xs text-red-500"
              >
                <Trash2 size={13} /> Delete
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-sm text-navy-700/60 dark:text-paper/60">
            No students match your search.
          </p>
        )}
      </div>
    </div>
  );
}
