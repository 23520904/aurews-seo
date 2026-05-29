"use client";

import { useState } from "react";

export default function SentryTestClient() {
  const [serverResult, setServerResult] = useState<string>("");

  const testClientError = () => {
    throw new Error("Aurews Sentry Client Test Error");
  };

  const testServerError = async () => {
    setServerResult("Calling server error endpoint...");

    try {
      const response = await fetch("/api/sentry-test", {
        method: "POST",
      });

      const data = await response.json().catch(() => null);

      setServerResult(
        `Server responded with status ${response.status}: ${
          data?.message ?? "No JSON response"
        }`
      );
    } catch (error) {
      setServerResult(
        error instanceof Error
          ? `Fetch failed: ${error.message}`
          : "Fetch failed with unknown error"
      );
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-xl rounded-lg border p-6 space-y-5">
        <div>
          <h1 className="text-2xl font-bold">Aurews Sentry Test</h1>
          <p className="mt-2 text-sm text-gray-600">
            Use this page to verify Sentry client-side and server-side error
            reporting.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={testClientError}
            className="rounded-md border px-4 py-2 text-left hover:bg-gray-50"
          >
            Test Client Error
          </button>

          <button
            type="button"
            onClick={testServerError}
            className="rounded-md border px-4 py-2 text-left hover:bg-gray-50"
          >
            Test Server Error
          </button>
        </div>

        {serverResult && (
          <pre className="overflow-auto rounded-md bg-gray-100 p-3 text-sm">
            {serverResult}
          </pre>
        )}

        <p className="text-xs text-gray-500">
          Remove this route or disable NEXT_PUBLIC_ENABLE_SENTRY_TEST after
          testing.
        </p>
      </div>
    </main>
  );
}