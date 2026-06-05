import { events } from "@/data/events";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-SG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const categoryStyles: Record<
  string,
  { bg: string; text: string }
> = {
  hackathon: { bg: "bg-purple-100", text: "text-purple-700" },
  workshop: { bg: "bg-blue-100", text: "text-blue-700" },
  talk: { bg: "bg-green-100", text: "text-green-700" },
  networking: { bg: "bg-orange-100", text: "text-orange-700" },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* NAV */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            📅 Tech Calendar SG
          </span>

          <a
            href="/submit"
            className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            + Submit Event
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-white border-b border-gray-200 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <p className="text-blue-600 font-medium text-sm uppercase tracking-widest mb-3">
            Singapore Tech Community
          </p>

          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Tech events in Singapore,<br />all in one place.
          </h1>

          <p className="text-gray-500 text-lg max-w-xl">
            Hackathons, workshops, talks and networking events — curated from across the web so you never miss what's happening.
          </p>
        </div>
      </section>

      {/* EVENTS GRID */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm text-gray-400 mb-6">
            {events.length} upcoming events
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => {
              const style = categoryStyles[event.category];

              return (
                <a
                  key={event.slug}
                  href={`/events/${event.slug}`}
                  className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {/* CATEGORY */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${style.bg} ${style.text}`}
                    >
                      {event.category}
                    </span>
                  </div>

                  {/* TITLE */}
                  <h3 className="text-base font-semibold text-gray-900 mb-2 leading-snug">
                    {event.title}
                  </h3>

                  {/* META */}
                  <div className="flex flex-col gap-1 mb-3">
                    <p className="text-sm text-gray-500">
                      📆 {formatDate(event.date)}
                    </p>
                    <p className="text-sm text-gray-500">
                      📍 {event.location}
                    </p>
                  </div>

                  {/* DESCRIPTION */}
                  <p className="text-sm text-gray-600 line-clamp-3 flex-1">
                    {event.description}
                  </p>

                  {/* FOOTER */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {event.organiser}
                    </span>
                    <span className="text-sm font-medium text-blue-600">
                      View Details →
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 px-6 py-8 mt-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-gray-400">
          <span>📅 Tech Calendar SG</span>
          <span>Curating Singapore tech events</span>
        </div>
      </footer>
    </main>
  );
}