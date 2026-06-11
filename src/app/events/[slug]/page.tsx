import { events } from "@/data/events";
import { notFound } from "next/navigation";

const categoryStyles: Record<string, { bg: string; text: string }> = {
  hackathon: { bg: "bg-purple-100", text: "text-purple-700" },
  workshop: { bg: "bg-blue-100", text: "text-blue-700" },
  talk: { bg: "bg-green-100", text: "text-green-700" },
  networking: { bg: "bg-orange-100", text: "text-orange-700" },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-SG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);

  if (!event) return notFound();

  const style = categoryStyles[event.category];

  return (
    <main className="min-h-screen bg-[#fbf7f1] text-slate-900">
      <nav className="sticky top-0 z-20 border-b border-stone-200/80 bg-[#fbf7f1]/90 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a href="/" className="text-xl font-semibold tracking-tight text-slate-900">
            Tech Calendar SG
          </a>

          <a
            href="/submit"
            className="rounded-full border border-stone-300 bg-white/80 px-4 py-2 text-sm font-medium text-slate-800 shadow-sm transition-colors hover:bg-white"
          >
            + Submit Event
          </a>
        </div>
      </nav>

      <div className="mx-auto max-w-3xl px-6 py-12">
        <a
          href="/"
          className="mb-6 inline-block text-sm text-slate-700 hover:text-slate-950"
        >
          ← Back to all events
        </a>

        <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-[0_18px_50px_rgba(120,113,108,0.08)]">
          <span
            className={`text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${style.bg} ${style.text}`}
          >
            {event.category}
          </span>

          <h1 className="mt-4 mb-4 text-2xl font-bold text-slate-950">
            {event.title}
          </h1>

          <div className="flex flex-col gap-2 mb-6">
            <p className="text-sm text-slate-700">
              📆 {formatDate(event.date)}
            </p>
            <p className="text-sm text-slate-700">
              📍 {event.location}
            </p>
            <p className="text-sm text-slate-700">
              🏢 {event.organiser}
            </p>
          </div>

          <p className="mb-8 leading-relaxed text-slate-700">
            {event.description}
          </p>

          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-slate-950 px-6 py-3 font-medium text-white transition-transform hover:-translate-y-0.5"
          >
            Register / View Event →
          </a>
        </div>
      </div>

      <footer className="mt-8 border-t border-stone-200 px-6 py-8 text-slate-500">
        <div className="mx-auto flex max-w-6xl items-center justify-between text-sm">
          <span>📅 Tech Calendar SG</span>
          <span>Curating Singapore's tech events</span>
        </div>
      </footer>
    </main>
  );
}