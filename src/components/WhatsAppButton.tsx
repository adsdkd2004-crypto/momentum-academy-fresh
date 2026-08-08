import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/916003410393"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-momentum-500 text-white shadow-soft transition hover:bg-momentum-600"
    >
      <span className="absolute inline-flex h-full w-full animate-pulseRing rounded-full bg-momentum-500" />
      <MessageCircle size={24} className="relative" />
    </a>
  );
}
