"use client";

import Image from "next/image";
import { ArrowRight, CheckCircle2, Database, Mail, MessageSquareText, ShieldCheck, Sparkles, UserRound } from "lucide-react";
import { useMemo, useState } from "react";

const initialForm = {
  name: "",
  email: "",
  message: ""
};

export default function Home() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [notice, setNotice] = useState("");

  const messageCount = useMemo(() => form.message.trim().length, [form.message]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  }

  async function submitForm(event) {
    event.preventDefault();
    setStatus("loading");
    setNotice("");
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors || {});
        setNotice(data.error || "Please check the highlighted fields.");
        setStatus("error");
        return;
      }

      setForm(initialForm);
      setNotice(data.message || "Form Submitted Successfully");
      setStatus("success");
    } catch (error) {
      setNotice("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <main className="page-shell">
      <section className="hero-section">
        <div className="hero-copy">
          <a className="brand-pill" href="https://www.shecanfoundation.org" target="_blank" rel="noreferrer">
            <span className="brand-dot" />
            She Can Foundation
          </a>

          <div className="headline-group">
            <p className="eyebrow">Internship application task</p>
            <h1>Contact form crafted with care, clarity, and confidence.</h1>
            <p className="hero-text">
              A responsive full-stack form experience with validation, Neon database support, and a focused admin view for reviewing submissions.
            </p>
          </div>

          <div className="impact-row" aria-label="Project highlights">
            <div>
              <ShieldCheck aria-hidden="true" />
              <span>Validated</span>
            </div>
            <div>
              <Database aria-hidden="true" />
              <span>Database ready</span>
            </div>
            <div>
              <Sparkles aria-hidden="true" />
              <span>Vercel friendly</span>
            </div>
          </div>
        </div>

        <div className="form-panel" aria-labelledby="form-title">
          <div className="panel-header">
            <Image src="/she-can-mark.svg" alt="She Can Foundation logo" width={74} height={74} priority />
            <div>
              <p className="small-kicker">Reach out</p>
              <h2 id="form-title">Send a message</h2>
            </div>
          </div>

          <form className="contact-form" onSubmit={submitForm} noValidate>
            <label>
              <span>Name</span>
              <div className={`input-wrap ${errors.name ? "has-error" : ""}`}>
                <UserRound aria-hidden="true" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={updateField}
                  placeholder="Your full name"
                  autoComplete="name"
                />
              </div>
              {errors.name ? <small>{errors.name}</small> : null}
            </label>

            <label>
              <span>Email</span>
              <div className={`input-wrap ${errors.email ? "has-error" : ""}`}>
                <Mail aria-hidden="true" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={updateField}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
              {errors.email ? <small>{errors.email}</small> : null}
            </label>

            <label>
              <span>Message</span>
              <div className={`textarea-wrap ${errors.message ? "has-error" : ""}`}>
                <MessageSquareText aria-hidden="true" />
                <textarea
                  name="message"
                  value={form.message}
                  onChange={updateField}
                  placeholder="Write your message for She Can Foundation..."
                  rows={5}
                />
              </div>
              <small className={errors.message ? "" : "helper-text"}>
                {errors.message || `${messageCount}/1200 characters`}
              </small>
            </label>

            <button className="submit-button" type="submit" disabled={status === "loading"}>
              <span>{status === "loading" ? "Submitting..." : "Submit Message"}</span>
              <ArrowRight aria-hidden="true" />
            </button>

            {notice ? (
              <div className={`notice ${status === "success" ? "success" : "error"}`} role="status">
                {status === "success" ? <CheckCircle2 aria-hidden="true" /> : null}
                <span>{notice}</span>
              </div>
            ) : null}
          </form>
        </div>
      </section>
    </main>
  );
}
