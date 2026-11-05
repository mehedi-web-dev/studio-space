"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  CalendarDays,
  Clock,
  CheckCircle2,
  Plus,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { API_URL } from "@/lib/api";
import Container from "../component/Container";

interface IStudio {
  _id: string;
  title: string;
  category: string;
}

interface IBooking {
  _id: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

export default function DashboardPage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [studios, setStudios] = useState<IStudio[]>([]);
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Dashboard Data
  useEffect(() => {
    if (isPending) return;

    if (!session) {
      router.replace("/sign-in");
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const [studioResponse, bookingResponse] = await Promise.all([
          fetch(`${API_URL}/api/studios/my-listings`, {
            method: "GET",
            credentials: "include",
          }),

          fetch(`${API_URL}/api/bookings/my-bookings`, {
            method: "GET",
            credentials: "include",
          }),
        ]);

        const [studioResult, bookingResult] = await Promise.all([
          studioResponse.json(),
          bookingResponse.json(),
        ]);

        if (!studioResponse.ok) {
          throw new Error(
            studioResult.message || "Failed to load your studios.",
          );
        }

        if (!bookingResponse.ok) {
          throw new Error(
            bookingResult.message || "Failed to load your bookings.",
          );
        }

        setStudios(Array.isArray(studioResult.data) ? studioResult.data : []);

        setBookings(
          Array.isArray(bookingResult.data) ? bookingResult.data : [],
        );
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to load dashboard.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [session, isPending, router]);

  // Loading State
  if (isPending || loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#f8f7f4] transition-colors duration-300 dark:bg-[#111827]">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Loading dashboard...
        </p>
      </main>
    );
  }

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "pending",
  ).length;

  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "confirmed",
  ).length;

  const dashboardStats = [
    {
      title: "My Studios",
      value: studios.length,
      description: "Your listed creative spaces",
      icon: Building2,
      color:
        "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400",
      href: "/my-listings",
    },
    {
      title: "Total Bookings",
      value: bookings.length,
      description: "All your reservations",
      icon: CalendarDays,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400",
      href: "/my-bookings",
    },
    {
      title: "Pending Bookings",
      value: pendingBookings,
      description: "Waiting for host approval",
      icon: Clock,
      color:
        "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/15 dark:text-yellow-400",
      href: "/my-bookings",
    },
    {
      title: "Confirmed Bookings",
      value: confirmedBookings,
      description: "Approved reservations",
      icon: CheckCircle2,
      color:
        "bg-green-100 text-green-600 dark:bg-green-500/15 dark:text-green-400",
      href: "/my-bookings",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f8f7f4] py-12 transition-colors duration-300 dark:bg-[#111827]">
      <Container>
        {/* Dashboard Header */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-[#759c2c] dark:text-[#c7f36b]">
              YOUR ACCOUNT
            </p>

            <h1 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white">
              Dashboard
            </h1>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Manage your studios and track your bookings.
            </p>
          </div>

          <Link
            href="/add-studio"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#c7f36b] px-5 py-3 text-sm font-bold text-gray-900 transition hover:bg-[#b8e65b]"
          >
            <Plus size={18} />
            Add New Studio
          </Link>
        </div>

        {/* Statistics */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dashboardStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <Link
                href={stat.href}
                key={stat.title}
                className="rounded-2xl border border-gray-100 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}
                  >
                    <Icon size={23} />
                  </div>

                  <ArrowRight
                    size={18}
                    className="text-gray-400 dark:text-gray-500"
                  />
                </div>

                <p className="mt-5 text-sm font-medium text-gray-500 dark:text-gray-400">
                  {stat.title}
                </p>

                <h2 className="mt-1 text-3xl font-extrabold text-gray-900 dark:text-white">
                  {stat.value}
                </h2>

                <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                  {stat.description}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Quick Actions */}
        <section className="mt-10 rounded-2xl border border-gray-100 bg-white p-6 transition-colors duration-300 dark:border-gray-700 dark:bg-gray-800 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Quick Actions
          </h2>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Quickly access your studio and booking management.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/add-studio"
              className="flex items-center justify-between rounded-xl border border-gray-200 p-5 transition hover:border-indigo-400 hover:bg-indigo-50 dark:border-gray-600 dark:hover:border-indigo-400 dark:hover:bg-indigo-500/10"
            >
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Add New Studio
                </h3>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  List your creative space.
                </p>
              </div>

              <Plus className="text-indigo-600 dark:text-indigo-400" />
            </Link>

            <Link
              href="/my-listings"
              className="flex items-center justify-between rounded-xl border border-gray-200 p-5 transition hover:border-indigo-400 hover:bg-indigo-50 dark:border-gray-600 dark:hover:border-indigo-400 dark:hover:bg-indigo-500/10"
            >
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  My Studio Listings
                </h3>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Manage your studios.
                </p>
              </div>

              <Building2 className="text-indigo-600 dark:text-indigo-400" />
            </Link>

            <Link
              href="/my-bookings"
              className="flex items-center justify-between rounded-xl border border-gray-200 p-5 transition hover:border-indigo-400 hover:bg-indigo-50 dark:border-gray-600 dark:hover:border-indigo-400 dark:hover:bg-indigo-500/10"
            >
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  My Bookings
                </h3>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Track your reservations.
                </p>
              </div>

              <CalendarDays className="text-indigo-600 dark:text-indigo-400" />
            </Link>
          </div>
        </section>
      </Container>
    </main>
  );
}
