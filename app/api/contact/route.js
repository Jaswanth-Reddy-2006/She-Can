import { NextResponse } from "next/server";
import { ensureContactSchema, getPool } from "@/lib/db";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function validateSubmission({ name, email, message }) {
  const errors = {};

  if (name.length < 2) {
    errors.name = "Please enter at least 2 characters.";
  }

  if (!emailPattern.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (message.length < 10) {
    errors.message = "Please write at least 10 characters.";
  }

  return errors;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const submission = {
      name: cleanText(body.name).slice(0, 90),
      email: cleanText(body.email).toLowerCase().slice(0, 180),
      message: cleanText(body.message).slice(0, 1200)
    };

    const errors = validateSubmission(submission);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const hasDatabase = await ensureContactSchema();

    if (hasDatabase) {
      await getPool().query(
        "INSERT INTO contact_submissions (name, email, message) VALUES ($1, $2, $3)",
        [submission.name, submission.email, submission.message]
      );
    }

    return NextResponse.json(
      {
        message: "Form Submitted Successfully",
        stored: hasDatabase
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact submission failed:", error);
    return NextResponse.json(
      { error: "Unable to submit the form right now. Please try again." },
      { status: 500 }
    );
  }
}
