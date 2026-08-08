"use client";

import { useEffect, useState } from "react";
import { Pin, Megaphone } from "lucide-react";
import { subscribeNotices } from "@/lib/firestore";
import type { Notice } from "@/types";

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    const unsub = subscribeNotices(setNotices);
    return () => unsub();
  }, []);

  return (
    <section className="container-app py-14">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Notice Board</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-navy-700 dark:text-paper sm:text-4xl">
          Latest updates
        </h1>
      </div>

      <div className="mx-auto mt-10 max-w-2xl space-y-4">
        {notices.length === 0 && (
          <div className="card flex flex-col items-center gap-2 p-10 text-center">
            <Megaphone className="text-momentum-500" size={22} />
            <p className="text-sm text-navy-700/60 dark:text-paper/60">
              No notices posted yet.
            </p>
          </div>
        )}
        {notices.map((n) => (
          <div key={n.id} className="card p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-semibold text-navy-700 dark:text-paper">
                {n.title}
              </h3>
              {n.pinned && <Pin size={14} className="text-momentum-500" />}
            </div>
            <p className="mt-2 text-sm text-navy-700/75 dark:text-paper/75">{n.body}</p>
            <p className="mt-3 text-xs text-navy-700/50 dark:text-paper/50">
              {new Date(n.postedAt).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
