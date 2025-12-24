import { Link } from "react-router-dom";

const stats = [
  { label: "Events coordinated", value: "4,500+" },
  { label: "Cities covered", value: "32" },
  { label: "Avg. satisfaction", value: "4.9/5" },
  { label: "Team productivity boost", value: "3x" },
];

const highlights = [
  {
    title: "Plan with clarity",
    description: "Design timelines, allocate owners, and visualize the impact of every decision from one control room.",
  },
  {
    title: "Delight every guest",
    description: "Automated invites, smart reminders, and in-the-moment notifications keep attendees informed and excited.",
  },
  {
    title: "Measure what matters",
    description: "Track budgets, RSVPs, vendor KPIs, and post-event insights so the next event is always the best one yet.",
  },
];

const timeline = [
  { step: "Ideate", detail: "Collect requirements, set goals, and align stakeholders in minutes." },
  { step: "Organize", detail: "Assign tasks, schedule rehearsals, and design immersive experiences." },
  { step: "Launch", detail: "Monitor live progress with real-time alerts and on-site checklists." },
  { step: "Celebrate", detail: "Capture feedback, share memories, and instantly kickstart the next big moment." },
];

const previewStats = [
  { label: "Total Events", value: 14, change: "+100.0% from last month", accent: "from-blue-500/80 to-blue-400/80" },
  { label: "Upcoming Events", value: 1, change: "+0.0% from last month", accent: "from-emerald-500/80 to-emerald-400/80" },
  { label: "Past Events", value: 13, change: "+0.0% from last month", accent: "from-purple-500/80 to-purple-400/80" },
  { label: "This Month", value: 1, change: "+100.0% from last month", accent: "from-orange-500/80 to-amber-400/80" },
];

const previewActivities = [
  { label: 'Registered for "an event"', time: "16 hours ago" },
  { label: 'Created "check"', time: "16 hours ago" },
  { label: 'Created "Past Event"', time: "66 days ago" },
  { label: 'Created "Test Event"', time: "66 days ago" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#0b1224] to-[#030712]" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-indigo-600/30 via-blue-500/20 to-transparent blur-[160px]" />
        <div className="absolute -top-20 left-20 h-64 w-64 rounded-full bg-cyan-400/30 blur-[120px]" />

        <section className="relative max-w-6xl mx-auto px-6 pt-24 pb-20 grid gap-16 lg:grid-cols-[1.1fr,0.9fr] items-center">
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.5em] text-blue-100">
              Premium suite
            </span>
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
                A cinematic command center for show-stopping events.
              </h1>
              <p className="text-lg text-gray-300">
                From the first spark of an idea to the final standing ovation, EventManager keeps every vendor, guest, and checklist aligned inside a serene workspace.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {["Live dashboards", "Vendor radar", "Smart guest flows"].map((chip) => (
                <span
                  key={chip}
                  className="text-sm text-white/80 rounded-full border border-white/15 bg-white/5 px-4 py-1.5"
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className="space-y-4">
              <Link
                to="/auth"
                className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-8 py-3 text-base font-semibold text-white shadow-[0_15px_45px_rgba(99,102,241,0.35)] hover:-translate-y-0.5 transition"
              >
                Get Started
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <p className="text-sm text-gray-400">No credit card · Collaborators unlimited · Cancel anytime</p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-6 -right-6 h-28 w-28 rounded-full bg-purple-500/30 blur-3xl" />
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl shadow-indigo-900/40 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-300">Live event health</p>
                  <p className="text-3xl font-semibold text-white">98%</p>
                </div>
                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
                  +12% today
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-4">
                    <p className="text-xl font-semibold text-white">{item.value}</p>
                    <p className="text-xs text-gray-300">{item.label}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-sm text-gray-300 mb-2">This week</p>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-16 rounded-xl bg-gradient-to-r from-blue-500/60 to-cyan-400/60 blur-[1px]" />
                  <div>
                    <p className="text-2xl font-semibold">24</p>
                    <p className="text-xs text-gray-400">Milestones cleared</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <p className="text-blue-300 uppercase tracking-[0.3em] text-xs">Why leaders choose us</p>
          <h2 className="text-3xl md:text-4xl font-semibold">A calm, confident flow from idea to encore.</h2>
          <p className="text-gray-300">
            Whether you serve intimate gatherings or large-scale summits, EventManager turns chaos into choreography with automation,
            collaborative checklists, and live dashboards.
          </p>
        </div>
        <div className="grid gap-4">
          {highlights.map((item) => (
            <div key={item.title} className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="text-gray-300 text-sm mt-2">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="flex flex-col gap-6 mb-10">
          <p className="text-blue-200 uppercase tracking-[0.35em] text-xs">Live preview</p>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <h2 className="text-3xl md:text-4xl font-semibold text-white">See the command center in action.</h2>
              <p className="text-gray-300">
                This is exactly how the dashboard greets your team—spot key metrics instantly, skim upcoming events, and inspect the most recent activities without switching tabs.
              </p>
            </div>
            <Link
              to="/auth"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-2 text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              Launch live workspace
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-blue-900/40 overflow-hidden">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-white/10 bg-white/5">
            {["#FF5F57", "#FEBE2E", "#28C840"].map((color) => (
              <span
                key={color}
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: color }}
              />
            ))}
            <p className="text-xs text-white/60 uppercase tracking-[0.4em] ml-4">EventManager Live</p>
          </div>

          <div className="px-6 md:px-10 py-10 bg-[#f4f6fb] text-gray-900">
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="text-2xl font-semibold text-blue-600">EventManager</span>
              <div className="flex gap-6 text-sm text-gray-600">
                <span className="font-medium text-gray-900">Overview</span>
                <span>Events</span>
                <span>Profile</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8 space-y-8">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wide">Dashboard snapshot</p>
                <h3 className="text-3xl font-semibold text-gray-900">Welcome back, Aryan</h3>
                <p className="text-gray-500 text-sm">Here&apos;s what&apos;s happening with your events.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {previewStats.map((preview) => (
                  <div key={preview.label} className="rounded-2xl border border-gray-100 bg-slate-50/80 p-4 shadow-sm">
                    <div className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-br ${preview.accent} text-white mb-3 p-2`}>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                      </svg>
                    </div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{preview.label}</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-2">{preview.value}</p>
                    <p className="text-xs text-emerald-500 mt-1">{preview.change}</p>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <p className="font-semibold text-gray-900">Upcoming Events</p>
                    <button className="text-sm text-blue-600 font-semibold">View all</button>
                  </div>
                  <div className="rounded-2xl border border-gray-200 p-4 space-y-2">
                    <p className="text-gray-900 font-semibold">Check</p>
                    <div className="flex items-center text-sm text-gray-500 gap-4">
                      <span role="img" aria-label="calendar">
                        📅
                      </span>
                      <span>29/11/2025 · 01:27</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-xs uppercase tracking-wide bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                        Medium
                      </span>
                      <span className="text-xs uppercase tracking-wide bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                        Personal
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="font-semibold text-gray-900 mb-4">Recent Activity</p>
                  <div className="space-y-3">
                    {previewActivities.map((activity) => (
                      <div key={activity.label} className="flex items-start gap-3">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 mt-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{activity.label}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="mt-4 text-sm font-semibold text-blue-600">Load more activities</button>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <span className="text-xs uppercase tracking-[0.4em] text-gray-400">Live preview</span>
                <span className="text-xs text-gray-500">Interactive cards · Real metrics · Adaptive layout</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#0b1120] to-[#030712] p-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
            <div>
              <p className="text-blue-300 text-xs uppercase tracking-[0.3em]">Your playbook</p>
              <h2 className="text-3xl font-semibold mt-2">Every milestone, mapped.</h2>
            </div>
            <Link
              to="/auth"
              className="px-6 py-2 rounded-full border border-white/20 text-sm text-white hover:bg-white/10 transition"
            >
              Start orchestrating
            </Link>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {timeline.map((item, index) => (
              <div key={item.step} className="p-5 rounded-2xl bg-white/5 border border-white/5 relative">
                <span className="text-sm text-blue-200 tracking-[0.3em]">0{index + 1}</span>
                <h3 className="text-xl font-semibold text-white mt-3">{item.step}</h3>
                <p className="text-gray-300 text-sm mt-2">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-gradient-to-b from-transparent to-[#01030a]">
        <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.5em] text-blue-200">Stay inspired</p>
            <h3 className="text-2xl font-semibold text-white">Events that feel timeless, crafted with clarity.</h3>
            <p className="text-gray-400 text-sm max-w-md">
              Designed & developed by Divyansh with a focus on detail, calm interactions, and expressive gradients that mirror modern experiences.
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-4">
            <Link
              to="/auth"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-2 text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              Start planning
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">
              Designed & Developed by Divyansh
            </p>
            <div className="flex gap-3 text-white/70">
              {["Strategy", "Design", "Engineering"].map((tag) => (
                <span key={tag} className="text-[11px] border border-white/20 rounded-full px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

