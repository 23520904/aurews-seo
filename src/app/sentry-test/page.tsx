import SentryTestClient from "./sentry-test-client";

export default function SentryTestPage() {
  const isEnabled =
    process.env.NODE_ENV !== "production" ||
    process.env.NEXT_PUBLIC_ENABLE_SENTRY_TEST === "true";

  if (!isEnabled) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-xl rounded-lg border p-6">
          <h1 className="text-2xl font-bold">Sentry Test Disabled</h1>
          <p className="mt-3 text-sm text-gray-600">
            This page is disabled in production. Set
            NEXT_PUBLIC_ENABLE_SENTRY_TEST=true to enable it temporarily.
          </p>
        </div>
      </main>
    );
  }

  return <SentryTestClient />;
}