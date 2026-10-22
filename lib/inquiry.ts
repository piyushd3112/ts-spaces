export type Inquiry = {
  name: string;
  email: string;
  phone: string;
  workspace: string;
  date: string;
  message: string;
  website?: string;
};
export const workspaceOptions = [
  "Coworking Space",
  "Dedicated Desk",
  "Individual Seating",
  "Conference Room",
  "Startup Workspace",
  "Other",
];
export function validateInquiry(value: unknown): {
  data?: Inquiry;
  errors: Record<string, string>;
} {
  const raw = (value && typeof value === "object" ? value : {}) as Record<
    string,
    unknown
  >;
  const data = Object.fromEntries(
    ["name", "email", "phone", "workspace", "date", "message", "website"].map(
      (k) => [k, typeof raw[k] === "string" ? (raw[k] as string).trim() : ""],
    ),
  ) as Inquiry;
  const errors: Record<string, string> = {};
  if (data.name.length < 2 || data.name.length > 100)
    errors.name = "Enter your name (2–100 characters).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.email.length > 254)
    errors.email = "Enter a valid email address.";
  if (
    !/^[+\d\s()-]{7,25}$/.test(data.phone) ||
    data.phone.replace(/\D/g, "").length < 7
  )
    errors.phone = "Enter a valid phone number.";
  if (!workspaceOptions.includes(data.workspace))
    errors.workspace = "Choose a workspace requirement.";
  if (
    data.date &&
    (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) ||
      isNaN(Date.parse(data.date)) ||
      new Date(data.date).toISOString().slice(0, 10) !== data.date ||
      data.date <
        new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" }))
  )
    errors.date = "Choose today or a future visit date.";
  if (data.message.length > 3000)
    errors.message = "Keep your message within 3,000 characters.";
  return { data, errors };
}
