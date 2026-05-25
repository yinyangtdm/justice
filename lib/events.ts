export type Event = {
  slug: string;
  date: string;
  year: number;
  title: string;
  location: string;
  desc: string;
};

export const events: Event[] = [
  {
    slug: "2025-apa-annual-conference",
    date: "May 20, 2025",
    year: 2025,
    title: "APA Annual Conference — 'Why Did You Shoot Them?'",
    location: "Los Angeles",
    desc: "Presentation at the American Psychiatric Association annual conference addressing mental health crisis response and police violence.",
  },
  {
    slug: "2025-04-la-police-commission",
    date: "April 8, 2025",
    year: 2025,
    title: "LA Board of Police Commission",
    location: "Los Angeles City Hall",
    desc: "Community members addressed the LA Police Commission demanding accountability.",
  },
  {
    slug: "2024-09-la-city-council-tribute",
    date: "September 17, 2024",
    year: 2024,
    title: "LA City Council Tribute to Yong Yang",
    location: "Los Angeles City Hall",
    desc: "The Los Angeles City Council held a tribute to Yong Yang.",
  },
  {
    slug: "2024-09-4th-rally",
    date: "September 17, 2024",
    year: 2024,
    title: "4th Rally — LA City Hall / Parker Center / LADT",
    location: "Los Angeles",
    desc: "The fourth major public rally demanding justice.",
  },
  {
    slug: "2024-07-3rd-rally",
    date: "July 28, 2024",
    year: 2024,
    title: "3rd Rally — Liberty Park, Koreatown",
    location: "Koreatown, Los Angeles",
    desc: "Third community rally held in Liberty Park.",
  },
  {
    slug: "2024-07-2nd-rally",
    date: "July 11, 2024",
    year: 2024,
    title: "2nd Rally — Behind DMH, Koreatown",
    location: "Koreatown, Los Angeles",
    desc: "Second rally organized by the community near the Department of Mental Health.",
  },
  {
    slug: "2024-06-burial",
    date: "June 5, 2024",
    year: 2024,
    title: "Yong's Burial",
    location: "Los Angeles",
    desc: "Memorial service and burial for Yong Yang.",
  },
  {
    slug: "2024-06-1st-rally",
    date: "June 2, 2024",
    year: 2024,
    title: "1st Rally — Liberty Park, Koreatown",
    location: "Koreatown, Los Angeles",
    desc: "The first community rally demanding justice for Yong Yang.",
  },
  {
    slug: "2024-05-farewell",
    date: "May 30, 2024",
    year: 2024,
    title: "Yong's Farewell Service",
    location: "Los Angeles",
    desc: "Public farewell service for Yong Yang.",
  },
  {
    slug: "2024-05-tribute-amhp",
    date: "May 19, 2024",
    year: 2024,
    title: "Tribute — Asian Mental Health Project",
    location: "California Market Rooftop, Los Angeles",
    desc: "Tribute event organized by the Asian Mental Health Project.",
  },
  {
    slug: "2024-05-press-conference",
    date: "May 9, 2024",
    year: 2024,
    title: "Press Conference — KAF",
    location: "Los Angeles",
    desc: "Press conference organized with Korean American Federation.",
  },
];

export const VALID_YEARS = [2024, 2025, 2026] as const;
export type ValidYear = (typeof VALID_YEARS)[number];
