"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavLeaf = {
  label: string;
  href: string;
  subtitle?: string;
  badge?: string;
  featured?: boolean;
};

type NavSection = {
  label?: string;
  items: NavLeaf[];
};

type NavItem = {
  label: string;
  href: string;
  sections?: NavSection[];
  columns?: NavSection[][];
};

const nav: NavItem[] = [
  {
    label: "Yong Yang",
    href: "/yong",
    sections: [
      {
        items: [
          { label: "Who was Yong?", href: "/yong", featured: true },
          { label: "Message from Yong", href: "/yong#message" },
          { label: "Daily prayers", href: "/yong#prayers" },
          { label: "Memories & videos", href: "/videos" },
          { label: "Art for Yong", href: "/art" },
        ],
      },
    ],
  },
  {
    label: "What happened",
    href: "/what-happened",
    sections: [
      {
        items: [
          { label: "How Yong was killed", href: "/what-happened#how", featured: true },
          { label: "Where it happened", href: "/what-happened#where", subtitle: "Parents' home, Koreatown" },
          { label: "Body camera footage", href: "/what-happened#bodycam", badge: "Released" },
          { label: "Evidence & oddities", href: "/what-happened#evidence" },
          { label: "Timeline", href: "/timeline" },
        ],
      },
    ],
  },
  {
    label: "Legal cases",
    href: "/legal",
    sections: [
      {
        label: "Active cases",
        items: [
          {
            label: "Federal lawsuit",
            href: "/legal/federal-lawsuit",
            featured: true,
            subtitle: "2:26-cv-01014 · filed Jan 2026",
          },
          {
            label: "CA civil lawsuit",
            href: "/legal/civil-lawsuit",
            subtitle: "24STCV24804 · filed Sep 2024",
          },
          {
            label: "Bodycam petition",
            href: "/legal/civil-petition",
            subtitle: "24STCP02107 · granted Mar 2025",
          },
        ],
      },
      {
        label: "Documents & law",
        items: [
          { label: "All court documents", href: "/legal" },
          { label: "AB572 legislation", href: "/references#ab572" },
          { label: "AB1506 law", href: "/references#ab1506" },
        ],
      },
    ],
  },
  {
    label: "Take action",
    href: "/events",
    sections: [
      {
        items: [{ label: "Upcoming events", href: "/events", featured: true }],
      },
      {
        label: "Past events",
        items: [
          { label: "2026 events", href: "/events#2026" },
          { label: "2025 events", href: "/events#2025" },
          { label: "2024 events", href: "/events#2024" },
        ],
      },
      {
        items: [
          { label: "Support AB572", href: "/references#ab572", badge: "Active" },
          { label: "Messages & voices", href: "/references#messages" },
        ],
      },
    ],
  },
  {
    label: "News",
    href: "/news",
    columns: [
      [
        {
          label: "English coverage",
          items: [
            { label: "All English news", href: "/news" },
            { label: "KABC 7 (ABC)", href: "/news#kabc" },
            { label: "KNBC 4 (NBC)", href: "/news#knbc" },
            { label: "Fox 11", href: "/news#fox11" },
            { label: "LA Times", href: "/news#latimes" },
            { label: "LAist / KPCC", href: "/news#laist" },
            { label: "Washington Post", href: "/news#wapo" },
            { label: "AsAmNews", href: "/news#asamnews" },
            { label: "Korea Daily (English)", href: "/news#koreadaily" },
          ],
        },
      ],
      [
        {
          label: "Other languages",
          items: [
            { label: "Korean 한국어", href: "/news#korean" },
            { label: "Spanish (Español)", href: "/news#spanish" },
            { label: "Mandarin (中文)", href: "/news#mandarin" },
          ],
        },
        {
          label: "Formats",
          items: [
            { label: "TV news & video", href: "/videos" },
            { label: "Talk shows & commentary", href: "/news#commentary" },
            { label: "Editorials", href: "/news#editorials" },
            { label: "Significant coverage", href: "/news#significant" },
          ],
        },
      ],
    ],
  },
  {
    label: "Resources",
    href: "/references",
    columns: [
      [
        {
          label: "Police accountability",
          items: [
            { label: "LAPD shooting incidents", href: "/references#lapd" },
            { label: "Similar cases", href: "/references#similar", subtitle: "Victoria Lee & others" },
            { label: "Statistics & data", href: "/references#stats" },
            { label: "The pattern: kill, justify, repeat", href: "/references#pattern" },
          ],
        },
        {
          label: "Laws",
          items: [
            { label: "AB572", href: "/references#ab572" },
            { label: "AB1506 (OIS unarmed)", href: "/references#ab1506" },
          ],
        },
      ],
      [
        {
          label: "Government",
          items: [
            { label: "Federal (US DOJ, courts)", href: "/references#federal" },
            { label: "California (CA DOJ, Assembly)", href: "/references#california" },
            { label: "Los Angeles (LAPD, DA, Council)", href: "/references#losangeles" },
            { label: "Korean government", href: "/references#korea" },
          ],
        },
        {
          label: "Organizations",
          items: [
            { label: "Asian Mental Health Project", href: "/references#amhp" },
            { label: "APA", href: "/references#apa" },
            { label: "Korean Consulate – LA", href: "/references#consulate" },
            { label: "SNUAA / OBA", href: "/references#snuaa" },
          ],
        },
      ],
    ],
  },
];

function DropLeaf({ item, onClose }: { item: NavLeaf; onClose: () => void }) {
  return (
    <Link
      href={item.href}
      onClick={onClose}
      className={`block px-3 py-2 rounded text-sm leading-snug transition-colors ${
        item.featured
          ? "text-foreground font-medium hover:bg-[#2a2520]"
          : "text-[#a09880] hover:bg-[#2a2520] hover:text-foreground"
      }`}
    >
      <span className="flex items-center gap-2">
        {item.label}
        {item.badge && (
          <span className="text-[10px] px-1.5 py-px rounded bg-sky-500/15 text-sky-400 font-medium">
            {item.badge}
          </span>
        )}
      </span>
      {item.subtitle && (
        <span className="block text-[11px] text-[#5a5040] mt-0.5">{item.subtitle}</span>
      )}
    </Link>
  );
}

function DropSections({ sections, onClose }: { sections: NavSection[]; onClose: () => void }) {
  return (
    <div className="p-2">
      {sections.map((sec, i) => (
        <div key={i}>
          {i > 0 && <div className="h-px bg-border my-2" />}
          {sec.label && (
            <p className="px-3 py-1 text-[10px] uppercase tracking-wider text-[#5a5040] font-medium">
              {sec.label}
            </p>
          )}
          {sec.items.map((item) => (
            <DropLeaf key={item.label} item={item} onClose={onClose} />
          ))}
        </div>
      ))}
    </div>
  );
}

function isActive(item: NavItem, pathname: string | null) {
  if (item.href.includes("#")) return false;
  return pathname === item.href || (pathname?.startsWith(item.href + "/") ?? false);
}

export default function Header() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeDropdown = () => setOpenDropdown(null);

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({ title: "Justice for Yong Yang", url: window.location.href });
    } else if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <header className="z-50 border-b border-border bg-[#0d0d0deb] backdrop-blur-md">
      <a
        href="#maincontent"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-accent focus:text-black focus:px-3 focus:py-1 focus:rounded focus:z-50"
      >
        Skip to content
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-2">
        <Link
          href="/"
          className="font-serif text-lg font-bold text-foreground hover:text-accent transition-colors shrink-0 mr-4"
        >
          Justice for <span className="text-accent">Yong Yang</span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden lg:flex items-center flex-1">
          {nav.map((item) => {
            const hasDropdown = !!(item.sections || item.columns);
            const isMega = !!item.columns;
            const open = openDropdown === item.href;
            const active = isActive(item, pathname);

            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.href)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 px-3 py-2 text-sm rounded transition-colors whitespace-nowrap ${
                    active
                      ? "text-accent"
                      : "text-[#a09880] hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {hasDropdown && (
                    <span
                      className={`text-[10px] opacity-50 transition-transform duration-150 inline-block ${
                        open ? "rotate-180" : ""
                      }`}
                    >
                      ▾
                    </span>
                  )}
                </Link>

                {hasDropdown && open && (
                  <div
                    className={`absolute top-full bg-[#171410] border border-border border-t-0 rounded-b-lg shadow-xl overflow-hidden ${
                      isMega ? "right-0 min-w-120" : "left-0 min-w-65"
                    }`}
                  >
                    {item.sections && (
                      <DropSections sections={item.sections} onClose={closeDropdown} />
                    )}
                    {item.columns && (
                      <div className="grid grid-cols-2">
                        {item.columns.map((col, i) => (
                          <div
                            key={i}
                            className={i === 0 ? "border-r border-border" : ""}
                          >
                            <DropSections sections={col} onClose={closeDropdown} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <button
          onClick={handleShare}
          className="hidden lg:block ml-auto text-sm bg-foreground text-background px-3 py-1.5 rounded font-medium hover:opacity-90 transition-opacity shrink-0"
        >
          Share →
        </button>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden ml-auto p-2 text-[#a09880] hover:text-foreground transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav aria-label="Mobile navigation" className="lg:hidden border-t border-border bg-[#0f0e0c]">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {nav.map((item) => {
              const hasChildren = !!(item.sections || item.columns);
              const allChildren: NavLeaf[] = hasChildren
                ? [
                    ...(item.sections?.flatMap((s) => s.items) ?? []),
                    ...(item.columns?.flat().flatMap((s) => s.items) ?? []),
                  ]
                : [];
              const expanded = mobileExpanded === item.href;

              return (
                <div key={item.href}>
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      className={`flex-1 block px-3 py-2 text-sm rounded transition-colors ${
                        isActive(item, pathname)
                          ? "text-accent bg-(--accent)/10"
                          : "text-[#a09880] hover:text-foreground hover:bg-border"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {hasChildren && (
                      <button
                        className="px-3 py-2 text-[#6a6050] hover:text-[#a09880] transition-colors"
                        onClick={() => setMobileExpanded(expanded ? null : item.href)}
                        aria-label={expanded ? "Collapse" : "Expand"}
                      >
                        <span
                          className={`text-xs inline-block transition-transform duration-150 ${
                            expanded ? "rotate-180" : ""
                          }`}
                        >
                          ▾
                        </span>
                      </button>
                    )}
                  </div>
                  {hasChildren && expanded && (
                    <div className="ml-4 mt-1 space-y-0.5">
                      {allChildren.map((child) => (
                        <Link
                          key={child.label + child.href}
                          href={child.href}
                          className="block px-3 py-1.5 text-xs text-[#6a6050] hover:text-[#a09880] rounded hover:bg-[#1a1814] transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                          {child.badge && (
                            <span className="ml-1.5 text-[9px] px-1 py-px rounded bg-sky-500/15 text-sky-400 font-medium">
                              {child.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
