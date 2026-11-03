"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

interface IStudio {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  location: string;
  image: string;
  rating?: number;
}

export default function FeaturedStudios() {
  const [studios, setStudios] = useState<IStudio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedStudios = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/studios/featured",
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch featured studios");
        }

        setStudios(result.data);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Something went wrong",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedStudios();
  }, []);

  return (
    <section className="bg-[#f8f7f4] px-5 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-[#759c2c]">
              Explore Our Collection
            </p>

            <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Featured Studios
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
              Discover creative spaces designed to bring your ideas to life.
            </p>
          </div>

          <Link
            href="/explore-studios"
            className="text-sm font-bold text-gray-900 transition hover:text-[#759c2c]"
          >
            Explore All Studios →
          </Link>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse overflow-hidden rounded-2xl bg-white"
              >
                <div className="h-56 bg-gray-200" />
                <div className="space-y-3 p-5">
                  <div className="h-4 w-24 rounded bg-gray-200" />
                  <div className="h-5 w-3/4 rounded bg-gray-200" />
                  <div className="h-4 w-1/2 rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        ) : studios.length === 0 ? (
          /* Empty State */
          <div className="rounded-2xl bg-white px-5 py-16 text-center">
            <h3 className="text-xl font-bold text-gray-900">
              No Studios Available
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              New creative spaces will appear here.
            </p>
          </div>
        ) : (
          /* Studio Cards */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map((studio) => (
              <article
                key={studio._id}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Studio Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={studio.image}
                    alt={studio.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-[#e6f7b9] px-3 py-1.5 text-xs font-bold text-gray-900">
                    {studio.category}
                  </span>

                  {typeof studio.rating === "number" && (
                    <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-gray-900">
                      ★ {studio.rating.toFixed(1)}
                    </span>
                  )}
                </div>

                {/* Studio Information */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900">
                    {studio.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    {studio.location}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                    <p className="text-lg font-extrabold text-gray-900">
                      ${studio.hourlyRate}
                      <span className="ml-1 text-xs font-normal text-gray-500">
                        / hr
                      </span>
                    </p>

                    <Link
                      href={`/studios/${studio._id}`}
                      className="rounded-xl bg-[#c7f36b] px-4 py-2.5 text-sm font-bold text-gray-900 transition hover:bg-[#b8e65b]"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
