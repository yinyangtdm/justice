"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

type NavLeaf = {
  label: string
  href: string
  subtitle?: string
  badge?: string
  featured?: boolean
}

type NavItem = {
  label: string
  href: string
  items?: NavLeaf[]
}

/** Simplified nav — 6 top-level items, timeline-first. Old mega-menu archived. */
const nav: NavItem[] = [
  {
    label: "Timeline",
    href: "/#timeline",
    items: [
      { label: "Interactive timeline", href: "/#timeline", featured: true },
      { label: "Full-screen timeline", href: "/timeline" },
      { label: "What happened (prose)", href: "/what-happened" },
      { label: "Body camera footage", href: "/what-happened#bodycam", badge: "Released" },
    ],
  },
  {
    label: "Remember Yong",
    href: "/yong",
    items: [
      { label: "Yong's story", href: "/yong", featured: true },
      { label: "Art gallery", href: "/art" },
      { label: "Videos & memories", href: "/videos" },
    ],
  },
  {
    label: "Legal",
    href: "/legal",
    items: [
      { label: "All cases", href: "/legal", featured: true },
      { label: "Federal lawsuit", href: "/legal/federal-lawsuit", subtitle: "2:26-cv-01014" },
      { label: "CA civil lawsuit", href: "/legal/civil-lawsuit", subtitle: "24STCV24804" },
      { label: "Bodycam petition", href: "/legal/civil-petition", subtitle: "Granted Mar 2025" },
    ],
  },
  {
    label: "Community",
    href: "/community",
    items: [
      { label: "Rallies & events", href: "/community", featured: true },
      { label: "Family advocacy", href: "/community#advocacy" },
      { label: "Upcoming", href: "/community#upcoming" },
    ],
  },
  {
    label: "Press",
    href: "/press",
    items: [
      { label: "Curated coverage", href: "/press", featured: true },
      { label: "English", href: "/press#english" },
      { label: "Korean 한국어", href: "/press#korean" },
    ],
  },
  {
    label: "Get Involved",
    href: "/get-involved",
    items: [
      { label: "How to help", href: "/get-involved", featured: true },
      { label: "Support AB572", href: "/get-involved#ab572", badge: "Active" },
      { label: "Foundation (coming)", href: "/get-involved#foundation" },
    ],
  },
]

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
  )
}

function isActive(item: NavItem, pathname: string | null) {
  if (item.href.startsWith("/#")) return pathname === "/"
  return pathname === item.href || (pathname?.startsWith(item.href + "/") ?? false)
}

export default function Header() {
  const pathname = usePathname()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const closeDropdown = () => setOpenDropdown(null)

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({ title: "Justice for Yong Yang", url: window.location.href })
    } else if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(window.location.href)
    }
  }

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
          className="font-serif text-lg font-bold text-foreground hover:text-accent transition-colors shrink-0 mr-2 sm:mr-4"
        >
          Justice for <span className="text-accent">Yong Yang</span>
        </Link>

        <nav aria-label="Main navigation" className="hidden lg:flex items-center flex-1">
          {nav.map((item) => {
            const hasDropdown = !!item.items?.length
            const open = openDropdown === item.href
            const active = isActive(item, pathname)

            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.href)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 px-2.5 xl:px-3 py-2 text-sm rounded transition-colors whitespace-nowrap ${
                    active ? "text-accent" : "text-[#a09880] hover:text-foreground"
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

                {hasDropdown && open && item.items && (
                  <div className="absolute top-full left-0 min-w-65 bg-[#171410] border border-border border-t-0 rounded-b-lg shadow-xl overflow-hidden">
                    <div className="p-2">
                      {item.items.map((leaf) => (
                        <DropLeaf key={leaf.label} item={leaf} onClose={closeDropdown} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        <button
          onClick={handleShare}
          className="hidden lg:block ml-auto text-sm bg-foreground text-background px-3 py-1.5 rounded font-medium hover:opacity-90 transition-opacity shrink-0"
        >
          Share →
        </button>

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

      {mobileOpen && (
        <nav aria-label="Mobile navigation" className="lg:hidden border-t border-border bg-[#0f0e0c]">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {nav.map((item) => {
              const hasChildren = !!item.items?.length
              const expanded = mobileExpanded === item.href

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
                  {hasChildren && expanded && item.items && (
                    <div className="ml-4 mt-1 space-y-0.5">
                      {item.items.map((child) => (
                        <Link
                          key={child.label + child.href}
                          href={child.href}
                          className="block px-3 py-1.5 text-xs text-[#6a6050] hover:text-[#a09880] rounded hover:bg-[#1a1814] transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </nav>
      )}
    </header>
  )
}
