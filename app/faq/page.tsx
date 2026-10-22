import { Intro, FAQList, Button, CTA } from "../../components/Shared";
import { faqs } from "../../data/site";
export const metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to questions about TS-SPACES coworking, dedicated desks, meeting rooms, visits, pricing enquiries and our Pune location.",
  alternates: { canonical: "/faq" },
};
export default function FAQ() {
  return (
    <>
      <Intro
        eyebrow="Frequently asked questions"
        title="A little clarity. A better start."
        description="Everything you might want to ask before finding your workspace. For the details that matter to you, we’re here to help."
      />
      <section className="container faq-page">
        <div className="faq-sidebar">
          <span className="eyebrow">LET’S MAKE IT SIMPLE</span>
          <h2>Still have a question?</h2>
          <p>
            Tell us what you’re looking for. Let’s explore the right space
            together.
          </p>
          <Button href="/contact">Contact Our Team</Button>
        </div>
        <FAQList items={faqs} />
      </section>
      <CTA />
    </>
  );
}
