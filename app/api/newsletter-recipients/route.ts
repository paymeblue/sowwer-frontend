import { NextResponse } from "next/server";
import { getSql } from "@lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const rows =
    await getSql()`SELECT email FROM newsletter_recipients ORDER BY id`;
  return NextResponse.json({ emails: rows.map((r: any) => r.email) });
}
