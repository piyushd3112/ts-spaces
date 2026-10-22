import { NextResponse } from "next/server";
import { validateInquiry } from "../../../lib/inquiry";
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (
    origin &&
    origin !== new URL(request.url).origin &&
    origin !== process.env.NEXT_PUBLIC_SITE_URL
  )
    return NextResponse.json(
      { message: "Request origin is not allowed." },
      { status: 403 },
    );
  if (Number(request.headers.get("content-length") || 0) > 16384)
    return NextResponse.json(
      { message: "Request is too large." },
      { status: 413 },
    );
  let body: unknown;
  try {
    const text = await request.text();
    if (text.length > 16384)
      return NextResponse.json(
        { message: "Request is too large." },
        { status: 413 },
      );
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }
  const { data, errors } = validateInquiry(body);
  if (Object.keys(errors).length || !data)
    return NextResponse.json(
      { message: "Please check the form.", errors },
      { status: 400 },
    );
  if (data.website)
    return NextResponse.json(
      { message: "Unable to accept this enquiry." },
      { status: 400 },
    );
  const endpoint = process.env.INQUIRY_WEBHOOK_URL;
  if (!endpoint)
    return NextResponse.json(
      {
        message:
          "Enquiry delivery is not configured yet. No enquiry has been sent.",
      },
      { status: 503 },
    );
  try {
    const url = new URL(endpoint);
    if (url.protocol !== "https:") throw new Error("HTTPS required");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.INQUIRY_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${process.env.INQUIRY_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({
        ...data,
        source: "TS-SPACES website",
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10000),
      redirect: "error",
    });
    if (!response.ok) throw new Error("Delivery rejected");
    return NextResponse.json({ message: "Enquiry delivered." });
  } catch {
    return NextResponse.json(
      {
        message: "Your enquiry could not be delivered. Please try again later.",
      },
      { status: 502 },
    );
  }
}
