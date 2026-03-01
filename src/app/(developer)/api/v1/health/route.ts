import { NextResponse } from "next/server";
import { createPartyStackClient } from "../../../lib/partystack-db";

export async function GET() {
  let database = "connected";

  try {
    const supabase = createPartyStackClient();
    // Simple connectivity check — query the built-in schema
    const { error } = await supabase
      .from("committees")
      .select("id")
      .limit(1);
    if (error) database = "error";
  } catch {
    database = "error";
  }

  return NextResponse.json({
    status: "ok",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    database,
  });
}
