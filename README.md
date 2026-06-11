# Tech Calendar SG
A curated aggregator of tech events in Singapore: hackathons, workshops, talks, and networking events, all in one place.
**Live site:** https://tech-calendar-sg.vercel.app

## About
Tech Calendar SG was built to solve a simple problem: Singapore’s tech events are scattered across various organiser pages. This site brings them together in a clean, filterable interface so you can easily keep track of what’s happening in the local tech community.

## Features
- Browse upcoming Singapore tech events across 4 categories
- Filter events by category
- Click into any event for summarised details and a direct registration link
- Submit new events via an integrated submission form
- "Why Tech Calendar SG?" section built and managed in Plasmic, allowing non-technical collaborators to update content without touching code

## Tech Stack
- **Next.js** — App Router, dynamic routing for event detail pages, server and client components
- **TypeScript** — Typed data models and component props throughout
- **Tailwind CSS** — Utility-first styling with responsive layout
- **React** — Client-side interactivity including category filtering with useState
- **Plasmic** — Visual CMS used to build the TechCalendarBanner component, enabling non-technical team members to update content independently
- **Formspree** — Form submissions routed to email for event review

## Notes 
Events are currently statically defined for reliability and fast load times. In a future iteration, this would connect to a database to allow dynamic event management.