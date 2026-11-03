"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
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
  host: {
    name: string;
    email: string;
  };
  createdAt: string;
}

export default function StudioDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: session, isPending } = authClient.useSession();

  const [studio, setStudio] = useState<IStudio | null>(null);
  const [loading, setLoading] = useState(true);

  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [bookingLoading, setBookingLoading] = useState(false);

  // Get Studio Details
  useEffect(() => {
    const fetchStudio = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/studios/${id}`);

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to load studio.");
        }

        setStudio(result.data);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Something went wrong.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStudio();
    }
  }, [id]);

  // Calculate Booking Hours
  const calculateHours = () => {
    if (!startTime || !endTime) return 0;

    const start = startTime.split(":").map(Number);
    const end = endTime.split(":").map(Number);

    const startMinutes = start[0] * 60 + start[1];
    const endMinutes = end[0] * 60 + end[1];

    if (endMinutes <= startMinutes) return 0;

    return (endMinutes - startMinutes) / 60;
  };

  const totalHours = calculateHours();

  const totalPrice = studio
    ? totalHours * studio.hourlyRate + studio.securityDeposit
    : 0;

  // Booking Submit
 
const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!session) {
    toast.error("Please login to book this studio.");
    router.push("/sign-in");
    return;
  }

  if (!bookingDate || !startTime || !endTime) {
    toast.error("Please fill in all booking fields.");
    return;
  }

  if (totalHours <= 0) {
    toast.error("End time must be later than start time.");
    return;
  }

  try {
    setBookingLoading(true);

    // Get JWT token
    const { data: tokenData, error: tokenError } = await authClient.token();

    if (tokenError || !tokenData?.token) {
      throw new Error("Authentication failed. Please login again.");
    }

    // Send booking request to backend
    const response = await fetch("http://localhost:8000/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenData.token}`,
      },
      body: JSON.stringify({
        studioId: id,
        bookingDate,
        startTime,
        endTime,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Booking failed.");
    }

    toast.success("Booking request submitted successfully!");

    // Reset booking form
    setBookingDate("");
    setStartTime("");
    setEndTime("");
  } catch (error) {
    toast.error(
      error instanceof Error ? error.message : "Something went wrong.",
    );
  } finally {
    setBookingLoading(false);
  }
};


  // Loading State
  if (loading || isPending) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-500">Loading studio details...</p>
      </main>
    );
  }

  // Not Found
  if (!studio) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center px-5">
        <h1 className="text-2xl font-bold text-gray-900">Studio Not Found</h1>

        <Link
          href="/explore-studios"
          className="mt-5 rounded-xl bg-[#c7f36b] px-6 py-3 font-semibold text-gray-900"
        >
          Explore Studios
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f7f4] px-5 py-12">
      <div className="mx-auto max-w-7xl">
        {/* Back Button */}
        <Link
          href="/explore-studios"
          className="mb-6 inline-flex text-sm font-semibold text-gray-600 hover:text-[#759c2c]"
        >
          ← Back to Studios
        </Link>

        {/* Studio Image */}
        <div className="overflow-hidden rounded-3xl bg-white">
          <img
            src={studio.image}
            alt={studio.title}
            className="h-[300px] w-full object-cover sm:h-[450px]"
          />
        </div>

        {/* Main Content */}
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Studio Information */}
          <div className="space-y-7 lg:col-span-2">
            <div>
              <span className="rounded-full bg-[#c7f36b]/40 px-4 py-2 text-sm font-semibold text-gray-800">
                {studio.category}
              </span>

              <h1 className="mt-5 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                {studio.title}
              </h1>

              <p className="mt-3 text-gray-500">Location: {studio.location}</p>
            </div>

            {/* Studio Details */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-white p-5">
                <p className="text-sm text-gray-500">Hourly Rate</p>
                <p className="mt-2 text-xl font-bold text-gray-900">
                  ${studio.hourlyRate}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5">
                <p className="text-sm text-gray-500">Capacity</p>
                <p className="mt-2 text-xl font-bold text-gray-900">
                  {studio.capacity} People
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5">
                <p className="text-sm text-gray-500">Security Deposit</p>
                <p className="mt-2 text-xl font-bold text-gray-900">
                  ${studio.securityDeposit}
                </p>
              </div>
            </div>

            {/* Description */}
            <section className="rounded-2xl bg-white p-6">
              <h2 className="text-xl font-bold text-gray-900">
                About This Studio
              </h2>

              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-gray-600">
                {studio.description}
              </p>
            </section>

            {/* Amenities */}
            <section className="rounded-2xl bg-white p-6">
              <h2 className="text-xl font-bold text-gray-900">
                Studio Amenities
              </h2>

              {studio.amenities?.length > 0 ? (
                <div className="mt-5 flex flex-wrap gap-3">
                  {studio.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="rounded-xl bg-gray-100 px-4 py-2 text-sm text-gray-700"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-gray-500">
                  No amenities listed.
                </p>
              )}
            </section>

            {/* Host Information */}
            <section className="rounded-2xl bg-white p-6">
              <h2 className="text-xl font-bold text-gray-900">Hosted By</h2>

              <p className="mt-3 text-gray-700">
                {studio.host?.name || "Studio Host"}
              </p>
            </section>
          </div>

          {/* Booking Form */}
          <aside>
            <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Starting from</p>

              <h2 className="mt-1 text-3xl font-extrabold text-gray-900">
                ${studio.hourlyRate}
                <span className="text-sm font-normal text-gray-500">
                  {" "}
                  / hour
                </span>
              </h2>

              <form onSubmit={handleBooking} className="mt-6 space-y-5">
                {/* Booking Date */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Booking Date
                  </label>

                  <input
                    type="date"
                    required
                    min={new Date().toLocaleDateString("en-CA")}
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#759c2c]"
                  />
                </div>

                {/* Start Time */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Start Time
                  </label>

                  <input
                    type="time"
                    required
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#759c2c]"
                  />
                </div>

                {/* End Time */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    End Time
                  </label>

                  <input
                    type="time"
                    required
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#759c2c]"
                  />
                </div>

                {/* Price Calculation */}
                <div className="rounded-xl bg-[#f8f7f4] p-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Booking Hours</span>
                    <span>{totalHours}</span>
                  </div>

                  <div className="mt-3 flex justify-between text-sm text-gray-600">
                    <span>Hourly Cost</span>
                    <span>${totalHours * studio.hourlyRate}</span>
                  </div>

                  <div className="mt-3 flex justify-between text-sm text-gray-600">
                    <span>Security Deposit</span>
                    <span>${studio.securityDeposit}</span>
                  </div>

                  <div className="mt-4 border-t border-gray-200 pt-4">
                    <div className="flex justify-between font-bold text-gray-900">
                      <span>Estimated Total</span>
                      <span>${totalPrice}</span>
                    </div>
                  </div>
                </div>

                {/* Book Now Button */}
                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="w-full rounded-xl bg-[#c7f36b] px-5 py-4 font-bold text-gray-900 transition hover:bg-[#b8e65b] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {bookingLoading ? "Submitting..." : "Book Now"}
                </button>

                <p className="text-center text-xs text-gray-500">
                  Your booking will be subject to host approval.
                </p>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
