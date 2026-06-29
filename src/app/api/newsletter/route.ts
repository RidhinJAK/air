import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { newsletters } from "@/db/schema";
import { z } from "zod";

const schema = z.object({
  email: z.string().email().max(255),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    await db
      .insert(newsletters)
      .values({ email: data.email })
      .onConflictDoNothing();

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    console.error("Newsletter error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
