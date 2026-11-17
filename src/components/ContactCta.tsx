"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import SpecularButton from "@/components/SpecularButton";

/* Must match public/__forms.html exactly — Netlify matches submissions to the
   form by this name, and it is what lands in the notification email subject. */
const FORM_NAME = "JCS - new website enquiry";

/* Netlify only parses static HTML for forms, so the post goes to the static
   file that declares this one rather than to the client-rendered route. */
const FORM_ACTION = "/__forms.html";

const CTA_LOOK = {
  className: "auditions-cta",
  size: "lg" as const,
  radius: 18,
  tint: "#ffffff",
  tintOpacity: 0.04,
  textColor: "#f5f5f5",
  lineColor: "#ffffff",
  baseColor: "#525252",
  intensity: 1,
  idleIntensity: 0.35,
  shineSize: 10,
  shineFade: 34,
  thickness: 1.2,
  glow: 1,
};

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactCta() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descId = useId();

  const close = useCallback(() => {
    setOpen(false);
    setStatus("idle");
    openerRef.current?.focus?.();
  }, []);

  // Esc closes, and focus is kept inside the dialog while it is up.
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        close();
        return;
      }
      if (event.key !== "Tab") return;
      const root = dialogRef.current;
      if (!root) return;
      const focusable = root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (event.shiftKey && (active === first || !root.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown, true);
    firstFieldRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, [open, close]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");

    // URLSearchParams, not FormData: Netlify's form handler reads
    // application/x-www-form-urlencoded, and multipart silently misses.
    const body = new URLSearchParams(
      new FormData(form) as unknown as Record<string, string>
    ).toString();

    try {
      const res = await fetch(FORM_ACTION, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      if (!res.ok) throw new Error(`Netlify responded ${res.status}`);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="contact-cta">
      <p className="contact-cta__eyebrow">
        Want to be involved backstage or help bring the show to life?
      </p>

      <SpecularButton
        {...CTA_LOOK}
        followMouse
        proximity={250}
        onClick={() => {
          openerRef.current = document.activeElement as HTMLElement | null;
          setOpen(true);
        }}
      >
        Click To Contact
      </SpecularButton>

      {open ? (
        <div
          className="contact-modal"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div
            className="contact-modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            ref={dialogRef}
          >
            <button type="button" className="contact-modal__close" onClick={close} aria-label="Close">
              &times;
            </button>

            <h2 id={titleId} className="contact-modal__title">
              Get In Touch
            </h2>
            <p id={descId} className="contact-modal__intro">
              Tell us a little about yourself and how you&rsquo;d like to help. We&rsquo;ll be in touch.
            </p>

            {status === "sent" ? (
              <div className="contact-modal__done" role="status">
                <p>Thanks &mdash; your message is on its way.</p>
                <button type="button" className="contact-form__submit" onClick={close}>
                  Close
                </button>
              </div>
            ) : (
              <form
                className="contact-form"
                name={FORM_NAME}
                method="POST"
                action={FORM_ACTION}
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={onSubmit}
                noValidate={false}
              >
                <input type="hidden" name="form-name" value={FORM_NAME} />
                <p className="contact-form__honey" aria-hidden="true">
                  <label>
                    Leave this field empty
                    <input name="bot-field" tabIndex={-1} autoComplete="off" />
                  </label>
                </p>

                <label className="contact-form__field">
                  <span>Name</span>
                  <input
                    ref={firstFieldRef}
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    disabled={status === "sending"}
                  />
                </label>

                <label className="contact-form__field">
                  <span>Email</span>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    disabled={status === "sending"}
                  />
                </label>

                <label className="contact-form__field">
                  <span>Contact number</span>
                  <input
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    disabled={status === "sending"}
                  />
                </label>

                <label className="contact-form__field">
                  <span>Message</span>
                  <textarea name="message" rows={4} required disabled={status === "sending"} />
                </label>

                {status === "error" ? (
                  <p className="contact-form__error" role="alert">
                    Something went wrong sending that. Please try again, or email{" "}
                    <a href="mailto:georgie.harris@futures.church">georgie.harris@futures.church</a>.
                  </p>
                ) : null}

                <button type="submit" className="contact-form__submit" disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
