import LibraryBrowser from "@/components/LibraryBrowser";

export default function DppPage() {
  return (
    <LibraryBrowser
      title="DPP Library"
      description="Daily Practice Papers for every chapter — download and practice anytime."
      materialTypes={["DPP"]}
    />
  );
}
