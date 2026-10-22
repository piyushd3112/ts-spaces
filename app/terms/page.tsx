import { Intro } from "../../components/Shared";
export const metadata = {
  title: "Terms & Conditions",
  description:
    "Information about workspace enquiries, visit requests and pending booking terms at TS-SPACES.",
  alternates: { canonical: "/terms" },
};
export default function Terms() {
  return (
    <>
      <Intro
        eyebrow="Terms & conditions"
        title="Clear expectations. A better experience."
        description="Draft website terms for business review before launch."
      />
      <article className="container legal">
        <div className="notice">
          Pending business approval. Commercial and booking terms must be
          provided by TS-SPACES before accepting reservations or payment.
        </div>
        <h2>Enquiries and visit requests</h2>
        <p>
          Submitting an enquiry does not reserve a workspace or confirm a visit.
          The team must agree availability and any arrangements directly with
          you.
        </p>
        <h2>Facilities and pricing</h2>
        <p>
          Rates, operating hours, capacity, facilities, access conditions,
          cancellation terms, and membership policies require direct
          confirmation. Amenities marked as awaiting confirmation should not be
          treated as a guarantee.
        </p>
        <h2>Images and directions</h2>
        <p>
          Stock images are illustrative and do not show verified TS-SPACES
          facilities. The map provides an area reference; confirm arrival
          directions before visiting.
        </p>
        <h2>Final terms</h2>
        <p>
          The business must review these draft terms and supply its legal
          identity, applicable booking conditions, and contact details before
          publication.
        </p>
      </article>
    </>
  );
}
