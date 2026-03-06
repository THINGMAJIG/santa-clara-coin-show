import { NextRequest, NextResponse } from "next/server";
import { getDealers, saveDealers } from "@/lib/sheets";

export async function GET() {
  try {
    const dealers = await getDealers();
    return NextResponse.json(dealers);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const dealers = await request.json();
    await saveDealers(dealers);
    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
