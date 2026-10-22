import {
  ArrowUpRight,
  MapPin,
  Wifi,
  Users,
  ArrowDownRight,
  Check,
  Armchair,
  Car,
  Coffee,
  Snowflake,
  Zap,
} from "lucide-react";
import Link from "next/link";
import {
  Button,
  Photo,
  SectionHeading,
  FAQList,
  CTA,
  Location,
} from "../components/Shared";
import { faqs, services, business } from "../data/site";
export const metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <span className="location-pill">
            <span /> YOUR NEXT WORKSPACE · PUNE
          </span>
          <h1>
            Your space to
            <br />
            work, connect
            <br />& <em>grow.</em>
            <span className="sr-only"> in Pune</span>
          </h1>
          <p className="hero-subtitle">
            Big ideas deserve a better place to begin.
          </p>
          <p>
            Affordable coworking spaces in Pune for startups, freelancers &
            growing teams. Discover flexible workspaces, dedicated desks, and
            professional meeting rooms designed to help you focus, collaborate,
            and grow your business.
          </p>
          <div className="button-row">
            <Button href="/services">Explore Our Spaces</Button>
            <Button href="/contact?intent=visit" secondary>
              Book a Visit
            </Button>
          </div>
          <div className="hero-location">
            <MapPin size={18} />
            <span>Tejas Imperial, Bhujbal Chowk, Pune</span>
          </div>
        </div>
        <div className="hero-visual">
          <Photo
            name="hero"
            alt="Illustrative bright shared office with natural light and plants"
            priority
          />
          <div className="image-label">
            <span className="live-dot" /> A fresh space. A fresh perspective.
          </div>
          <div className="hero-note">
            <span className="note-icon">
              <ArrowUpRight />
            </span>
            <div>
              Your work. Your rhythm.<small>Find a space that fits.</small>
            </div>
          </div>
          <span className="stock-label">
            Illustrative workspace photography
          </span>
        </div>
      </section>
      <div className="promise-strip">
        <div className="container">
          <span>
            <Armchair /> Flexible workspace options
          </span>
          <span>
            <Users /> For individuals & growing teams
          </span>
          <span>
            <MapPin /> Well-connected in Pune
          </span>
          <Link href="/contact">
            Your next chapter starts here <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
      <section className="section container">
        <SectionHeading
          eyebrow="A SPACE FOR EVERY AMBITION"
          title="Different ways to work. One great place."
          copy="From your first idea to your next big move, find a workspace that works for you."
          link={["View all spaces", "/services"]}
        />
        <div className="workspace-grid">
          {services.slice(0, 4).map((s, i) => (
            <Link
              href={`/services#space-${i}`}
              key={s.title}
              className="workspace-card"
            >
              <Photo
                name={s.image}
                alt={`Illustrative ${s.title.toLowerCase()} interior`}
              />
              <div className="workspace-info">
                <span>0{i + 1}</span>
                <h3>{s.title}</h3>
                <ArrowUpRight size={21} />
                <p>{s.short}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="why-section">
        <div className="container why-grid">
          <div className="why-visual">
            <Photo
              name="team"
              alt="Illustrative collaborative office lounge with spacious seating"
            />
            <div className="photo-caption">
              A little inspiration.
              <br />
              <strong>A lot of possibility.</strong>
            </div>
          </div>
          <div>
            <span className="eyebrow">MORE THAN JUST A DESK</span>
            <h2>
              A better place
              <br />
              to do your best work.
            </h2>
            <p>
              Your environment shapes your day. Find a professional setting that
              gives your ideas room and your work a sense of purpose.
            </p>
            <div className="benefit-list">
              {[
                [
                  "Work your way",
                  "Explore flexible options for your individual or team needs.",
                ],
                [
                  "Make meaningful connections",
                  "Share a professional environment with people on their own journeys.",
                ],
                [
                  "Keep things practical",
                  "Discuss workspace options that suit your needs and budget.",
                ],
              ].map(([t, d]) => (
                <div key={t}>
                  <span>
                    <Check size={17} />
                  </span>
                  <div>
                    <h3>{t}</h3>
                    <p>{d}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/about" className="text-link">
              Get to know TS-SPACES <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          eyebrow="SMALL DETAILS. BETTER WORKDAYS."
          title="Made for a more productive day."
          copy="Explore the practical facilities to discuss when choosing your space."
          link={["Explore facilities", "/facilities"]}
        />
        <div className="amenity-preview">
          {[
            [Wifi, "High-speed Wi-Fi"],
            [Snowflake, "Air conditioning"],
            [Car, "Parking"],
            [Coffee, "Refreshment area"],
            [Zap, "Power backup"],
            [Users, "Meeting rooms"],
          ].map(([Icon, title]) => {
            const I = Icon as typeof Wifi;
            return (
              <div key={String(title)}>
                <I size={28} />
                <h3>{String(title)}</h3>
              </div>
            );
          })}
        </div>
        <p className="fine-print">
          Facility details are subject to business confirmation. Please enquire
          before booking.
        </p>
      </section>
      <section className="audience-section">
        <div className="container audience-inner">
          <span className="eyebrow">IN GOOD COMPANY</span>
          <h2>
            Independent minds.
            <br />
            Shared possibilities.
          </h2>
          <p>
            For the people building something, wherever they are in their
            journey.
          </p>
          <div className="audience-tags">
            {[
              "Freelancers",
              "Startups",
              "Entrepreneurs",
              "Remote workers",
              "Consultants",
              "Small teams",
            ].map((t) => (
              <span key={t}>
                {t}
                <ArrowUpRight size={15} />
              </span>
            ))}
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          eyebrow="PICTURE YOUR WORKDAY"
          title="A feel for your next workspace."
          copy="A little inspiration for what a productive day can look like."
        />
        <div className="gallery">
          <Photo name="shared" alt="Illustrative open-plan shared workspace" />
          <Photo name="meeting" alt="Illustrative professional meeting room" />
          <Photo name="individual" alt="Illustrative individual workstations" />
        </div>
        <p className="fine-print">
          Stock photography for illustration; these are not verified photographs
          of TS-SPACES.
        </p>
      </section>
      <section className="steps-section container">
        <SectionHeading
          eyebrow="YOUR NEXT CHAPTER, MADE SIMPLE"
          title="From looking to getting started."
        />
        <div className="steps">
          {[
            ["Discover the space", "Explore workspace options and facilities."],
            ["Find your fit", "Think about what you and your team need."],
            ["Let’s talk", "Send an enquiry or request a visit."],
            [
              "Make your next move",
              "Confirm the details with our team and get started.",
            ],
          ].map(([t, d], i) => (
            <div key={t}>
              <span>
                0{i + 1}
                <ArrowDownRight size={23} />
              </span>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section container">
        <Location compact />
      </section>
      <section className="section faq-preview container">
        <SectionHeading
          eyebrow="A LITTLE CLARITY BEFORE YOU BEGIN"
          title="Good questions. Simple answers."
          link={["See all FAQs", "/faq"]}
        />
        <FAQList items={[faqs[1], faqs[3], faqs[8], faqs[10]]} />
      </section>
      <CTA />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: business.name,
            address: {
              "@type": "PostalAddress",
              streetAddress: "Tejas Imperial, Bhujbal Chowk",
              addressLocality: "Pune",
              addressRegion: "Maharashtra",
              postalCode: "411057",
              addressCountry: "IN",
            },
          }),
        }}
      />
    </>
  );
}
