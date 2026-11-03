"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

interface IBooking {
  _id: string;
  studioId: string;
  studioTitle: string;
  studioImage: string;
  hostName: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  totalHours: number;
  hourlyRate: number;
  securityDeposit: number;
  totalAmount: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

export default function MyBookingsPage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(true);

  // Cancel Booking States
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState(false);

  // Fetch My Bookings
  useEffect(() => {
    if (isPending) return;

    if (!session) {
      router.replace("/sign-in");
      return;
    }

    const fetchMyBookings = async () => {
      try {
        const { data: tokenData, error: tokenError } = await authClient.token();

        if (tokenError || !tokenData?.token) {
          throw new Error("Authentication failed. Please login again.");
        }

        const response = await fetch(
          "http://localhost:8000/api/bookings/my-bookings",
          {
            headers: {
              Authorization: `Bearer ${tokenData.token}`,
            },
          },
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to load bookings.");
        }

        setBookings(result.data);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Something went wrong.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyBookings();
  }, [session, isPending, router]);

  // Cancel Booking
  const handleCancelBooking = async () => {
    if (!selectedBooking) return;

    try {
      setCancelling(true);

      // Get JWT Token
      const { data: tokenData, error: tokenError } = await authClient.token();

      if (tokenError || !tokenData?.token) {
        throw new Error("Authentication failed. Please login again.");
      }

      // Send Cancel Request
      const response = await fetch(
        `http://localhost:8000/api/bookings/${selectedBooking}/cancel`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${tokenData.token}`,
          },
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to cancel booking.");
      }

      // Update Booking Status
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === selectedBooking
            ? { ...booking, status: "cancelled" }
            : booking,
        ),
      );

      setSelectedBooking(null);

      toast.success("Booking cancelled successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to cancel booking.",
      );
    } finally {
      setCancelling(false);
    }
  };

  // Status Badge
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "confirmed":
        return "bg-green-100 text-green-700";

      case "completed":
        return "bg-blue-100 text-blue-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Loading State
  if (isPending || loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#f8f7f4]">
        <p className="text-sm text-gray-500">Loading your bookings...</p>
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
              CREATOR DASHBOARD
            </p>

            <h1 className="mt-2 text-3xl font-extrabold text-gray-900">
              My Bookings
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage and track all your studio reservations.
            </p>
          </div>

          <Link
            href="/explore-studios"
            className="inline-flex items-center justify-center rounded-xl bg-[#c7f36b] px-5 py-3 text-sm font-bold text-gray-900 transition hover:bg-[#b8e65b]"
          >
            Explore Studios
          </Link>
        </div>

        {/* Booking Statistics */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-sm text-gray-500">Total Bookings</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">
              {bookings.length}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="mt-2 text-2xl font-bold text-yellow-600">
              {bookings.filter((b) => b.status === "pending").length}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-sm text-gray-500">Confirmed</p>
            <p className="mt-2 text-2xl font-bold text-green-600">
              {bookings.filter((b) => b.status === "confirmed").length}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-sm text-gray-500">Cancelled</p>
            <p className="mt-2 text-2xl font-bold text-red-600">
              {bookings.filter((b) => b.status === "cancelled").length}
            </p>
          </div>
        </div>

        {/* Empty State */}
        {bookings.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-5 py-16 text-center">
            <h2 className="text-xl font-bold text-gray-900">No Bookings Yet</h2>

            <p className="mt-3 text-sm text-gray-500">
              You haven&apos;t booked any creative studio yet.
            </p>

            <Link
              href="/explore-studios"
              className="mt-6 inline-flex rounded-xl bg-[#c7f36b] px-6 py-3 text-sm font-bold text-gray-900 transition hover:bg-[#b8e65b]"
            >
              Explore Studios
            </Link>
          </div>
        ) : (
          /* Booking Cards */
          <div className="space-y-5">
            {bookings.map((booking) => (
              <article
                key={booking._id}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
              >
                <div className="grid md:grid-cols-[240px_1fr]">
                  {/* Studio Image */}
                  <img
                    src={booking.studioImage}
                    alt={booking.studioTitle}
                    className="h-52 w-full object-cover md:h-full"
                  />

                  {/* Booking Information */}
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span
                        className={`rounded-full px-4 py-1.5 text-xs font-bold capitalize ${getStatusStyle(
                          booking.status,
                        )}`}
                      >
                        {booking.status}
                      </span>

                      <span className="text-xs text-gray-400">
                        Booking ID: {booking._id.slice(-8)}
                      </span>
                    </div>

                    <h2 className="mt-4 text-xl font-bold text-gray-900">
                      {booking.studioTitle}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Hosted by {booking.hostName}
                    </p>

                    {/* Booking Details */}
                    <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <div>
                        <p className="text-xs text-gray-500">Booking Date</p>

                        <p className="mt-1 text-sm font-semibold text-gray-800">
                          {new Date(
                            `${booking.bookingDate}T12:00:00`,
                          ).toLocaleDateString()}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">Booking Time</p>

                        <p className="mt-1 text-sm font-semibold text-gray-800">
                          {booking.startTime} - {booking.endTime}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">Duration</p>

                        <p className="mt-1 text-sm font-semibold text-gray-800">
                          {booking.totalHours} Hours
                        </p>
                      </div>
                    </div>

                    {/* Price Information */}
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-5">
                      <div>
                        <p className="text-xs text-gray-500">Total Amount</p>

                        <p className="mt-1 text-2xl font-extrabold text-gray-900">
                          ${booking.totalAmount}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Link
                          href={`/studios/${booking.studioId}`}
                          className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                        >
                          View Studio
                        </Link>

                        {/* Cancel Booking Button */}
                        {booking.status === "pending" && (
                          <button
                            type="button"
                            onClick={() => setSelectedBooking(booking._id)}
                            className="rounded-xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                          >
                            Cancel Booking
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Cancel Booking Confirmation Modal */}
      {selectedBooking && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5"
          onClick={(e) => {
            if (e.target === e.currentTarget && !cancelling) {
              setSelectedBooking(null);
            }
          }}
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-gray-900">Cancel Booking?</h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Are you sure you want to cancel this booking? This action cannot
              be undone.
            </p>

            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                disabled={cancelling}
                onClick={() => setSelectedBooking(null)}
                className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 disabled:opacity-50"
              >
                Keep Booking
              </button>

              <button
                type="button"
                disabled={cancelling}
                onClick={handleCancelBooking}
                className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {cancelling ? "Cancelling..." : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
