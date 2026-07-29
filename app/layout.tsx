import type { Metadata } from "next";
// Self-hosted fonts via @fontsource — no live fetch to Google's font CDN needed,
// which keeps builds reliable in network-restricted environments (CI, sandboxes, offline dev).
import "@fontsource/unbounded/400.css";
import "@fontsource/unbounded/500.css";
import "@fontsource/unbounded/600.css";
import "@fontsource/unbounded/700.css";
import "@fontsource/unbounded/800.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";
import "./globals.css";
import { profile } from "@/lib/data";
import SignalField from "@/components/SignalField";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const title = "Sourav Maji — Electrical Engineering Student & Developer";
const description =
  "Electrical Engineering undergraduate at RKMGEC (MAKAUT) building web systems, exploring cybersecurity, and applying machine learning — from West Bengal, India.";

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s — Sourav Maji",
  },
  description,
  metadataBase: new URL("https://sourav4344.netlify.app"),
  keywords: [
    "Sourav Maji",
    "Electrical Engineering",
    "RKMGEC",
    "MAKAUT",
    "Cybersecurity",
    "Frontend Developer",
    "Portfolio",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title,
    description,
    type: "website",
    url: "https://sourav4344.netlify.app",
    siteName: "Sourav Maji",
    images: ["/images/sourav-profile.png"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/sourav-profile.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="grain bg-base">
        {/* JSON-LD structured data for search engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: profile.name,
              url: "https://sourav4344.netlify.app",
              email: profile.email,
              sameAs: [profile.social.github, profile.social.linkedin, profile.social.instagram],
              jobTitle: "Electrical Engineering Student",
              affiliation: "RKMGEC Purulia (MAKAUT)",
            }),
          }}
        />
        <SignalField />
        <Cursor />
          <Nav />
          <main className="relative z-10 min-h-screen">{children}</main>
          <Footer />
      </body>
    </html>
  );
}
