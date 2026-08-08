"use client";

import { useState } from "react";
import { Phone, Mail, MessageCircle, MapPin, Send, CheckCircle2 } from "lucide-react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await addDoc(collection(db, "messages"), { ...form, sentAt: Date.now() });
      setSent(true);
      setForm({ name: "", phone: "", message: "" });
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="container-app py-14">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Contact Us</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-navy-700 dark:text-paper sm:text-4xl">
          We&apos;d love to hear from you
        </h1>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <a href="tel:+91600341093" className="card flex items-center gap-4 p-5">
            <Phone className="text-momentum-500" size={20} />
            <div>
              <p className="text-sm font-semibold text-navy-700 dark:text-paper">Phone</p>
              <p className="text-sm text-navy-700/70 dark:text-paper/70">600341093</p>
            </div>
          </a>
          <a
            href="https://wa.me/916003410393"
            target="_blank"
            rel="noopener noreferrer"
            className="card flex items-center gap-4 p-5"
          >
            <MessageCircle className="text-momentum-500" size={20} />
            <div>
              <p className="text-sm font-semibold text-navy-700 dark:text-paper">WhatsApp</p>
              <p className="text-sm text-navy-700/70 dark:text-paper/70">6003410393</p>
            </div>
          </a>
          <a href="mailto:momentumacademy27@gmail.com" className="card flex items-center gap-4 p-5">
            <Mail className="text-momentum-500" size={20} />
            <div>
              <p className="text-sm font-semibold text-navy-700 dark:text-paper">Email</p>
              <p className="text-sm text-navy-700/70 dark:text-paper/70">
                momentumacademy27@gmail.com
              </p>
            </div>
          </a>
          <div className="card flex h-40 items-center justify-center gap-2 p-5 text-navy-700/50 dark:text-paper/50">
            <MapPin size={18} />
            <span className="text-sm">Map location coming soon</span>
          </div>
        </div>

        <form onSubmit={submit} className="card space-y-4 p-6">
          {sent && (
            <div className="flex items-center gap-2 rounded-lg bg-momentum-50 p-3 text-sm text-momentum-700 dark:bg-momentum-500/10 dark:text-momentum-300">
              <CheckCircle2 size={16} /> Message sent — we&apos;ll get back to you soon.
            </div>
          )}
          <div>
            <label className="text-xs font-medium text-navy-700/70 dark:text-paper/70">Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 w-full rounded-lg border border-navy-100 bg-white px-4 py-2.5 text-sm outline-none focus:border-momentum-500 dark:border-white/10 dark:bg-navy-800 dark:text-paper"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-navy-700/70 dark:text-paper/70">Phone</label>
            <input
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="mt-1 w-full rounded-lg border border-navy-100 bg-white px-4 py-2.5 text-sm outline-none focus:border-momentum-500 dark:border-white/10 dark:bg-navy-800 dark:text-paper"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-navy-700/70 dark:text-paper/70">Message</label>
            <textarea
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-1 w-full rounded-lg border border-navy-100 bg-white px-4 py-2.5 text-sm outline-none focus:border-momentum-500 dark:border-white/10 dark:bg-navy-800 dark:text-paper"
            />
          </div>
          <button disabled={sending} className="btn-primary w-full">
            <Send size={15} /> {sending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}
