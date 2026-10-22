"use client";
import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { validateInquiry, workspaceOptions } from "../lib/inquiry";
export default function InquiryForm({ enabled }: { enabled: boolean }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);
  const [workspace, setWorkspace] = useState("");
  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get("workspace");
    if (s)
      setWorkspace(
        s === "Flexible Coworking Space"
          ? "Coworking Space"
          : s === "Startup Workspace"
            ? "Startup Workspace"
            : s,
      );
  }, []);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    const v = validateInquiry(payload);
    setErrors(v.errors);
    setStatus("");
    if (Object.keys(v.errors).length) return;
    setPending(true);
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) {
        setErrors(result.errors || {});
        throw new Error(
          result.message ||
            "Your enquiry could not be sent. Please try again later.",
        );
      }
      setStatus(
        "Your enquiry has been sent. A visit is only confirmed after our team agrees a time with you.",
      );
      form.reset();
      setWorkspace("");
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Unable to connect. Please try again.",
      );
    } finally {
      setPending(false);
    }
  }
  return (
    <form onSubmit={submit} noValidate className="inquiry-form">
      <div className="form-heading">
        <h2>Let’s start a conversation.</h2>
        <p>A few details will help us understand your needs.</p>
      </div>
      {!enabled && (
        <div className="notice" role="status">
          Online enquiries are awaiting delivery setup. This form cannot send
          your details yet.
        </div>
      )}
      <div className="form-grid">
        {[
          ["name", "Full name", "text", "Your name"],
          ["email", "Email address", "email", "you@example.com"],
          ["phone", "Phone number", "tel", "Your contact number"],
        ].map(([name, label, type, placeholder]) => (
          <label key={name} htmlFor={name}>
            {label} <span>*</span>
            <input
              id={name}
              name={name}
              type={type}
              required
              autoComplete={
                name === "name" ? "name" : name === "phone" ? "tel" : "email"
              }
              placeholder={placeholder}
              aria-invalid={!!errors[name]}
              aria-describedby={errors[name] ? `${name}-error` : undefined}
            />
            {errors[name] && (
              <small id={`${name}-error`} className="field-error">
                {errors[name]}
              </small>
            )}
          </label>
        ))}
        <label htmlFor="workspace">
          Workspace requirement <span>*</span>
          <select
            id="workspace"
            name="workspace"
            required
            value={workspace}
            onChange={(e) => setWorkspace(e.target.value)}
            aria-invalid={!!errors.workspace}
          >
            <option value="">Select your workspace</option>
            {workspaceOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
          {errors.workspace && (
            <small className="field-error">{errors.workspace}</small>
          )}
        </label>
        <label htmlFor="date" className="full">
          Preferred visit date <span className="optional">(optional)</span>
          <input
            id="date"
            name="date"
            type="date"
            aria-invalid={!!errors.date}
          />
          {errors.date && <small className="field-error">{errors.date}</small>}
        </label>
        <label className="full" htmlFor="message">
          Anything else we should know?{" "}
          <span className="optional">(optional)</span>
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={3000}
            placeholder="Tell us about your work, team size, or workspace needs."
          />
          {errors.message && (
            <small className="field-error">{errors.message}</small>
          )}
        </label>
      </div>
      <label className="honeypot" aria-hidden="true">
        Leave empty
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <p className="fine-print">
        We use your details to respond to this enquiry. Read our{" "}
        <a href="/privacy">privacy information</a>. A preferred date is a
        request, not a confirmed booking.
      </p>
      <button className="button" disabled={pending || !enabled}>
        {pending ? "Sending enquiry…" : "Request a Visit / Send Enquiry"}
        <ArrowUpRight size={17} />
      </button>
      {status && (
        <p role="status" className="form-status">
          {status}
        </p>
      )}
      {Object.keys(errors).length > 0 && (
        <p role="alert" className="field-error">
          Please check the highlighted fields.
        </p>
      )}
    </form>
  );
}
