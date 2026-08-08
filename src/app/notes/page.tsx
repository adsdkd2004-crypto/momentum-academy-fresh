import LibraryBrowser from "@/components/LibraryBrowser";

export default function NotesPage() {
  return (
    <LibraryBrowser
      title="Notes Library"
      description="Handwritten notes and Question & Answer sets, organized by class, subject and chapter."
      materialTypes={["Handwritten Notes", "Question & Answer"]}
    />
  );
}
