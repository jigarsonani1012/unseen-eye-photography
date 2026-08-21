"use client";

import { ArrowRight, Check } from "lucide-react";
import { useState, type FormEvent } from "react";

const TYPES = ["Commission", "Editorial", "Fashion / Campaign", "Portrait sitting", "Exhibition", "Collaboration", "Print enquiry"];
const BUDGETS = ["Under €2,500", "€2,500 — €7,500", "€7,500 — €20,000", "€20,000+", "To be discussed"];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const errs: Record<string, string> = {};
    if (!data.name?.trim()) errs.name = "A name, so I know who I'm replying to.";
    if (!data.email?.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) errs.email = "A valid email, so the reply finds you.";
    if (!data.message?.trim() || data.message.trim().length < 20) errs.message = "Tell me a little more — twenty characters minimum.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("sending");
    // Pure client simulation of sending inquiry
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div className="flex min-h-[420px] flex-col items-start justify-center border hairline px-8 py-16 md:px-14">
        <Check size={28} strokeWidth={1.25} className="text-[var(--accent)]" />
        <h2 className="display display-sm mt-8">Received, and read soon.</h2>
        <p className="body-serif mt-6 max-w-md text-[var(--fg-soft)]">
          Every message is read personally, usually within two working days — faster if it rains, because rain means I am at the desk.
        </p>
        <p className="meta mt-8">Reference logged — studio replies from studio@eliasvale.com</p>
        <button
          onClick={() => setStatus("idle")}
          className="meta mt-8 border border-[var(--fg-soft)] px-6 py-3 transition-colors hover:border-[var(--fg)] hover:text-[var(--fg)]"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-x-10 gap-y-8 md:grid-cols-2">
      {[
        { name: "name", label: "Name", type: "text", placeholder: "Your full name" },
        { name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
        { name: "company", label: "Company / Publication", type: "text", placeholder: "Optional" },
        { name: "timeline", label: "Timeline", type: "text", placeholder: "e.g. Shoot in May, print by June" },
      ].map((f) => (
        <div key={f.name}>
          <label htmlFor={f.name} className="meta">
            {f.label}
          </label>
          <input id={f.name} name={f.name} type={f.type} placeholder={f.placeholder} className="mt-1 w-full" aria-invalid={!!errors[f.name]} />
          {errors[f.name] && <p className="meta mt-2 !text-[#a2543a]">{errors[f.name]}</p>}
        </div>
      ))}
      <div>
        <label htmlFor="type" className="meta">
          Project type
        </label>
        <select id="type" name="type" className="mt-1 w-full">
          {TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="budget" className="meta">
          Budget range
        </label>
        <select id="budget" name="budget" className="mt-1 w-full">
          {BUDGETS.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </div>
      <div className="md:col-span-2">
        <label htmlFor="message" className="meta">
          The project, in your words
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="What are we making, where, and why does it matter to you?"
          className="mt-1 w-full resize-none"
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="meta mt-2 !text-[#a2543a]">{errors.message}</p>}
      </div>
      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          data-cursor="open"
          data-cursor-label="Send"
          className="meta group inline-flex items-center gap-3 border border-[var(--fg)] px-8 py-4 transition-colors hover:bg-[var(--fg)] hover:text-[var(--bg)] disabled:opacity-50"
        >
          {status === "sending" ? "Sending…" : "Send inquiry"}
          <ArrowRight size={14} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" />
        </button>
        {status === "error" && (
          <p className="meta mt-4 !text-[#a2543a]">Something failed on the line — please email the studio directly.</p>
        )}
      </div>
    </form>
  );
}
