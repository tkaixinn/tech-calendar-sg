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
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-gray-900">
            📅 Tech Calendar SG
          </a>

          <a
            href="/submit"
            className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            + Submit Event
          </a>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <a
          href="/"
          className="text-sm text-blue-600 hover:underline mb-6 inline-block"
        >
          ← Back to all events
        </a>

        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <span
            className={`text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${style.bg} ${style.text}`}
          >
            {event.category}
          </span>

          <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-4">
            {event.title}
          </h1>

          <div className="flex flex-col gap-2 mb-6">
            <p className="text-sm text-gray-500">
              📆 {formatDate(event.date)}
            </p>
            <p className="text-sm text-gray-500">
              📍 {event.location}
            </p>
            <p className="text-sm text-gray-500">
              🏢 {event.organiser}
            </p>
          </div>

          <p className="text-gray-700 leading-relaxed mb-8">
            {event.description}
          </p>

          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Register / View Event →
          </a>
        </div>
      </div>

      <footer className="border-t border-gray-200 px-6 py-8 mt-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-gray-400">
          <span>📅 Tech Calendar SG</span>
          <span>Curating Singapore tech events</span>
        </div>
      </footer>
    </main>
  );
}