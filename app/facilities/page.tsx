import * as Icons from "lucide-react";
import { Intro, CTA } from "../../components/Shared";
import { amenities } from "../../data/site";
export const metadata = {
  title: "Facilities & Amenities",
  description:
    "Explore the practical workspace amenities to discuss with TS-SPACES in Pune, from connectivity to meeting facilities.",
  alternates: { canonical: "/facilities" },
};
export default function Facilities() {
  return (
    <>
      <Intro
        eyebrow="Facilities & amenities"
        title="Everything You Need for a Productive Workday"
        description="Enjoy a professional workspace with practical amenities designed to make your workday more comfortable, focused, and convenient."
      />
      <div className="container notice">
        Plan with confidence: the facilities below are an editable checklist.
        All amenity provision must be confirmed with the business before
        booking.
      </div>
      <section className="container section facilities-grid">
        {amenities.map(([icon, t, d]) => {
          const Icon = Icons[icon as keyof typeof Icons] as typeof Icons.Wifi;
          return (
            <article className="facility-card" key={t}>
              <div className="facility-icon">
                <Icon size={27} />
              </div>
              <h2>{t}</h2>
              <p>{d}</p>
              <span className="status">
                {icon === "MapPin"
                  ? "Address supplied by business"
                  : "Awaiting business confirmation"}
              </span>
            </article>
          );
        })}
      </section>
      <CTA />
    </>
  );
}
