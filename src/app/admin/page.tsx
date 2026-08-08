"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Users, UserCheck, Clock3, FileStack, CheckCircle2, XCircle } from "lucide-react";
import { subscribeAllStudents, setStudentStatus } from "@/lib/firestore";
import type { StudentProfile } from "@/types";

export default function AdminDashboard() {
  const [students, setStudents] = useState<StudentProfile[]>([]);

  useEffect(() => {
    const unsub = subscribeAllStudents((s) => setStudents(s));
    return () => unsub();
  }, []);

  const stats = useMemo(() => {
    const total = students.length;
    const approved = students.filter((s) => s.status === "approved").length;
    const pending = students.filter((s) => s.status === "pending").length;
    return { total, approved, pending };
  }, [students]);

  const queue = students.filter((s) => s.status === "pending");

  const CARDS = [
    { label: "Registered students", value: stats.total, icon: Users },
    { label: "Approved students", value: stats.approved, icon: UserCheck },
    { label: "Pending approval", value: stats.pending, icon: Clock3 },
  ];

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        {CARDS.map(({ label, value, icon: Icon }) => (
          <div key={label} className="card p-5">
            <Icon className="text-momentum-500" size={20} />
            <p className="mt-3 text-2xl font-bold text-navy-700 dark:text-paper">{value}</p>
            <p className="text-xs text-navy-700/60 dark:text-paper/60">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 card p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-navy-700 dark:text-paper">
            Approval Queue
          </h2>
          <Link href="/admin/students" className="text-xs font-medium text-momentum-600">
            View all students
          </Link>
        </div>

        {queue.length === 0 && (
          <p className="mt-4 text-sm text-navy-700/60 dark:text-paper/60">
            No pending registrations right now.
          </p>
        )}

        <div className="mt-4 space-y-3">
          {queue.map((s) => (
            <div
              key={s.uid}
              className="flex flex-col gap-3 rounded-xl border border-navy-100 p-4 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-navy-700 dark:text-paper">{s.name}</p>
                <p className="text-xs text-navy-700/60 dark:text-paper/60">{s.email}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setStudentStatus(s.uid, "approved")}
                  className="btn-primary !px-4 !py-2 text-xs"
                >
                  <CheckCircle2 size={14} /> Approve
                </button>
                <button
                  onClick={() => setStudentStatus(s.uid, "rejected")}
                  className="btn-secondary !px-4 !py-2 text-xs"
                >
                  <XCircle size={14} /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 card flex items-center gap-4 p-6">
        <FileStack className="text-momentum-500" size={22} />
        <div>
          <p className="text-sm font-semibold text-navy-700 dark:text-paper">
            Manage study materials
          </p>
          <p className="text-xs text-navy-700/60 dark:text-paper/60">
            Upload PDFs and organize them by class, subject and chapter.
          </p>
        </div>
        <Link href="/admin/materials" className="btn-secondary ml-auto !px-4 !py-2 text-xs">
          Open
        </Link>
      </div>
    </div>
  );
}
