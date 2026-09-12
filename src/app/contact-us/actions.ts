"use server";

import { Resend } from "resend";
import { formatPhoneDisplay, site } from "@/lib/site";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function fallbackContactLine(): string {
  return `Please call ${formatPhoneDisplay(site.phone)} or email ${site.email}.`;
}

export async function sendContactEmail(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  if (String(formData.get("company") ?? "").trim() !== "") {
    return { status: "success" };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const consent = String(formData.get("consent") ?? "") === "yes";

  if (!name) {
    return { status: "error", message: "Please enter your name." };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }
  if (!message) {
    return { status: "error", message: "Please enter a message." };
  }
  if (!consent) {
    return {
      status: "error",
      message: "Please confirm that this information may be stored to respond to your inquiry.",
    };
  }
  if (name.length > 200 || email.length > 320 || phone.length > 50 || message.length > 2500) {
    return {
      status: "error",
      message: "Your message is too long. Please shorten it and try again.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      status: "error",
      message: `The contact form is not connected yet. ${fallbackContactLine()}`,
    };
  }

  const toAddress = process.env.CONTACT_TO_EMAIL?.trim() || site.email;
  const fromAddress =
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    "Land Development Specialists <onboarding@resend.dev>";

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: fromAddress,
    to: toAddress,
    replyTo: `${name} <${email}>`,
    subject: `Website inquiry — ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "(not provided)"}`,
      "",
      message,
    ].join("\n"),
  });

  if (error) {
    return {
      status: "error",
      message: `The message could not be sent. ${fallbackContactLine()}`,
    };
  }

  return { status: "success" };
}
