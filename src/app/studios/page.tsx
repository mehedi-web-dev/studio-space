"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

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

export default function ExploreStudiosPage() {
  const [studios, setStudios] = useState<IStudio[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch all studios from backend
  useEffect(() => {
    const fetchStudios = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/studios");

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to load studios.");
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

    fetchStudios();
  }, []);

  // Available categories
  const categories = [
    "All",
    ...Array.from(new Set(studios.map((studio) => studio.category))),
  ];

  // Search and category filtering
  const filteredStudios = studios.filter((studio) => {
    const matchesSearch =
      studio.title.toLowerCase().includes(search.toLowerCase()) ||
      studio.location.toLowerCase().includes(search.toLowerCase()) ||
      studio.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || studio.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-[#f8f7f4] px-5 py-12">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-10 text-center">
          <p className="text-sm font-bold tracking-widest text-[#759c2c]">
            FIND YOUR CREATIVE SPACE
          </p>

          <h1 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-5xl">
            Explore Studios
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
            Discover and book inspiring creative spaces for your photography,
            music, video production and other projects.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Search Input */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Search Studios
              </label>

              <input
                type="text"
                placeholder="Search by title, location or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#759c2c]"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Filter by Category
              </label>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#759c2c]"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Available Studios</h2>

          <p className="text-sm text-gray-500">
            {filteredStudios.length} Studios Found
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-2xl bg-white"
              >
                <div className="h-52 bg-gray-200" />

                <div className="space-y-4 p-5">
                  <div className="h-4 w-1/3 rounded bg-gray-200" />
                  <div className="h-5 w-3/4 rounded bg-gray-200" />
                  <div className="h-4 w-1/2 rounded bg-gray-200" />
                  <div className="h-10 rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredStudios.length === 0 ? (
          /* Empty State */
          <div className="rounded-2xl border border-gray-200 bg-white px-5 py-16 text-center">
            <h2 className="text-xl font-bold text-gray-900">
              No Studios Found
            </h2>

            <p className="mt-3 text-sm text-gray-500">
              Try changing your search or category filter.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
              className="mt-6 rounded-xl bg-[#c7f36b] px-6 py-3 text-sm font-bold text-gray-900 transition hover:bg-[#b8e65b]"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          /* Studio Cards */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStudios.map((studio) => (
              <article
                key={studio._id}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Studio Image */}
                <div className="relative">
                  <img
                    src={studio.image}
                    alt={studio.title}
                    className="h-56 w-full object-cover"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-gray-800 shadow-sm">
                    {studio.category}
                  </span>
                </div>

                {/* Studio Information */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900">
                    {studio.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    {studio.location}
                  </p>

                  <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-600">
                    {studio.description}
                  </p>

                  {/* Studio Details */}
                  <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                    <div>
                      <p className="text-xs text-gray-500">Hourly Rate</p>

                      <p className="mt-1 text-xl font-extrabold text-gray-900">
                        ${studio.hourlyRate}
                        <span className="text-xs font-normal text-gray-500">
                          /hr
                        </span>
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-gray-500">Capacity</p>

                      <p className="mt-1 text-sm font-bold text-gray-900">
                        {studio.capacity} People
                      </p>
                    </div>
                  </div>

                  {/* Amenities */}
                  {studio.amenities?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {studio.amenities.slice(0, 3).map((amenity) => (
                        <span
                          key={amenity}
                          className="rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-600"
                        >
                          {amenity}
                        </span>
                      ))}

                      {studio.amenities.length > 3 && (
                        <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-600">
                          +{studio.amenities.length - 3} More
                        </span>
                      )}
                    </div>
                  )}

                  {/* View Details Button */}
                  <Link
                    href={`/studios/${studio._id}`}
                    className="mt-5 block w-full rounded-xl bg-[#c7f36b] px-5 py-3.5 text-center text-sm font-bold text-gray-900 transition hover:bg-[#b8e65b]"
                  >
                    View Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
