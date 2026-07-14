"use client";

import { useState } from "react";

/**
 * Static-export-safe enquiry form → Web3Forms (no server needed).
 * Key comes from NEXT_PUBLIC_WEB3FORMS_KEY (Cloudflare Pages env /
 * .env.local). WhatsApp + call remain the primary conversion paths.
 */
export default function EnquiryForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "");
    data.append("subject", "New enquiry — aasthaenterprise website");

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const fieldClass =
    "w-full border-b border-hairline-light bg-transparent py-3 text-base text-charcoal outline-none transition-colors placeholder:text-stone-muted focus:border-ember";
  const labelClass =
    "font-mono text-label font-medium uppercase text-text-muted";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Honeypot */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        className="hidden"
        aria-hidden="true"
      />

      <div>
        <label htmlFor="enquiry-name" className={labelClass}>
          Name *
        </label>
        <input
          id="enquiry-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Your name"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="enquiry-phone" className={labelClass}>
          Phone *
        </label>
        <input
          id="enquiry-phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="Your phone number"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="enquiry-message" className={labelClass}>
          What do you need? *
        </label>
        <textarea
          id="enquiry-message"
          name="message"
          required
          rows={4}
          placeholder="e.g. Aluminium sliding windows for a 3BHK in Karelibaug"
          className={`${fieldClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="min-h-12 w-full rounded-btn bg-ember px-8 py-3.5 text-base font-medium text-bone transition-colors hover:bg-ember-hover disabled:opacity-50 sm:w-auto"
      >
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </button>

      <p aria-live="polite" className="text-sm">
        {status === "success" && (
          <span className="text-charcoal">
            Thank you — we&apos;ll get back to you within a working day.
          </span>
        )}
        {status === "error" && (
          <span className="text-ember">
            Something went wrong. Please WhatsApp or call us instead.
          </span>
        )}
      </p>
    </form>
  );
}
