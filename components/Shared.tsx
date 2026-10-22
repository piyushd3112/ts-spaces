import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin, ArrowRight } from "lucide-react";
import { business, imagePaths, nav, services } from "../data/site";
export function Button({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link className={`button ${secondary ? "secondary" : ""}`} href={href}>
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
export function Photo({
  name,
  alt,
  className = "",
  priority = false,
}: {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`photo ${className}`}>
      <Image
        src={imagePaths[name]}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 60vw"
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
export function Intro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="page-intro container">
      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        {eyebrow}
      </div>
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  copy,
  link,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  link?: [string, string];
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {copy && <p>{copy}</p>}
      </div>
      {link && (
        <Link className="text-link" href={link[1]}>
          {link[0]} <ArrowUpRight size={18} />
        </Link>
      )}
    </div>
  );
}
export function FAQList({ items }: { items: string[][] }) {
  return (
    <div className="faq-list">
      {items.map(([q, a]) => (
        <details key={q}>
          <summary>
            {q}
            <span className="faq-plus">+</span>
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
export function CTA() {
  return (
    <section className="cta container">
      <span className="eyebrow">GOOD WORK STARTS WITH THE RIGHT SPACE</span>
      <h2>
        Find your perfect
        <br />
        workspace in Pune.
      </h2>
      <p>Bring your ideas. We’ll help you find the space for them.</p>
      <div className="button-row">
        <Button href="/contact?intent=visit">Book a Visit</Button>
        <Button secondary href="/contact">
          Contact Our Team
        </Button>
      </div>
      <span className="cta-symbol" aria-hidden="true">
        &#8599;
      </span>
    </section>
  );
}
export function Location({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`location-grid ${compact ? "compact" : ""}`}>
      <div>
        <span className="eyebrow">RIGHT WHERE YOU NEED TO BE</span>
        <h2>
          A place to work.
          <br />A location that works.
        </h2>
        <p>
          Make your next working day a little closer to where you want to be.
        </p>
        <div className="address">
          <MapPin size={24} />
          <div>
            <strong>TS-SPACES, Pune</strong>
            <p>{business.address}</p>
          </div>
        </div>
        <a
          href={business.mapUrl}
          target="_blank"
          rel="noreferrer"
          className="text-link"
        >
          Open in Google Maps <ArrowUpRight size={18} />
        </a>
        <p className="fine-print">
          Area preview. Please confirm the exact entrance before visiting.
        </p>
      </div>
      <div className="map-wrap">
        <iframe
          title="Area map for Tejas Imperial, Bhujbal Chowk, Pune"
          src={
            process.env.NEXT_PUBLIC_MAP_EMBED_URL ||
            "https://maps.google.com/maps?q=Tejas%20Imperial%20Bhujbal%20Chowk%20Pune%20411057&output=embed"
          }
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <span className="map-caption">TEJAS IMPERIAL · BHUJBAL CHOWK</span>
      </div>
    </div>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <Link className="footer-logo" href="/">
            TS-SPACES
          </Link>
          <p>
            Space to focus. People to connect with.
            <br />
            Room to grow.
          </p>
          <span className="location-label">
            <MapPin size={15} /> Bhujbal Chowk, Pune
          </span>
        </div>
        <div>
          <h3>Explore</h3>
          {nav.map(([label, url]) => (
            <Link key={url} href={url}>
              {label}
            </Link>
          ))}
        </div>
        <div>
          <h3>Your workspace</h3>
          {services.map((s) => (
            <Link key={s.title} href="/services">
              {s.title}
            </Link>
          ))}
        </div>
        <div>
          <h3>Come say hello</h3>
          <p>{business.address}</p>
          {business.phone && (
            <a href={`tel:${business.phone}`}>{business.phone}</a>
          )}
          {business.email && (
            <a href={`mailto:${business.email}`}>{business.email}</a>
          )}
          <Link className="footer-contact" href="/contact">
            Let’s find your space <ArrowRight size={16} />
          </Link>
          {business.socials.map((s) => (
            <a key={s.url} href={s.url}>
              {s.label}
            </a>
          ))}
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} TS-SPACES. All rights reserved.
        </span>
        <div>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
