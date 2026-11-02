"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function TestAuthPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const testProtectedAPI = async () => {
    try {
      setLoading(true);
      setResult("");

      // Get JWT token from Better Auth
      const { data, error } = await authClient.token();

      if (error || !data?.token) {
        setResult("Failed to get JWT token. Please login first.");
        return;
      }

      // Send JWT token to Express backend
      const response = await fetch("http://localhost:8000/api/protected", {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
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
    <main className="mx-auto max-w-2xl px-5 py-20">
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
