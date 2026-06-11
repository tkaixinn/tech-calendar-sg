"use client";

import { useState } from "react";
import Link from "next/link";
import { Event } from "@/types/event";

const categoryStyles: Record<Event["category"], { bg: string; text: string }> = {
  hackathon: { bg: "bg-purple-100", text: "text-purple-700" },
  workshop: { bg: "bg-blue-100", text: "text-blue-700" },
  talk: { bg: "bg-green-100", text: "text-green-700" },
  networking: { bg: "bg-orange-100", text: "text-orange-700" },
};

const filterStyles = {
  All: {
    active: "bg-gray-900 text-white",
    inactive: "bg-gray-100 text-gray-700 hover:bg-gray-200",
  },
  hackathon: {
    active: "bg-purple-700 text-white",
    inactive: "bg-purple-100 text-purple-800 hover:bg-purple-200",
  },
  workshop: {
    active: "bg-blue-700 text-white",
    inactive: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  },
  talk: {
    active: "bg-green-700 text-white",
    inactive: "bg-green-100 text-green-800 hover:bg-green-200",
  },
  networking: {
    active: "bg-orange-700 text-white",
    inactive: "bg-orange-100 text-orange-800 hover:bg-orange-200",
  },
} as const;

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-SG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const categories = ["All", "hackathon", "workshop", "talk", "networking"];

export default function EventsGrid({ events }: { events: Event[] }) {
  const [selected, setSelected] = useState("All");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = events
    .filter((e) => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const filtered =
    selected === "All"
      ? upcoming
      : upcoming.filter((e) => e.category === selected);

  return (
    <div>
      {/* FILTER BUTTONS */}
      <div className="mb-10 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium capitalize transition-all ${
              selected === cat
                ? `${filterStyles[cat as keyof typeof filterStyles].active} border-transparent shadow-lg shadow-cyan-950/30`
                : `${filterStyles[cat as keyof typeof filterStyles].inactive} border-stone-300`
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <p className="mb-6 text-sm text-slate-600">
        {filtered.length} upcoming events
      </p>

      {/* EVENT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((event) => {
          const style = categoryStyles[event.category];

          return (
            <Link
              key={event.slug}
              href={`/events/${event.slug}`}
              className="group flex flex-col rounded-3xl border border-stone-200 bg-white p-6 text-white shadow-[0_18px_50px_rgba(194,151,108,0.14)] transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-[0_24px_65px_rgba(194,151,108,0.2)]"
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ring-1 ring-inset ${style.bg} ${style.text}`}
                >
                  {event.category}
                </span>
              </div>

              <h3 className="mb-2 text-base font-semibold leading-snug text-slate-950">
                {event.title}
              </h3>

              <div className="flex flex-col gap-1 mb-3">
                <p className="text-sm text-slate-700">
                  📆 {formatDate(event.date)}
                </p>
                <p className="text-sm text-slate-700">
                  📍 {event.location}
                </p>
              </div>

              <p className="flex-1 text-sm leading-6 text-slate-600 line-clamp-3">
                {event.description}
              </p>

              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-xs text-slate-500">
                  {event.organiser}
                </span>
                <span className="text-sm font-medium text-amber-700 transition-transform group-hover:translate-x-0.5">
                  View Details →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}