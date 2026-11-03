import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/site";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed right-5 bottom-5 z-40 inline-flex h-14 items-center gap-2 rounded-full bg-[#1f7a4d] pr-5 pl-4 text-sm font-semibold text-white shadow-lift transition-all duration-300 hover:bg-[#17633e] sm:right-8 sm:bottom-8"
    >
      <span className="relative flex size-6 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-white/30 motion-reduce:hidden" />
        <MessageCircle className="relative size-6" aria-hidden="true" />
      </span>
      <span className="hidden sm:inline">WhatsApp</span>
      <span className="sr-only sm:hidden">Chat on WhatsApp</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
