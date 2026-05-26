"use client";

import { LockKeyhole, RefreshCw, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [submissions, setSubmissions] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function loadSubmissions(event) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ password })
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to load submissions.");
        setStatus("error");
        return;
      }

      setSubmissions(data.submissions || []);
      setStatus("success");
    } catch (requestError) {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <main className="admin-shell">
      <section className="admin-header">
        <Link href="/" className="back-link">Back to form</Link>
        <div>
          <p className="eyebrow">Private dashboard</p>
          <h1>Submission Admin</h1>
          <p>Review the latest messages submitted through the She Can Foundation form.</p>
        </div>
      </section>

      <section className="admin-toolbar" aria-label="Admin login">
        <form onSubmit={loadSubmissions} className="admin-form">
          <label>
            <span>Admin password</span>
            <div className="input-wrap">
              <LockKeyhole aria-hidden="true" />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
              />
            </div>
          </label>
          <button type="submit" className="submit-button compact" disabled={status === "loading"}>
            <span>{status === "loading" ? "Loading..." : "Load"}</span>
            <RefreshCw aria-hidden="true" />
          </button>
        </form>
        {error ? <p className="admin-error">{error}</p> : null}
      </section>

      <section className="submissions-grid" aria-label="Contact form submissions">
        {status === "success" && submissions.length === 0 ? (
          <div className="empty-state">
            <ShieldCheck aria-hidden="true" />
            <p>No submissions yet.</p>
          </div>
        ) : null}

        {submissions.map((item) => (
          <article className="submission-card" key={item.id}>
            <div>
              <h2>{item.name}</h2>
              <a href={`mailto:${item.email}`}>{item.email}</a>
            </div>
            <p>{item.message}</p>
            <time dateTime={item.created_at}>
              {new Intl.DateTimeFormat("en-IN", {
                dateStyle: "medium",
                timeStyle: "short"
              }).format(new Date(item.created_at))}
            </time>
          </article>
        ))}
      </section>
    </main>
  );
}
