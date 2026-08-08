import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import WhatsAppButton from "@/components/WhatsAppButton";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Momentum Academy | From Basics to Brilliance",
  description:
    "SEBA Class 9 & 10 coaching institute. Handwritten notes, DPPs, and Question & Answer materials for Mathematics, Science, English and Social Science — organized chapter-wise, always available for download.",
  manifest: "/manifest.json",
  icons: { icon: "/logo.png", apple: "/logo.png" },
};

export const viewport: Viewport = {
  themeColor: "#1A3A6B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body className="font-body">
        <AuthProvider>
          <Navbar />
          <main className="min-h-[70vh]">{children}</main>
          <Footer />
          <BackToTop />
          <WhatsAppButton />
        </AuthProvider>
      </body>
    </html>
  );
}
