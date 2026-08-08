"use client";

import { useState } from "react";
import { Download, Eye, CheckCircle2, FileText } from "lucide-react";
import type { Material } from "@/types";

function formatSize(kb: number) {
  if (kb < 1024) return `${kb} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function MaterialCard({ material }: { material: Material }) {
  const [progress, setProgress] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [done, setDone] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    setDone(false);
    setProgress(0);

    // Lightweight visual progress indicator while the browser fetches the file.
    const tick = setInterval(() => {
      setProgress((p) => (p >= 90 ? p : p + 10));
    }, 120);

    try {
      const res = await fetch(material.fileURL);
      const blob = await res.blob();
      clearInterval(tick);
      setProgress(100);

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = material.fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setDone(true);
    } finally {
      clearInterval(tick);
      setTimeout(() => setDownloading(false), 400);
    }
  };

  return (
    <div className="card flex flex-col gap-3 p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-momentum-50 text-momentum-600 dark:bg-momentum-500/10 dark:text-momentum-300">
          <FileText size={18} />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-navy-700 dark:text-paper">
            {material.fileName}
          </p>
          <p className="mt-0.5 text-xs text-navy-700/60 dark:text-paper/60">
            {material.type} &middot; {formatSize(material.fileSizeKB)} &middot; Updated{" "}
            {formatDate(material.updatedAt)}
          </p>
        </div>
      </div>

      {downloading && (
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-navy-100 dark:bg-white/10">
          <div
            className="h-full rounded-full bg-momentum-500 transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <div className="flex gap-2">
        <a
          href={material.fileURL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary flex-1 !py-2 text-xs"
        >
          <Eye size={14} /> Preview
        </a>
        <button onClick={handleDownload} className="btn-primary flex-1 !py-2 text-xs">
          {done ? <CheckCircle2 size={14} /> : <Download size={14} />}
          {done ? "Downloaded" : "Download"}
        </button>
      </div>
    </div>
  );
}
