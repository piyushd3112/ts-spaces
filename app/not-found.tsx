import Link from "next/link";
import { Button } from "../components/Shared";
export default function NotFound() {
  return (
    <section className="container page-intro">
      <span className="eyebrow">404 / A LITTLE OFF TRACK</span>
      <h1>Let’s find your way back.</h1>
      <p>
        The page you’re looking for isn’t here. Your next workspace might be.
      </p>
      <div className="button-row" style={{ marginTop: 30 }}>
        <Button href="/">Back to Home</Button>
        <Link className="text-link" href="/contact">
          Contact Our Team
        </Link>
      </div>
    </section>
  );
}
