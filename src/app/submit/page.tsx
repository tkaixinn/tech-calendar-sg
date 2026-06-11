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
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-gray-900">📅 Tech Calendar SG</a>
          <a href="/" className="text-sm text-blue-600 hover:underline font-medium">← Back to events</a>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Submit an event</h1>
        <p className="text-gray-500 mb-8">
          Know a Singapore tech event that should be listed? Submit it below and we'll review it within 48 hours.
        </p>

        {status === "done" ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
            <p className="text-2xl mb-2">🎉</p>
            <h2 className="text-lg font-semibold text-green-800 mb-1">Submission received!</h2>
            <p className="text-green-700 text-sm mb-4">Thanks — we'll review your event and add it to the calendar shortly.</p>
            <a href="/" className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Back to events
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event title *</label>
              <input name="title" required placeholder="e.g. Startup Builders Networking Night"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                <input type="date" name="date" required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select name="category"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
              <input name="location" required placeholder="e.g. NUS Computing, Singapore"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Organiser *</label>
              <input name="organiser" required placeholder="e.g. Organising team"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea name="description" required rows={4} placeholder="e.g. Learn, build, and network with other engineers"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event link *</label>
              <input name="link" required placeholder="https://..."
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <button type="submit" disabled={status === "submitting"}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm disabled:opacity-50">
              {status === "submitting" ? "Submitting..." : "Submit Event"}
            </button>
          </form>
        )}
      </div>

      <footer className="border-t border-gray-200 px-6 py-8 mt-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-gray-400">
          <span>📅 Tech Calendar SG</span>
          <span>Curating Singapore's tech events</span>
        </div>
      </footer>
    </main>
  );
}