import Link from "next/link";
import Image from "next/image";
import {
  BookOpenCheck,
  Target,
  Eye,
  Users,
  NotebookPen,
  ClipboardCheck,
  Sparkles,
} from "lucide-react";

const WHY_US = [
  { icon: Users, title: "Small batch advantage", body: "Every student gets real, personal attention — not lost in a crowd." },
  { icon: NotebookPen, title: "Handwritten notes", body: "Clear, exam-focused notes for every chapter, always available to download." },
  { icon: ClipboardCheck, title: "Daily Practice Papers", body: "Structured DPPs that build exam temperament chapter by chapter." },
  { icon: Target, title: "Regular tests", body: "Frequent testing keeps concepts sharp and exam-ready." },
];

const METHOD_STEPS = [
  { step: "Learn", body: "Concepts are built from the basics — nothing assumed, nothing skipped." },
  { step: "Practice", body: "Daily Practice Papers turn understanding into exam-ready skill." },
  { step: "Test", body: "Regular tests track progress and catch gaps early." },
  { step: "Improve", body: "Personal feedback closes the gap between good and brilliant." },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="container-app pb-16 pt-14 sm:pt-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center animate-rise">
          <Image
            src="/logo.png"
            alt="Momentum Academy logo"
            width={104}
            height={104}
            priority
            className="rounded-full shadow-soft"
          />
          <p className="eyebrow mt-6">SEBA Board &middot; Class 9 &amp; Class 10</p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-navy-700 dark:text-paper sm:text-5xl">
            Momentum Academy
          </h1>
          <p className="mt-3 font-display text-lg italic text-momentum-600 dark:text-momentum-300">
            From Basics to Brilliance
          </p>
          <p className="mt-5 max-w-xl text-balance text-navy-700/75 dark:text-paper/75">
            Your permanent digital study library — handwritten notes, DPPs and
            Question &amp; Answer sets, organized chapter-wise, so nothing you
            need before an exam ever gets lost in a chat again.
          </p>

          <svg
            viewBox="0 0 240 60"
            className="mt-8 h-12 w-60 text-momentum-500"
            fill="none"
          >
            <path
              className="growth-line"
              d="M4 46 L60 46 L88 14 L116 40 L150 8 L236 8"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/login?mode=register" className="btn-primary">
              Register
            </Link>
            <Link href="/login" className="btn-secondary">
              Login
            </Link>
            <Link href="/notes" className="btn-secondary">
              Explore Notes
            </Link>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="container-app grid gap-5 py-10 sm:grid-cols-2">
        <div className="card p-7">
          <Target className="text-momentum-500" size={26} />
          <h3 className="mt-4 font-display text-xl font-semibold text-navy-700 dark:text-paper">
            Our Mission
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-navy-700/75 dark:text-paper/75">
            To give every SEBA Class 9 and 10 student a strong, honest foundation
            in the basics — because brilliance is built, not shortcut.
          </p>
        </div>
        <div className="card p-7">
          <Eye className="text-momentum-500" size={26} />
          <h3 className="mt-4 font-display text-xl font-semibold text-navy-700 dark:text-paper">
            Our Vision
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-navy-700/75 dark:text-paper/75">
            A coaching experience where no student ever loses access to their
            notes — a permanent, organized library they can return to anytime.
          </p>
        </div>
      </section>

      {/* Why choose us */}
      <section className="container-app py-10">
        <div className="text-center">
          <p className="eyebrow">Why choose us</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-navy-700 dark:text-paper sm:text-3xl">
            Built around how you actually study
          </h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_US.map(({ icon: Icon, title, body }) => (
            <div key={title} className="card p-6">
              <Icon className="text-momentum-500" size={24} />
              <h4 className="mt-4 text-sm font-semibold text-navy-700 dark:text-paper">
                {title}
              </h4>
              <p className="mt-2 text-sm text-navy-700/70 dark:text-paper/70">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Methodology */}
      <section className="container-app py-10">
        <div className="card overflow-hidden p-7 sm:p-10">
          <p className="eyebrow">Learning methodology</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-navy-700 dark:text-paper">
            Learn. Practice. Test. Improve.
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-4">
            {METHOD_STEPS.map(({ step, body }) => (
              <div key={step}>
                <h4 className="font-display text-lg font-semibold text-momentum-600 dark:text-momentum-300">
                  {step}
                </h4>
                <p className="mt-2 text-sm text-navy-700/70 dark:text-paper/70">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-app py-16">
        <div className="card flex flex-col items-center gap-4 bg-navy-700 p-10 text-center text-white dark:bg-navy-800">
          <Sparkles size={24} className="text-momentum-300" />
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            Never lose a note again
          </h2>
          <p className="max-w-lg text-sm text-white/80">
            Create your free account, and once approved, every chapter&apos;s
            notes and DPPs are always one tap away.
          </p>
          <Link href="/login?mode=register" className="btn-primary bg-momentum-500 hover:bg-momentum-600">
            <BookOpenCheck size={16} /> Register with Google
          </Link>
        </div>
      </section>
    </>
  );
}
