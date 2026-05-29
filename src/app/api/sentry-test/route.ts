import * as Sentry from "@sentry/nextjs";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    throw new Error("Aurews Sentry Server Test Error");
  } catch (error) {
    Sentry.captureException(error);

    await Sentry.flush(2000);

    return NextResponse.json(
      {
        ok: false,
        message: "Server test error was captured and sent to Sentry.",
      },
      { status: 500 }
    );
  }
}