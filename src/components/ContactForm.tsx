"use client";

import { useActionState, useEffect, useRef } from "react";
import { sendContactEmail, type ContactFormState } from "@/app/contact-us/actions";
import { formatPhoneDisplay, phoneTelHref, site } from "@/lib/site";

const fieldClass =
  "w-full rounded-sm border border-navy/25 bg-paper px-4 py-3 text-sm text-navy placeholder:text-navy/40 focus:border-navy focus:outline-none";

const initialState: ContactFormState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactEmail, initialState);
  const successRef = useRef<HTMLDivElement>(null);
  const phone = formatPhoneDisplay(site.phone);
  const tel = phoneTelHref(site.phone);

  useEffect(() => {
    if (state.status !== "success") return;
    successRef.current?.focus();
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div
        ref={successRef}
        role="status"
        tabIndex={-1}
        className="rounded-sm border border-navy/15 bg-cream-deep p-8 outline-none"
      >
        <p className="font-display text-2xl font-semibold">Message sent</p>
        <p className="mt-3 text-sm leading-relaxed text-navy/80">
          Thank you. We will review your note and follow up. For a faster response, call{" "}
          <a className="font-semibold underline" href={tel}>
            {phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-semibold">
          Name <span aria-hidden="true">*</span>
        </label>
        <input id="name" name="name" required autoComplete="name" className={fieldClass} />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">
          Email <span aria-hidden="true">*</span>
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} />
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold">
          Phone
        </label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold">
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={2500}
          className={fieldClass}
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          value="yes"
          required
          className="mt-1 h-4 w-4 accent-navy"
        />
        <label htmlFor="consent" className="text-sm leading-relaxed text-navy/85">
          I agree that this information may be stored and used to respond to this inquiry. I
          understand I can ask that it be removed at any time. See the{" "}
          <a className="font-semibold underline" href="/contact-us/privacy-policy/">
            Privacy Policy
          </a>
          . <span aria-hidden="true">*</span>
        </label>
      </div>

      {state.status === "error" ? (
        <p role="alert" className="text-sm font-medium text-navy">
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="rounded-sm bg-gold px-5 py-3 text-sm font-semibold text-navy hover:bg-gold-deep disabled:opacity-70"
      >
        {pending ? "Sending…" : "Send"}
      </button>
      <p className="text-xs text-navy/65">* Indicates required fields</p>
    </form>
  );
}
