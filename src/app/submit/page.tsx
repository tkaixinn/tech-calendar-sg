"use client";

import { useState } from "react";

const categories = ["hackathon", "workshop", "talk", "networking"];

export default function SubmitPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const data = new FormData(e.currentTarget);
    await fetch(process.env.NEXT_PUBLIC_FORMSPREE_URL!, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });
    setStatus("done");
  }

  return (
    <main className="min-h-screen bg-[#fbf7f1] text-slate-900">
      <nav className="sticky top-0 z-20 border-b border-stone-200/80 bg-[#fbf7f1]/90 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a href="/" className="text-xl font-semibold tracking-tight text-slate-900">Tech Calendar SG</a>
          <a href="/" className="text-sm font-medium text-slate-700 hover:text-slate-950">← Back to events</a>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-slate-950 mb-2">Submit an event</h1>
        <p className="text-slate-700 mb-8">
          Know a Singapore tech event that should be listed? Submit it below and we'll review it within 48 hours.
        </p>

        {status === "done" ? (
          <div className="bg-white border border-stone-200 rounded-2xl p-8 text-center shadow-[0_18px_50px_rgba(120,113,108,0.08)]">
            <p className="text-2xl mb-2">🎉</p>
            <h2 className="text-lg font-semibold text-slate-950 mb-1">Submission received!</h2>
            <p className="text-slate-700 text-sm mb-4">Thanks — we'll review your event and add it to the calendar shortly.</p>
            <a href="/" className="inline-block bg-slate-950 text-white px-5 py-2 rounded-full text-sm font-medium hover:-translate-y-0.5 transition-transform">
              Back to events
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-stone-200 p-8 flex flex-col gap-5 shadow-[0_18px_50px_rgba(120,113,108,0.08)]">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Event title *</label>
              <input name="title" required placeholder="e.g. Startup Builders Networking Night"
                className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Date *</label>
                <input type="date" name="date" required
                  className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category *</label>
                <select name="category"
                  className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500">
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Location *</label>
              <input name="location" required placeholder="e.g. NUS Computing, Singapore"
                className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Organiser *</label>
              <input name="organiser" required placeholder="e.g. Organising team"
                className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
              <textarea name="description" required rows={4} placeholder="e.g. Learn, build, and network with other engineers"
                className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Event link *</label>
              <input name="link" required placeholder="https://..."
                className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500" />
            </div>

            <button type="submit" disabled={status === "submitting"}
              className="w-full bg-slate-950 text-white py-3 rounded-full font-medium hover:-translate-y-0.5 transition-transform text-sm disabled:opacity-50">
              {status === "submitting" ? "Submitting..." : "Submit Event"}
            </button>
          </form>
        )}
      </div>

      <footer className="border-t border-stone-200 px-6 py-8 mt-8 text-slate-500">
        <div className="mx-auto flex max-w-6xl items-center justify-between text-sm">
          <span>📅 Tech Calendar SG</span>
          <span>Curating Singapore's tech events</span>
        </div>
      </footer>
    </main>
  );
}