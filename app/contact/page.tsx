import { MapPin, Clock, Mail } from "lucide-react";
import { Intro, Location } from "../../components/Shared";
import InquiryForm from "../../components/InquiryForm";
import { business } from "../../data/site";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Contact Us & Request a Visit",
  description:
    "Enquire about your next workspace at TS-SPACES, Tejas Imperial, Bhujbal Chowk, Pune. Request a visit or discuss desks and meeting rooms.",
  alternates: { canonical: "/contact" },
};
export default function Contact() {
  return (
    <>
      <Intro
        eyebrow="Let’s connect"
        title="Let's Find the Right Workspace for You"
        description="Tell us what you need, and our team can help you explore the right workspace for your work or business."
      />
      <section className="container contact-grid">
        <InquiryForm enabled={!!process.env.INQUIRY_WEBHOOK_URL} />
        <aside className="contact-aside">
          <span className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>
          <h2>
            Come for the space.
            <br />
            Stay for the possibilities.
          </h2>
          <p>
            Have a question about a desk, a team workspace, or a meeting room?
            Start with an enquiry.
          </p>
          <div className="contact-detail">
            <MapPin />
            <div>
              <h3>Find us in Pune</h3>
              <p>{business.address}</p>
            </div>
          </div>
          <div className="contact-detail">
            <Mail />
            <div>
              <h3>Get in touch</h3>
              {business.email ? (
                <a href={`mailto:${business.email}`}>{business.email}</a>
              ) : (
                <p>
                  Direct email and phone details will be added after business
                  confirmation.
                </p>
              )}
              {business.phone && (
                <a href={`tel:${business.phone}`}>{business.phone}</a>
              )}
            </div>
          </div>
          <div className="contact-detail">
            <Clock />
            <div>
              <h3>Plan your visit</h3>
              <p>
                {business.hours ||
                  "Business hours are awaiting confirmation. Please arrange your visit with the team in advance."}
              </p>
            </div>
          </div>
        </aside>
      </section>
      <section className="container section">
        <Location />
      </section>
    </>
  );
}
