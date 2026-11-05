"use client";

import { useState } from "react";
import { API_URL } from "@/lib/api";

export default function TestAuthPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const testProtectedAPI = async () => {
    try {
      setLoading(true);
      setResult("");

      // Call the protected backend endpoint through the same-origin proxy,
      // sending the Better Auth HTTPOnly session cookie. No Bearer token
      // or client-held JWT is used.
      const response = await fetch(`${API_URL}/api/protected`, {
        method: "GET",
        credentials: "include",
      });

      const responseData = await response.json();

      setResult(JSON.stringify(responseData, null, 2));
    } catch (error) {
      console.error(error);
      setResult("Something went wrong. Check your server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold">JWT Authentication Test</h1>

      <p className="mt-3 text-gray-500">
        Test Better Auth JWT with Express Backend.
      </p>

      <button
        onClick={testProtectedAPI}
        disabled={loading}
        className="mt-6 rounded-lg bg-black px-6 py-3 text-white disabled:opacity-50"
      >
        {loading ? "Testing..." : "Test Protected API"}
      </button>

      {result && (
        <pre className="mt-6 overflow-x-auto rounded-lg bg-gray-100 p-5 text-sm text-black">
          {result}
        </pre>
      )}
    </main>
  );
}
