import { Users2, HeartHandshake, GraduationCap, NotebookPen } from "lucide-react";

const PILLARS = [
  {
    icon: Users2,
    title: "Personal attention",
    body: "Small batches mean every student is known by name, not by roll number — every doubt gets answered.",
  },
  {
    icon: GraduationCap,
    title: "Concept building",
    body: "We teach the why before the how, so students carry understanding into the exam hall, not just memorized steps.",
  },
  {
    icon: NotebookPen,
    title: "Handwritten notes & DPP practice",
    body: "Every chapter comes with structured notes and Daily Practice Papers designed for the SEBA exam pattern.",
  },
  {
    icon: HeartHandshake,
    title: "Student-first approach",
    body: "Regular tests and honest feedback — our commitment is to your result, not just to finishing the syllabus.",
  },
];

export default function AboutPage() {
  return (
    <section className="container-app py-14">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">About Momentum Academy</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-navy-700 dark:text-paper sm:text-4xl">
          Who we are
        </h1>
        <p className="mt-4 text-navy-700/75 dark:text-paper/75">
          Momentum Academy is a SEBA Board coaching institute for Class 9 and
          Class 10 students, built on one belief: brilliance comes from
          mastering the basics first. We teach Mathematics, Science, English
          and Social Science with a student-first, small-batch philosophy —
          and this website is our promise that no student ever loses a note
          again.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
        {PILLARS.map(({ icon: Icon, title, body }) => (
          <div key={title} className="card p-6">
            <Icon className="text-momentum-500" size={24} />
            <h3 className="mt-4 text-sm font-semibold text-navy-700 dark:text-paper">
              {title}
            </h3>
            <p className="mt-2 text-sm text-navy-700/70 dark:text-paper/70">{body}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-2xl card p-8">
        <h2 className="font-display text-xl font-semibold text-navy-700 dark:text-paper">
          Our commitment
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-navy-700/75 dark:text-paper/75">
          Every note, DPP and answer set we publish is written and checked by
          us — nothing generic, nothing borrowed from outside the SEBA
          syllabus. We stay accountable to one measure of success: your
          result.
        </p>
      </div>
    </section>
  );
}
