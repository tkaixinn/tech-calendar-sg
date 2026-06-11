import { events } from "@/data/events";
import EventsGrid from "@/components/EventsGrid";
import PlasmicBanner from "@/components/PlasmicBanner";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
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

      <section className="bg-white border-b border-gray-200 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <p className="text-blue-600 font-medium text-sm uppercase tracking-widest mb-3">
            Singapore Tech Community
          </p>

          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Tech events in Singapore,
            <br />
            all in one place.
          </h1>

          <p className="text-gray-500 text-lg max-w-xl">
            Hackathons, workshops, talks and networking events, curated from
            across the web so you never miss what's happening.
          </p>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <EventsGrid events={events} />
        </div>
      </section>

      <PlasmicBanner />

      <footer className="border-t border-gray-200 px-6 py-8 mt-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-gray-400">
          <span>📅 Tech Calendar SG</span>
          <span>Curating Singapore's tech events</span>
        </div>
      </footer>
    </main>
  );
}