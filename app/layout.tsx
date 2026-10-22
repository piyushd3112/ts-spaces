import type { Metadata } from "next";
import Header from "../components/Header";
import { Footer } from "../components/Shared";
import "./globals.css";
const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: {
    default: "TS-SPACES | Coworking Space in Pune, Bhujbal Chowk",
    template: "%s | TS-SPACES Pune",
  },
  description:
    "Discover flexible coworking spaces, dedicated desks, individual seating, and conference room solutions at TS-SPACES, Tejas Imperial, Bhujbal Chowk, Pune.",
  openGraph: {
    type: "website",
    siteName: "TS-SPACES",
    images: [{ url: "/images/hero.jpg", width: 1800, height: 1200 }],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
