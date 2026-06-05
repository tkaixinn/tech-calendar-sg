export type EventCategory = "hackathon" | "workshop" | "talk" | "networking";

export interface Event {
  slug: string;
  title: string;
  date: string;
  location: string;
  category: EventCategory;
  description: string;
  organiser: string;
  link: string;
}