"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Lock,
  Clock3,
  ArrowLeft,
  BookOpen,
  FileText,
  ClipboardList,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import {
  subscribeChapters,
  subscribeMaterials,
} from "@/lib/firestore";

import MaterialCard from "./MaterialCard";

import type {
  Chapter,
  Material,
  MaterialType,
  SubjectName,
} from "@/types";

const SUBJECTS: SubjectName[] = [
  "Mathematics",
  "Science",
  "English",
  "Social Science",
];

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

  const [classId, setClassId] = useState<
    "class-9" | "class-10" | null
  >(null);

  const [subject, setSubject] =
    useState<SubjectName | null>(null);

  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedChapter, setSelectedChapter] =
    useState<Chapter | null>(null);

  const [selectedType, setSelectedType] =
    useState<MaterialType | null>(null);

  const [materials, setMaterials] = useState<Material[]>([]);

  const approved = profile?.status === "approved";

  /*
   * Load chapters whenever the student chooses
   * a class + subject.
   */
  useEffect(() => {
    if (!approved || !classId || !subject) {
      setChapters([]);
      return;
    }

    const unsub = subscribeChapters(
      classId,
      subject,
      setChapters
    );

    return () => unsub();
  }, [approved, classId, subject]);

  /*
   * Load materials whenever the student chooses
   * a class + subject.
   */
  useEffect(() => {
    if (!approved || !classId || !subject) {
      setMaterials([]);
      return;
    }

    const unsub = subscribeMaterials(
      classId,
      subject,
      materialTypes,
      setMaterials
    );

    return () => unsub();
  }, [approved, classId, subject, materialTypes]);

  const chapterMaterials = selectedChapter
    ? materials.filter(
        (material) =>
          material.chapterId === selectedChapter.id
      )
    : [];

  const visibleMaterials = selectedType
    ? chapterMaterials.filter(
        (material) => material.type === selectedType
      )
    : [];

  const resetToClasses = () => {
    setClassId(null);
    setSubject(null);
    setSelectedChapter(null);
    setSelectedType(null);
  };

  const resetToSubjects = () => {
    setSubject(null);
    setSelectedChapter(null);
    setSelectedType(null);
  };

  const resetToChapters = () => {
    setSelectedChapter(null);
    setSelectedType(null);
  };

  return (
    <section className="container-app py-14">

      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">{title}</p>

        <h1 className="mt-2 font-display text-3xl font-semibold text-navy-700 dark:text-paper sm:text-4xl">
          {title}
        </h1>

        <p className="mt-3 text-navy-700/75 dark:text-paper/75">
          {description}
        </p>
      </div>

      {/* Login */}
      {!loading && !user && (
        <div className="mx-auto mt-10 max-w-md card flex flex-col items-center gap-3 p-8 text-center">
          <Lock
            className="text-momentum-500"
            size={22}
          />

          <p className="text-sm text-navy-700/75 dark:text-paper/75">
            Login with Google to view and download
            study materials.
          </p>

          <button
            onClick={signInWithGoogle}
            className="btn-primary mt-1"
          >
            Continue with Google
          </button>
        </div>
      )}

      {/* Pending / rejected / suspended */}
      {!loading && user && !approved && (
        <div className="mx-auto mt-10 max-w-md card flex flex-col items-center gap-3 p-8 text-center">
          <Clock3
            className="text-momentum-500"
            size={22}
          />

          <p className="text-sm font-medium text-navy-700 dark:text-paper">
            {profile?.status === "rejected" &&
              "Your account request was not approved."}

            {profile?.status === "suspended" &&
              "Your account is currently suspended."}

            {(!profile ||
              profile.status === "pending") &&
              "Your account is pending verification."}
          </p>

          <p className="text-xs text-navy-700/60 dark:text-paper/60">
            {(!profile ||
              profile.status === "pending") &&
              "Once your teacher approves your account, materials will unlock here automatically."}
          </p>
        </div>
      )}

      {/* Main Library */}
      {approved && (
        <div className="mx-auto mt-10 max-w-4xl">

          {/* STEP 1 — CLASS */}
          {!classId && (
            <div>
              <h2 className="font-display text-2xl font-semibold text-navy-700 dark:text-paper">
                Select your class
              </h2>

              <p className="mt-2 text-sm text-navy-700/60 dark:text-paper/60">
                Choose your class to continue.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                {(["class-9", "class-10"] as const).map(
                  (c) => (
                    <button
                      key={c}
                      onClick={() => setClassId(c)}
                      className="card p-6 text-left transition hover:-translate-y-1 hover:border-momentum-500"
                    >
                      <BookOpen
                        className="text-momentum-500"
                        size={24}
                      />

                      <h3 className="mt-4 font-display text-xl font-semibold text-navy-700 dark:text-paper">
                        {c === "class-9"
                          ? "Class 9"
                          : "Class 10"}
                      </h3>

                      <p className="mt-1 text-sm text-navy-700/60 dark:text-paper/60">
                        View study materials
                      </p>
                    </button>
                  )
                )}

              </div>
            </div>
          )}

          {/* STEP 2 — SUBJECT */}
          {classId && !subject && (
            <div>

              <button
                onClick={resetToClasses}
                className="mb-6 flex items-center gap-2 text-sm text-navy-700/60 hover:text-navy-700 dark:text-paper/60 dark:hover:text-paper"
              >
                <ArrowLeft size={16} />
                Back to classes
              </button>

              <h2 className="font-display text-2xl font-semibold text-navy-700 dark:text-paper">
                {classId === "class-9"
                  ? "Class 9"
                  : "Class 10"}{" "}
                Subjects
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                {SUBJECTS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSubject(s)}
                    className="card p-6 text-left transition hover:-translate-y-1 hover:border-momentum-500"
                  >
                    <BookOpen
                      className="text-momentum-500"
                      size={24}
                    />

                    <h3 className="mt-4 font-display text-lg font-semibold text-navy-700 dark:text-paper">
                      {s}
                    </h3>

                    <p className="mt-1 text-sm text-navy-700/60 dark:text-paper/60">
                      View chapters
                    </p>
                  </button>
                ))}

              </div>
            </div>
          )}

          {/* STEP 3 — CHAPTERS */}
          {classId && subject && !selectedChapter && (
            <div>

              <button
                onClick={resetToSubjects}
                className="mb-6 flex items-center gap-2 text-sm text-navy-700/60 hover:text-navy-700 dark:text-paper/60 dark:hover:text-paper"
              >
                <ArrowLeft size={16} />
                Back to subjects
              </button>

              <h2 className="font-display text-2xl font-semibold text-navy-700 dark:text-paper">
                {subject}
              </h2>

              <p className="mt-2 text-sm text-navy-700/60 dark:text-paper/60">
                Select a chapter.
              </p>

              <div className="mt-6 space-y-3">

                {chapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() =>
                      setSelectedChapter(chapter)
                    }
                    className="card flex w-full items-center gap-4 p-5 text-left transition hover:border-momentum-500"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-momentum-50 text-momentum-600 dark:bg-momentum-500/10 dark:text-momentum-300">
                      <BookOpen size={20} />
                    </div>

                    <div>
                      <h3 className="font-display text-base font-semibold text-navy-700 dark:text-paper">
                        {chapter.title}
                      </h3>

                      <p className="mt-1 text-xs text-navy-700/60 dark:text-paper/60">
                        Open chapter
                      </p>
                    </div>
                  </button>
                ))}

                {chapters.length === 0 && (
                  <p className="py-8 text-center text-sm text-navy-700/60 dark:text-paper/60">
                    No chapters available yet.
                  </p>
                )}

              </div>
            </div>
          )}

          {/* STEP 4 — MATERIAL TYPE */}
          {selectedChapter && !selectedType && (
            <div>

              <button
                onClick={resetToChapters}
                className="mb-6 flex items-center gap-2 text-sm text-navy-700/60 hover:text-navy-700 dark:text-paper/60 dark:hover:text-paper"
              >
                <ArrowLeft size={16} />
                Back to chapters
              </button>

              <h2 className="font-display text-2xl font-semibold text-navy-700 dark:text-paper">
                {selectedChapter.title}
              </h2>

              <p className="mt-2 text-sm text-navy-700/60 dark:text-paper/60">
                Choose what you want to study.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                {materialTypes.includes(
                  "Handwritten Notes"
                ) && (
                  <button
                    onClick={() =>
                      setSelectedType(
                        "Handwritten Notes"
                      )
                    }
                    className="card p-6 text-left transition hover:-translate-y-1 hover:border-momentum-500"
                  >
                    <FileText
                      className="text-momentum-500"
                      size={25}
                    />

                    <h3 className="mt-4 font-display text-lg font-semibold text-navy-700 dark:text-paper">
                      Handwritten Notes
                    </h3>

                    <p className="mt-1 text-sm text-navy-700/60 dark:text-paper/60">
                      View handwritten chapter notes
                    </p>
                  </button>
                )}

                {materialTypes.includes(
                  "Question & Answer"
                ) && (
                  <button
                    onClick={() =>
                      setSelectedType(
                        "Question & Answer"
                      )
                    }
                    className="card p-6 text-left transition hover:-translate-y-1 hover:border-momentum-500"
                  >
                    <ClipboardList
                      className="text-momentum-500"
                      size={25}
                    />

                    <h3 className="mt-4 font-display text-lg font-semibold text-navy-700 dark:text-paper">
                      Question & Answer
                    </h3>

                    <p className="mt-1 text-sm text-navy-700/60 dark:text-paper/60">
                      Practice questions and answers
                    </p>
                  </button>
                )}

              </div>
            </div>
          )}

          {/* STEP 5 — PDF */}
          {selectedChapter && selectedType && (
            <div>

              <button
                onClick={() => setSelectedType(null)}
                className="mb-6 flex items-center gap-2 text-sm text-navy-700/60 hover:text-navy-700 dark:text-paper/60 dark:hover:text-paper"
              >
                <ArrowLeft size={16} />
                Back to material types
              </button>

              <h2 className="font-display text-2xl font-semibold text-navy-700 dark:text-paper">
                {selectedType}
              </h2>

              <p className="mt-2 text-sm text-navy-700/60 dark:text-paper/60">
                {selectedChapter.title}
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                {visibleMaterials.map((material) => (
                  <MaterialCard
                    key={material.id}
                    material={material}
                  />
                ))}

              </div>

              {visibleMaterials.length === 0 && (
                <p className="py-10 text-center text-sm text-navy-700/60 dark:text-paper/60">
                  No material uploaded here yet.
                </p>
              )}

            </div>
          )}

        </div>
      )}

      {!loading && !user && (
        <p className="mt-8 text-center text-xs text-navy-700/50 dark:text-paper/50">
          New here?{" "}
          <Link
            href="/login?mode=register"
            className="text-momentum-600 underline"
          >
            Register
          </Link>{" "}
          with your Gmail account.
        </p>
      )}

    </section>
  );
}
