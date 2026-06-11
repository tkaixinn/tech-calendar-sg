import { events } from "@/data/events";
import EventsGrid from "@/components/EventsGrid";
import PlasmicBanner from "@/components/PlasmicBanner";

export default function Home() {
  const marqueeItems = [
    "Hackathons",
    "Workshops",
    "Talks",
    "Networking",
    "AI Builders",
    "Startup Nights",
    "Developer Meetups",
    "Singapore Tech Community",
  ];

  const upcomingEvents = events
    .filter((event) => new Date(event.date) >= new Date("2026-06-11"))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const nextEvent = upcomingEvents[0];
  const categories = Array.from(new Set(upcomingEvents.map((event) => event.category)));

  return (
    <main className="min-h-screen overflow-hidden bg-[#fbf7f1] text-slate-900">
      <div className="pointer-events-none fixed inset-0 noise-overlay opacity-[0.22] mix-blend-multiply" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_transparent_35%),radial-gradient(circle_at_75%_18%,_rgba(194,151,108,0.14),_transparent_28%),radial-gradient(circle_at_20%_80%,_rgba(148,163,184,0.12),_transparent_30%)]" />

      <nav className="sticky top-0 z-20 border-b border-stone-200/80 bg-[#fbf7f1]/90 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <span className="text-xl font-semibold tracking-tight text-slate-900">
            Tech Calendar SG
          </span>

        </div>
      </nav>

      <section className="relative px-6 pb-14 pt-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 overflow-hidden rounded-full border border-stone-200 bg-white/90 shadow-sm">
            <div className="animate-marquee flex w-[200%] items-center gap-10 whitespace-nowrap py-3 text-sm font-medium text-stone-700">
              {[...marqueeItems, ...marqueeItems].map((item, index) => (
                <span key={`${item}-${index}`} className="inline-flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shadow-[0_0_16px_rgba(194,151,108,0.75)]" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-800 shadow-sm">
                Singapore Tech Community
              </div>

              <h1 className="max-w-3xl text-5xl font-semibold leading-[0.95] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
                Tech events in Singapore,
                <span className="mt-3 block text-transparent bg-gradient-to-r from-amber-700 via-stone-600 to-slate-500 bg-clip-text">
                  all in one place.
                </span>
              </h1>

              <p className="max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl">
                Hackathons, workshops, talks and networking events, curated from
                across the web so you never miss what&apos;s happening.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="/submit"
                  className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  Submit an event
                </a>
                <a
                  href="#events"
                  className="rounded-full border border-stone-300 bg-white/75 px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition-colors hover:bg-white"
                >
                  Explore the lineup
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-[2rem] border border-stone-200 bg-white/90 p-6 shadow-[0_20px_80px_rgba(120,113,108,0.12)]">
                <div className="border-b border-stone-200 pb-4">
                  <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Singapore Tech Events</p>
                      <p className="mt-1 text-lg font-semibold text-slate-950">Tech Calendar SG</p>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-stone-200 bg-[#fbf7f1] p-4">
                    <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Total events</p>
                      <p className="mt-3 text-3xl font-semibold text-slate-950">{upcomingEvents.length}</p>
                      <p className="mt-2 text-sm text-slate-700">events currently listed and coming up soon</p>
                  </div>
                  <div className="rounded-2xl border border-stone-200 bg-white p-4">
                      <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Next up</p>
                      <p className="mt-3 text-sm font-semibold text-slate-950">{nextEvent?.title}</p>
                      <p className="mt-1 text-sm text-slate-700">
                        {nextEvent ? new Date(nextEvent.date).toLocaleDateString("en-SG", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }) : "No upcoming event"}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">{nextEvent?.location}</p>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-stone-200 bg-[#f6efe5] p-4">
                    <div className="flex items-center justify-between text-sm text-slate-800">
                      <span>Upcoming soon!</span>
                      <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-stone-700">
                        {upcomingEvents.slice(0, 3).length}
                      </span>
                    </div>
                    <div className="mt-3 space-y-3">
                      {upcomingEvents.slice(0, 3).map((event) => (
                        <div key={event.slug} className="flex items-start justify-between gap-4 text-sm">
                          <div>
                            <p className="font-medium text-slate-950">{event.title}</p>
                            <p className="mt-0.5 text-slate-700">{event.location}</p>
                          </div>
                          <p className="shrink-0 text-xs text-stone-600">
                            {new Date(event.date).toLocaleDateString("en-SG", {
                              day: "numeric",
                              month: "short",
                            })}
                          </p>
                        </div>
                      ))}
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="events" className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <EventsGrid events={events} />
        </div>
      </section>

      <PlasmicBanner />

      <footer className="border-t border-stone-200 px-6 py-8 mt-8 text-slate-500">
        <div className="mx-auto flex max-w-6xl items-center justify-between text-sm">
          <span>Tech Calendar SG</span>
          <span>Curating Singapore&apos;s tech events</span>
        </div>
      </footer>
    </main>
  );
}