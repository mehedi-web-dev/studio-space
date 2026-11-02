"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

interface IStudio {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit: number;
  capacity: number;
  location: string;
  image: string;
  amenities: string[];
  description: string;
  createdAt: string;
}

export default function MyListingsPage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [studios, setStudios] = useState<IStudio[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudio, setSelectedStudio] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Fetch logged-in user's studio listings
  useEffect(() => {
    if (isPending) return;

    if (!session) {
      router.replace("/sign-in");
      return;
    }

    const fetchMyListings = async () => {
      try {
        const { data: tokenData, error: tokenError } = await authClient.token();

        if (tokenError || !tokenData?.token) {
          toast.error("Authentication failed. Please login again.");
          return;
        }

        const response = await fetch(
          "http://localhost:8000/api/studios/my-listings",
          {
            headers: {
              Authorization: `Bearer ${tokenData.token}`,
            },
          },
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to load listings.");
        }

        setStudios(result.data);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Something went wrong.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyListings();
  }, [session, isPending, router]);

  // Delete studio
  const handleDelete = async () => {
    if (!selectedStudio) return;

    try {
      setDeleting(true);

      const { data: tokenData, error: tokenError } = await authClient.token();

      if (tokenError || !tokenData?.token) {
        toast.error("Authentication failed. Please login again.");
        return;
      }

      const response = await fetch(
        `http://localhost:8000/api/studios/${selectedStudio}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${tokenData.token}`,
          },
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete studio.");
      }

      setStudios((prev) =>
        prev.filter((studio) => studio._id !== selectedStudio),
      );

      setSelectedStudio(null);

      toast.success("Studio deleted successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Delete failed.");
    } finally {
      setDeleting(false);
    }
  };

  // Loading state
  if (isPending || loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#f8f7f4]">
        <p className="text-sm text-gray-500">Loading your studios...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f7f4] px-5 py-12">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-[#759c2c]">
              HOST DASHBOARD
            </p>

            <h1 className="mt-2 text-3xl font-extrabold text-[#191919]">
              My Studio Listings
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage all the creative spaces you have listed.
            </p>
          </div>

          <Link
            href="/add-studio"
            className="inline-flex items-center justify-center rounded-xl bg-[#c7f36b] px-5 py-3 text-sm font-bold text-[#171717] transition hover:bg-[#b8e65b]"
          >
            + Add New Studio
          </Link>
        </div>

        {/* Empty State */}
        {studios.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-5 py-16 text-center">
            <h2 className="text-xl font-bold text-gray-900">
              No Studios Listed Yet
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Start sharing your creative space with others.
            </p>

            <Link
              href="/add-studio"
              className="mt-6 inline-flex rounded-xl bg-[#c7f36b] px-5 py-3 text-sm font-bold text-gray-900"
            >
              Add Your First Studio
            </Link>
          </div>
        ) : (
          <>
            {/* Total Listings */}
            <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm text-gray-500">Total Listings</p>

              <p className="mt-1 text-2xl font-bold text-gray-900">
                {studios.length}
              </p>
            </div>

            {/* Studio Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {studios.map((studio) => (
                <article
                  key={studio._id}
                  className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <img
                    src={studio.image}
                    alt={studio.title}
                    className="h-52 w-full object-cover"
                  />

                  <div className="p-5">
                    <span className="rounded-full bg-[#c7f36b]/30 px-3 py-1 text-xs font-semibold text-gray-800">
                      {studio.category}
                    </span>

                    <h2 className="mt-4 text-lg font-bold text-gray-900">
                      {studio.title}
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                      {studio.location}
                    </p>

                    <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                      <div>
                        <p className="text-xs text-gray-500">Hourly Rate</p>

                        <p className="text-lg font-bold text-gray-900">
                          ${studio.hourlyRate}
                          <span className="text-xs font-normal text-gray-500">
                            /hr
                          </span>
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-gray-500">Capacity</p>

                        <p className="text-sm font-semibold text-gray-900">
                          {studio.capacity} People
                        </p>
                      </div>
                    </div>

                    <p className="mt-3 text-sm text-gray-500">
                      Security Deposit: ${studio.securityDeposit}
                    </p>

                    {/* Amenities */}
                    {studio.amenities?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {studio.amenities.map((amenity) => (
                          <span
                            key={amenity}
                            className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Created Date */}
                    <div className="mt-5 border-t border-gray-100 pt-4">
                      <p className="text-xs text-gray-500">
                        Listed on{" "}
                        {new Date(studio.createdAt).toLocaleDateString()}
                      </p>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => setSelectedStudio(studio._id)}
                        className="mt-4 w-full rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                      >
                        Delete Studio
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {selectedStudio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-gray-900">Delete Studio?</h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Are you sure you want to delete this studio? This action cannot be
              undone.
            </p>

            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setSelectedStudio(null)}
                className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deleting}
                onClick={handleDelete}
                className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
