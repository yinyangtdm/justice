import Link from "next/link"

const primaryLinks = [
  { label: "Timeline", href: "/#timeline" },
  { label: "Remember Yong", href: "/yong" },
  { label: "Legal Cases", href: "/legal" },
  { label: "Community", href: "/community" },
  { label: "Press", href: "/press" },
  { label: "Get Involved", href: "/get-involved" },
]

const secondaryLinks = [
  { label: "What Happened", href: "/what-happened" },
  { label: "Art for Yong", href: "/art" },
  { label: "Videos", href: "/videos" },
]

const social = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/@JusticeForYongYang",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-border mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="font-serif text-xl font-bold text-foreground mb-3">
              Justice for <span className="text-accent">Yong Yang</span>
            </p>
            <p className="text-sm text-muted leading-relaxed">
              Yong Yang was killed by LAPD on May 2, 2024 during a mental health crisis. This site
              documents the truth and the fight for justice.
            </p>
            <div className="flex gap-3 mt-4">
              {social.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-muted hover:text-accent transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">
              Explore
            </h3>
            <ul className="space-y-2">
              {primaryLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[#7a7060] hover:text-accent transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-2 mt-4 pt-4 border-t border-border">
              {secondaryLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-xs text-[#5a5040] hover:text-muted transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">
              Legal Cases
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/legal/federal-lawsuit"
                  className="text-sm text-[#7a7060] hover:text-accent transition-colors"
                >
                  2:26-cv-01014 — Federal
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/civil-lawsuit"
                  className="text-sm text-[#7a7060] hover:text-accent transition-colors"
                >
                  24STCV24804 — Civil Lawsuit
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/civil-petition"
                  className="text-sm text-[#7a7060] hover:text-accent transition-colors"
                >
                  24STCP02107 — Bodycam Petition
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border text-center">
          <p className="text-xs text-[#3a3530]">
            © {new Date().getFullYear()} Justice for Yong Yang. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
