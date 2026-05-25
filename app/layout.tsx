import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Justice for Yong Yang",
    template: "%s | Justice for Yong Yang",
  },
  description:
    "Seeking justice for Yong Yang, killed by LAPD on May 2, 2024. Documenting the legal fight, community organizing, and the truth.",
  metadataBase: new URL("https://justiceforyongyang.com"),
  openGraph: {
    siteName: "Justice for Yong Yang",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main id="maincontent" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
