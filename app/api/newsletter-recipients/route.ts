import { NextResponse } from "next/server";
import { sql } from "@lib/db";

export const runtime = "nodejs";

export async function GET() {
  const rows = await sql`SELECT email FROM newsletter_recipients ORDER BY id`;
  return NextResponse.json({ emails: rows.map((r: any) => r.email) });
}
