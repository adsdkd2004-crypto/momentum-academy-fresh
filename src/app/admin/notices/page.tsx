"use client";

import { useEffect, useState } from "react";
import { Trash2, Send } from "lucide-react";
import { subscribeNotices, addNotice, deleteNotice } from "@/lib/firestore";
import type { Notice } from "@/types";

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const unsub = subscribeNotices(setNotices);
    return () => unsub();
  }, []);

  const post = async () => {
    if (!title.trim() || !body.trim()) return;
    await addNotice(title.trim(), body.trim());
    setTitle("");
    setBody("");
  };

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="font-display text-lg font-semibold text-navy-700 dark:text-paper">
          Post a notice
        </h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="mt-4 w-full rounded-lg border border-navy-100 bg-white px-3 py-2.5 text-sm dark:border-white/10 dark:bg-navy-800 dark:text-paper"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Notice details..."
          rows={3}
          className="mt-3 w-full rounded-lg border border-navy-100 bg-white px-3 py-2.5 text-sm dark:border-white/10 dark:bg-navy-800 dark:text-paper"
        />
        <button onClick={post} className="btn-primary mt-4 w-full">
          <Send size={15} /> Post Notice
        </button>
      </div>

      <div className="space-y-3">
        {notices.map((n) => (
          <div key={n.id} className="card flex items-start justify-between gap-3 p-5">
            <div>
              <p className="text-sm font-semibold text-navy-700 dark:text-paper">{n.title}</p>
              <p className="mt-1 text-sm text-navy-700/70 dark:text-paper/70">{n.body}</p>
            </div>
            <button
              onClick={() => deleteNotice(n.id)}
              className="shrink-0 rounded-full p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
              aria-label="Delete notice"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
