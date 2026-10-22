import { Intro, Photo, Button, CTA } from "../../components/Shared";
export const metadata = {
  title: "About Us",
  description:
    "Get to know TS-SPACES and our vision for practical, professional coworking in Bhujbal Chowk, Pune.",
  alternates: { canonical: "/about" },
};
export default function About() {
  return (
    <>
      <Intro
        eyebrow="About us"
        title="Room for your work. Space for your ambition."
        description="Welcome to TS-SPACES, a place for independent professionals and growing teams to explore a better working day in Pune."
      />
      <section className="container about-grid">
        <Photo
          name="shared"
          alt="Illustrative light-filled coworking office"
          priority
        />
        <div>
          <span className="eyebrow">A WORKSPACE WITH PURPOSE</span>
          <h2>Good work begins with the right environment.</h2>
          <p>
            Working independently shouldn’t mean working without a professional
            setting. TS-SPACES brings workspace enquiries together in one place,
            whether you need individual seating, a dedicated desk, or space for
            your small team.
          </p>
          <p>
            Located at Tejas Imperial, Bhujbal Chowk, Pune, we welcome
            freelancers, entrepreneurs, consultants, and businesses looking for
            a place to focus and connect.
          </p>
          <Button href="/contact?intent=visit">Come Visit Our Space</Button>
        </div>
      </section>
      <section className="container section two-grid">
        <div className="value-card">
          <span className="eyebrow">OUR VISION</span>
          <h2>Make room for possibility.</h2>
          <p>
            To be a welcoming professional setting where individuals and small
            businesses can focus on meaningful work and explore opportunities to
            connect.
          </p>
        </div>
        <div className="value-card">
          <span className="eyebrow">OUR MISSION</span>
          <h2>Keep work practical.</h2>
          <p>
            To help professionals explore workspace options suited to their
            routines, working needs, and ambitions through clear conversations
            and a simple enquiry process.
          </p>
        </div>
      </section>
      <div className="container">
        <p className="fine-print">
          Images are illustrative stock photography. Visit to see the actual
          space and confirm facilities.
        </p>
      </div>
      <CTA />
    </>
  );
}
