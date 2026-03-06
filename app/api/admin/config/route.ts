import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getConfig, saveConfig, getSchedule, saveSchedule } from "@/lib/sheets";

export async function GET() {
  try {
    const [config, schedule] = await Promise.all([getConfig(), getSchedule()]);
    return NextResponse.json({ config, schedule });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { config, schedule } = await request.json();
    await Promise.all([saveConfig(config), saveSchedule(schedule)]);
    // Immediately bust ISR cache for all public pages that use config
    const paths = ["/", "/visitors", "/visitors/faq", "/visitors/youth", "/events", "/events/raffle", "/dealers", "/dealers/faq", "/dealers/directory"];
    paths.forEach((p) => revalidatePath(p));
    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
