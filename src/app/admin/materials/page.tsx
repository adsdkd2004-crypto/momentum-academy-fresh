"use client";

import { useEffect, useState } from "react";
import { UploadCloud, Trash2, Loader2 } from "lucide-react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, query, where, getDocs, addDoc, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import { subscribeMaterials, deleteMaterial } from "@/lib/firestore";
import type { Material, MaterialType, SubjectName } from "@/types";

const SUBJECTS: SubjectName[] = ["Mathematics", "Science", "English", "Social Science"];
const TYPES: MaterialType[] = ["Handwritten Notes", "DPP", "Question & Answer", "Video"];

export default function AdminMaterialsPage() {
  const [classId, setClassId] = useState<"class-9" | "class-10">("class-10");
  const [subject, setSubject] = useState<SubjectName>("Mathematics");
  const [chapterTitle, setChapterTitle] = useState("");
  const [type, setType] = useState<MaterialType>("Handwritten Notes");
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [materials, setMaterials] = useState<Material[]>([]);

  useEffect(() => {
    const unsub = subscribeMaterials(classId, subject, [], setMaterials);
    return () => unsub();
  }, [classId, subject]);

  const ensureChapter = async () => {
    const q = query(
      collection(db, "chapters"),
      where("classId", "==", classId),
      where("subject", "==", subject),
      where("title", "==", chapterTitle.trim())
    );
    const snap = await getDocs(q);
    if (!snap.empty) return snap.docs[0].id;
    const countSnap = await getDocs(
      query(collection(db, "chapters"), where("classId", "==", classId), where("subject", "==", subject))
    );
    const docRef = await addDoc(collection(db, "chapters"), {
      classId,
      subject,
      title: chapterTitle.trim(),
      order: countSnap.size + 1,
    });
    return docRef.id;
  };

  const handleUpload = async () => {
    if (!file || !chapterTitle.trim()) return;
    setProgress(0);
    const chapterId = await ensureChapter();
    const storagePath = `materials/${classId}/${subject}/${chapterTitle.trim()}/${Date.now()}-${file.name}`;
    const storageRef = ref(storage, storagePath);
    const task = uploadBytesResumable(storageRef, file);

    task.on(
      "state_changed",
      (snap) => setProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
      (err) => {
        console.error(err);
        setProgress(null);
      },
      async () => {
        const fileURL = await getDownloadURL(task.snapshot.ref);
        await addDoc(collection(db, "materials"), {
          chapterId,
          classId,
          subject,
          chapterTitle: chapterTitle.trim(),
          type,
          fileName: file.name,
          fileURL,
          fileSizeKB: Math.round(file.size / 1024),
          uploadedAt: Date.now(),
          updatedAt: Date.now(),
        });
        setProgress(null);
        setFile(null);
        setChapterTitle("");
      }
    );
  };

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="font-display text-lg font-semibold text-navy-700 dark:text-paper">
          Upload material
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <select
            value={classId}
            onChange={(e) => setClassId(e.target.value as any)}
            className="rounded-lg border border-navy-100 bg-white px-3 py-2.5 text-sm dark:border-white/10 dark:bg-navy-800 dark:text-paper"
          >
            <option value="class-9">Class 9</option>
            <option value="class-10">Class 10</option>
          </select>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value as SubjectName)}
            className="rounded-lg border border-navy-100 bg-white px-3 py-2.5 text-sm dark:border-white/10 dark:bg-navy-800 dark:text-paper"
          >
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <input
            value={chapterTitle}
            onChange={(e) => setChapterTitle(e.target.value)}
            placeholder="Chapter title (e.g. Chapter 12: Electricity)"
            className="rounded-lg border border-navy-100 bg-white px-3 py-2.5 text-sm sm:col-span-2 dark:border-white/10 dark:bg-navy-800 dark:text-paper"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value as MaterialType)}
            className="rounded-lg border border-navy-100 bg-white px-3 py-2.5 text-sm dark:border-white/10 dark:bg-navy-800 dark:text-paper"
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="text-sm text-navy-700/70 dark:text-paper/70"
          />
        </div>

        {progress !== null && (
          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-navy-100 dark:bg-white/10">
            <div className="h-full bg-momentum-500 transition-all" style={{ width: `${progress}%` }} />
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || !chapterTitle.trim() || progress !== null}
          className="btn-primary mt-4 w-full disabled:opacity-50"
        >
          {progress !== null ? <Loader2 className="animate-spin" size={16} /> : <UploadCloud size={16} />}
          {progress !== null ? `Uploading ${progress}%` : "Upload PDF"}
        </button>
      </div>

      <div className="card p-6">
        <h2 className="font-display text-lg font-semibold text-navy-700 dark:text-paper">
          {classId === "class-9" ? "Class 9" : "Class 10"} &middot; {subject}
        </h2>
        <div className="mt-4 space-y-2">
          {materials.map((m) => (
            <div key={m.id} className="flex items-center justify-between rounded-lg border border-navy-100 p-3 text-sm dark:border-white/10">
              <div className="min-w-0">
                <p className="truncate font-medium text-navy-700 dark:text-paper">{m.fileName}</p>
                <p className="text-xs text-navy-700/60 dark:text-paper/60">
                  {m.chapterTitle} &middot; {m.type}
                </p>
              </div>
              <button
                onClick={() => deleteMaterial(m.id)}
                className="ml-3 shrink-0 rounded-full p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                aria-label="Delete material"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
          {materials.length === 0 && (
            <p className="text-sm text-navy-700/60 dark:text-paper/60">No materials yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
