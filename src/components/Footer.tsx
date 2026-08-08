import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-navy-100/70 bg-white dark:border-navy-700/60 dark:bg-navy-800">
      <div className="container-app grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Momentum Academy" width={34} height={34} className="rounded-full" />
            <span className="font-display text-base font-semibold text-navy-700 dark:text-paper">
              Momentum Academy
            </span>
          </div>
          <p className="mt-3 text-sm italic text-navy-700/70 dark:text-paper/70">
            From Basics to Brilliance
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-navy-700 dark:text-paper">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm text-navy-700/70 dark:text-paper/70">
            <li><Link href="/about" className="hover:text-momentum-600">About</Link></li>
            <li><Link href="/notes" className="hover:text-momentum-600">Notes Library</Link></li>
            <li><Link href="/dpp" className="hover:text-momentum-600">DPP Library</Link></li>
            <li><Link href="/fees" className="hover:text-momentum-600">Fee Structure</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-navy-700 dark:text-paper">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-navy-700/70 dark:text-paper/70">
            <li className="flex items-center gap-2"><Phone size={14} /> 600341093</li>
            <li className="flex items-center gap-2"><MessageCircle size={14} /> 6003410393</li>
            <li className="flex items-center gap-2"><Mail size={14} /> momentumacademy27@gmail.com</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-navy-700 dark:text-paper">SEBA Class 9 &amp; 10</h4>
          <p className="mt-3 text-sm text-navy-700/70 dark:text-paper/70">
            Mathematics &middot; Science &middot; English &middot; Social Science
          </p>
        </div>
      </div>

      <div className="border-t border-navy-100/70 py-5 text-center text-xs text-navy-700/60 dark:border-navy-700/60 dark:text-paper/60">
        © {new Date().getFullYear()} Momentum Academy. All rights reserved.
      </div>
    </footer>
  );
}
