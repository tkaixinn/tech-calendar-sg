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
    inactive: "bg-gray-100 text-gray-600 hover:bg-gray-200",
  },
  hackathon: {
    active: "bg-purple-600 text-white",
    inactive: "bg-purple-100 text-purple-700 hover:bg-purple-200",
  },
  workshop: {
    active: "bg-blue-600 text-white",
    inactive: "bg-blue-100 text-blue-700 hover:bg-blue-200",
  },
  talk: {
    active: "bg-green-600 text-white",
    inactive: "bg-green-100 text-green-700 hover:bg-green-200",
  },
  networking: {
    active: "bg-orange-600 text-white",
    inactive: "bg-orange-100 text-orange-700 hover:bg-orange-200",
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

  const filtered =
    selected === "All"
      ? events
      : events.filter((e) => e.category === selected);

  return (
    <div>
      {/* FILTER BUTTONS */}
      <div className="flex gap-3 flex-wrap mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors capitalize ${
              selected === cat
                ? filterStyles[cat as keyof typeof filterStyles].active
                : filterStyles[cat as keyof typeof filterStyles].inactive
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-400 mb-6">
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
              className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${style.bg} ${style.text}`}
                >
                  {event.category}
                </span>
              </div>

              <h3 className="text-base font-semibold text-gray-900 mb-2 leading-snug">
                {event.title}
              </h3>

              <div className="flex flex-col gap-1 mb-3">
                <p className="text-sm text-gray-500">
                  📆 {formatDate(event.date)}
                </p>
                <p className="text-sm text-gray-500">
                  📍 {event.location}
                </p>
              </div>

              <p className="text-sm text-gray-600 line-clamp-3 flex-1">
                {event.description}
              </p>

              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  {event.organiser}
                </span>
                <span className="text-sm font-medium text-blue-600">
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