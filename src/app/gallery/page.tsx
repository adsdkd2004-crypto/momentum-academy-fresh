import { ImageIcon } from "lucide-react";

export default function GalleryPage() {
  return (
    <section className="container-app flex min-h-[50vh] flex-col items-center justify-center py-14 text-center">
      <div className="card flex flex-col items-center gap-3 p-12">
        <ImageIcon className="text-momentum-500" size={28} />
        <h1 className="font-display text-2xl font-semibold text-navy-700 dark:text-paper">
          Gallery
        </h1>
        <p className="text-sm text-navy-700/60 dark:text-paper/60">
          Photos will be uploaded soon.
        </p>
      </div>
    </section>
  );
}
