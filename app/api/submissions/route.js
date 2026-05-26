import { NextResponse } from "next/server";
import { ensureContactSchema, getPool } from "@/lib/db";

export async function POST(request) {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return NextResponse.json(
      { error: "Admin view is not configured yet." },
      { status: 503 }
    );
  }

  const body = await request.json();

  if (body.password !== adminPassword) {
    return NextResponse.json({ error: "Invalid admin password." }, { status: 401 });
  }

  const hasDatabase = await ensureContactSchema();

  if (!hasDatabase) {
    return NextResponse.json(
      { error: "Database connection is not configured." },
      { status: 503 }
    );
  }

  const { rows } = await getPool().query(`
    SELECT id, name, email, message, created_at
    FROM contact_submissions
    ORDER BY created_at DESC
    LIMIT 50;
  `);

  return NextResponse.json({ submissions: rows });
}
