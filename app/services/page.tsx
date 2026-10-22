import { Check } from "lucide-react";
import { Intro, Photo, Button, CTA } from "../../components/Shared";
import { services } from "../../data/site";
export const metadata = {
  title: "Workspace Services",
  description:
    "Explore flexible coworking, dedicated desks, individual seating, startup workspace and conference room enquiries in Pune.",
  alternates: { canonical: "/services" },
};
export default function Services() {
  return (
    <>
      <Intro
        eyebrow="Our spaces"
        title="Your work has a place here."
        description="A solo workday. A team milestone. An important conversation. Explore a space for whatever comes next."
      />
      <div className="container service-list">
        {services.map((s, i) => (
          <section className="service-row" key={s.title} id={`space-${i}`}>
            <Photo
              name={s.image}
              alt={`Illustrative interior for ${s.title.toLowerCase()}`}
            />
            <div>
              <span className="eyebrow">
                0{i + 1} / {s.tag}
              </span>
              <h2>{s.title}</h2>
              <p>{s.description}</p>
              <ul className="check-list">
                {s.benefits.map((b) => (
                  <li key={b}>
                    <Check size={17} />
                    {b}
                  </li>
                ))}
              </ul>
              <Button
                href={`/contact?workspace=${encodeURIComponent(s.title)}`}
              >
                {i === 3 ? "Enquire About Meeting Rooms" : "Check Availability"}
              </Button>
            </div>
          </section>
        ))}
      </div>
      <div className="container notice">
        Pricing, capacity, facilities, availability, and booking terms must be
        confirmed directly. All photography is illustrative.
      </div>
      <CTA />
    </>
  );
}
