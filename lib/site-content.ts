export type PressItem = {
  id: string
  outlet: string
  title: string
  date: string
  summary: string
  href: string
  language: "en" | "ko" | "es" | "zh"
  featured?: boolean
  tag?: "breaking" | "legal" | "community" | "editorial"
}

export type Milestone = {
  id: string
  date: string
  title: string
  summary: string
  href?: string
}

export type ActionItem = {
  id: string
  title: string
  summary: string
  href: string
  external?: boolean
}

/** Curated press — quality over quantity. Old WP site has hundreds; we keep ~20 that matter. */
export const curatedPress: PressItem[] = [
  {
    id: "la-times-decert",
    outlet: "LA Times",
    title: "LAPD officers could lose certification over out-of-policy shooting",
    date: "May 2, 2026",
    summary:
      "California POST opened decertification review of officers involved — a first for LAPD in a case like Yong's.",
    href: "https://www.latimes.com/california/story/2026-05-02/lapd-officers-could-lose-certification-over-improper-shooting",
    language: "en",
    featured: true,
    tag: "breaking",
  },
  {
    id: "la-local-he-needed-help",
    outlet: "LA Local News",
    title: "He needed help: Yong Yang's family continues fight for reform",
    date: "May 7, 2026",
    summary:
      "Two years after LAPD killed Yong during a mental health crisis at his parents' Koreatown home, his family pushes for systemic change.",
    href: "https://justiceforyongyang.com/news-english/la-local-he-needed-help-yong-yangs-family-continues-fight-for-reform-2-years-after-he-was-fatally-shot-by-lapd/",
    language: "en",
    featured: true,
    tag: "community",
  },
  {
    id: "koreadaily-da-review",
    outlet: "Korea Daily",
    title: "LA County DA says Yong Yang case will be reviewed second by second",
    date: "May 7, 2026",
    summary:
      "DA Nathan Hochman told Korean community leaders his office will analyze the shooting frame by frame before deciding on charges.",
    href: "https://justiceforyongyang.com/news-english/koreadailyus-la-county-da-says-yong-yang-shooting-case-will-be-reviewed-second-by-second/",
    language: "en",
    featured: true,
    tag: "legal",
  },
  {
    id: "asamnews-vigil",
    outlet: "AsAmNews",
    title: "Vigil marks 2nd anniversary of LA fatal police shooting",
    date: "May 1, 2026",
    summary:
      "Community vigil at federal courthouse as Police Commission found officers followed procedure — family and advocates reject that finding.",
    href: "https://justiceforyongyang.com/language/in-english/asamnews-korean-american-vigil-to-mark-2nd-anniversary-of-la-fatal-police-shooting/",
    language: "en",
    tag: "community",
  },
  {
    id: "koreadaily-vr-training",
    outlet: "Korea Daily",
    title: "After Yong Yang case, Olympic Division adopts VR de-escalation training",
    date: "May 14, 2026",
    summary:
      "LAPD Olympic station — where Yong was killed — introduced virtual reality training months after the shooting drew national scrutiny.",
    href: "https://justiceforyongyang.com/news-korean/the-korea-daily-korean/korea-daily-%ec%96%91%ec%9a%a9-%ec%82%ac%ea%b1%b4-%ed%9b%84-%eb%92%a4%eb%8a%a6%ec%9d%80-%ea%b0%80%ec%83%81%ed%98%84%ec%8b%a4-%ed%9b%88%eb%a0%a8-%ec%8b%9c%ec%8a%a4%ed%85%9c-%eb%8f%84%ec%9e%85/",
    language: "ko",
    tag: "breaking",
  },
  {
    id: "koreadaily-post-review",
    outlet: "Korea Daily",
    title: "First POST decertification review of LAPD officers in mental health shooting",
    date: "May 4, 2026",
    summary:
      "California's Peace Officer Standards & Training commission is reviewing whether officers should lose their badges.",
    href: "https://justiceforyongyang.com/news-korean/the-korea-daily-korean/korea-daily-%ec%9a%b0%eb%a6%ac-%ec%95%84%eb%93%a4-%ec%95%88%ed%83%80%ea%b9%8c%ec%9a%b4-%ec%a3%bd%ec%9d%8c-%eb%a7%88%ec%a7%80%eb%a7%89%ec%9d%b4%ea%b8%b8-2/",
    language: "ko",
    tag: "legal",
  },
  {
    id: "korea-times-2nd-anniversary",
    outlet: "Korea Times",
    title: "No more innocent lives lost to police shootings",
    date: "May 4, 2026",
    summary:
      "Family filed additional civil rights claims as the two-year mark passed with no criminal charges against the officer who fired.",
    href: "https://justiceforyongyang.com/language/in-korean/korea-times-%ea%b2%bd%ec%b0%b0-%ec%b4%9d%ea%b2%a9%ec%97%90-%eb%ac%b4%ea%b3%a0%ed%95%9c-%ed%9d%ac%ec%83%9d-%eb%8d%94-%ec%9d%b4%ec%83%81-%eb%90%98%ed%92%80%ec%9d%b4-%ec%95%88-%eb%90%9c/",
    language: "ko",
    tag: "community",
  },
  {
    id: "chosun-hochman-townhall",
    outlet: "Chosun Daily",
    title: "DA Hochman meets Korean community on Yong Yang case",
    date: "May 13, 2026",
    summary:
      "Town hall at LA Korean Cultural Center — first time the DA publicly addressed the case two years after the killing.",
    href: "https://justiceforyongyang.com/language/in-korean/chosun-daily-%ea%b2%bd%ea%b4%80%ec%b4%9d%ea%b2%a9-%ec%b2%98%eb%b2%8c-%ec%95%88%ed%95%b4-vs-%eb%ac%b4%eb%b9%84%ed%8c%90%ec%a0%81-%eba%b4%88%ec%a3%84%eb%b6%80-%ec%97%86%eb%8b%a4/",
    language: "ko",
    tag: "legal",
  },
  {
    id: "koreadaily-2nd-rally",
    outlet: "Korea Daily",
    title: "Justice for Yong Yang — two-year memorial rally at LA federal courthouse",
    date: "May 7, 2026",
    summary:
      "Family, police violence survivors, and civil rights groups gathered to demand LAPD accountability.",
    href: "https://justiceforyongyang.com/news-english/koreadailyus-yang-yong-shooting-case-protest-demands-justice-2/",
    language: "en",
    tag: "community",
  },
  {
    id: "koreadaily-snuaa",
    outlet: "Korea Daily",
    title: "Seoul National University alumni join call for justice",
    date: "May 5, 2026",
    summary:
      "SNU alumni association and Korean community organizations expand the coalition demanding police reform.",
    href: "https://justiceforyongyang.com/news-korean/the-korea-daily-korean/korea-daily-%ec%96%91%ec%9a%a9-2%ec%a3%bc%ea%b8%b0-%ec%84%9c%ec%b8%8c%eb%8c%80-%eb%8f%99%eb%ac%b8-%eb%82%98%ec%84%ac%eb%8b%a4%eb%88%84%ea%b5%ac%eb%82%98-%ea%b2%aa%uc%9d%84-%ec%88%98-2/",
    language: "ko",
    tag: "community",
  },
]

/** Parents' and family's public advocacy — accomplishments worth highlighting. */
export const familyMilestones: Milestone[] = [
  {
    id: "federal-lawsuit",
    date: "January 2026",
    title: "Federal civil rights lawsuit filed",
    summary:
      "Family filed 2:26-cv-01014 in U.S. District Court — a new front in the fight for accountability.",
    href: "/legal/federal-lawsuit",
  },
  {
    id: "bodycam-release",
    date: "March 2025",
    title: "Body camera footage released",
    summary:
      "Family won petition 24STCP02107 — forcing LAPD to release footage that shows what really happened.",
    href: "/what-happened#bodycam",
  },
  {
    id: "apa-conference",
    date: "May 2025",
    title: "Presented at APA Annual Conference",
    summary:
      "Parents spoke at the American Psychiatric Association on crisis response and police violence — \"Why Did You Shoot Them?\"",
    href: "/community#advocacy",
  },
  {
    id: "police-commission",
    date: "April 2025",
    title: "Addressed LA Police Commission",
    summary:
      "Family and community members testified before the Police Commission demanding accountability.",
    href: "/community#advocacy",
  },
  {
    id: "city-council",
    date: "September 2024",
    title: "LA City Council tribute",
    summary:
      "Los Angeles City Council held an official tribute to Yong Yang — recognition at the highest city level.",
    href: "/community#advocacy",
  },
  {
    id: "four-rallies",
    date: "June–September 2024",
    title: "Four major community rallies",
    summary:
      "From Liberty Park in Koreatown to LA City Hall — thousands marched for justice.",
    href: "/community",
  },
  {
    id: "press-conference",
    date: "May 2024",
    title: "Press conference with Korean American Federation",
    summary:
      "Days after Yong's death, family organized with KAF to bring national Korean-American media attention.",
    href: "/community#advocacy",
  },
  {
    id: "amhp-tribute",
    date: "May 2024",
    title: "Asian Mental Health Project tribute",
    summary:
      "Community mental health advocates held a rooftop tribute connecting Yong's death to systemic failures.",
    href: "/community#advocacy",
  },
]

export const getInvolvedActions: ActionItem[] = [
  {
    id: "share-timeline",
    title: "Share the timeline",
    summary:
      "Most people have never seen what happened minute by minute. Send them to the interactive timeline.",
    href: "/timeline",
  },
  {
    id: "watch-bodycam",
    title: "Watch the body camera footage",
    summary:
      "LAPD released footage after the family's legal petition. See what the officers did — and didn't do.",
    href: "/what-happened#bodycam",
  },
  {
    id: "join-events",
    title: "Join a rally or vigil",
    summary:
      "The community continues to organize. Check upcoming events and show up in person.",
    href: "/community",
  },
  {
    id: "support-ab572",
    title: "Support AB572",
    summary:
      "California legislation for police accountability and mental health crisis response reform.",
    href: "/get-involved#ab572",
  },
  {
    id: "youtube",
    title: "Subscribe on YouTube",
    summary:
      "Rally footage, press conferences, and community statements — follow @JusticeForYongYang.",
    href: "https://www.youtube.com/@JusticeForYongYang",
    external: true,
  },
  {
    id: "nonprofit",
    title: "Foundation coming soon",
    summary:
      "We are forming a nonprofit in Yong's name. Contact us to stay informed about launch and ways to give.",
    href: "/get-involved#foundation",
  },
]

export const siteFacts = [
  {
    label: "Seconds from arrival to shots",
    value: "~8",
    detail: "Officers fired within seconds of entering the apartment.",
  },
  {
    label: "Active legal cases",
    value: "3",
    detail: "State petition, state lawsuit, and federal civil rights case.",
  },
  {
    label: "Bodycam released",
    value: "2025",
    detail: "Family compelled release through court petition 24STCP02107.",
  },
]

export const featuredPress = curatedPress.filter((p) => p.featured)

export const pressByLanguage = {
  en: curatedPress.filter((p) => p.language === "en"),
  ko: curatedPress.filter((p) => p.language === "ko"),
  es: curatedPress.filter((p) => p.language === "es"),
  zh: curatedPress.filter((p) => p.language === "zh"),
}
