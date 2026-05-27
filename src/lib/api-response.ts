import { NextResponse } from "next/server";

export function ok(data: unknown) {
  return NextResponse.json({
    success: true,
    data
  });
}

export function err(message: string, status = 400) {
  return NextResponse.json({
    success: false,
    error: message
  }, { status });
}

export function withErrorHandler(handler: (req: Request, ...args: unknown[]) => Promise<NextResponse | Response>) {
  return async (req: Request, ...args: unknown[]) => {
    try {
      return await handler(req, ...args);
    } catch (error: unknown) {
      console.error("[API_ERROR]:", error);
      return err(error instanceof Error ? error.message : "Internal Server Error", 500);
    }
  };
}
