import { NextResponse } from "next/server";

export function ok(data: any) {
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

export function withErrorHandler(handler: Function) {
  return async (req: Request, ...args: any[]) => {
    try {
      return await handler(req, ...args);
    } catch (error: any) {
      console.error("[API_ERROR]:", error);
      return err(error.message || "Internal Server Error", 500);
    }
  };
}
