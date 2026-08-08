import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-app flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="font-display text-4xl font-semibold text-navy-700 dark:text-paper">404</h1>
      <p className="mt-2 text-sm text-navy-700/70 dark:text-paper/70">
        This page doesn&apos;t exist.
      </p>
      <Link href="/" className="btn-primary mt-6">
        Back to Home
      </Link>
    </div>
  );
}
