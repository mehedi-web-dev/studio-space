"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { API_URL } from "@/lib/api";

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
  rating?: number;
  createdAt: string;
}

const defaultCategories = [
  "All",
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
];

// Subscribe to browser URL changes
function subscribeToURL(callback: () => void) {
  window.addEventListener("popstate", callback);
  window.addEventListener("categorychange", callback);

  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener("categorychange", callback);
  };
}

// Read selected category from URL
function getCategoryFromURL() {
  return new URLSearchParams(window.location.search).get("category") || "All";
}

function getServerCategory() {
  return "All";
}

export default function ExploreStudiosPage() {
  const [studios, setStudios] = useState<IStudio[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Read category directly from URL
  const selectedCategory = useSyncExternalStore(
    subscribeToURL,
    getCategoryFromURL,
    getServerCategory,
  );

  // Update URL when category changes
  const handleCategoryChange = (category: string) => {
    const url = new URL(window.location.href);

    if (category === "All") {
      url.searchParams.delete("category");
    } else {
      url.searchParams.set("category", category);
    }

    window.history.pushState(null, "", url);
    window.dispatchEvent(new Event("categorychange"));
  };

  // Fetch all studios from backend
  useEffect(() => {
    const fetchStudios = async () => {
      try {
        const response = await fetch(`${API_URL}/api/studios`);

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
    ...defaultCategories,
    ...Array.from(new Set(studios.map((studio) => studio.category))).filter(
      (category) => !defaultCategories.includes(category),
    ),
  ];

  // Search and category filtering
  const filteredStudios = studios.filter((studio) => {
    const searchTerm = search.toLowerCase();

    const matchesSearch =
      studio.title.toLowerCase().includes(searchTerm) ||
      studio.location.toLowerCase().includes(searchTerm) ||
      studio.category.toLowerCase().includes(searchTerm);

    const matchesCategory =
      selectedCategory === "All" || studio.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Clear filters
  const clearFilters = () => {
    setSearch("");
    handleCategoryChange("All");
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-[#759c2c] dark:border-[#383838] dark:bg-[#252525] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-[#c7f36b]";

  return (
    <main className="min-h-screen bg-[#f8f7f4] px-5 py-12 transition-colors duration-300 dark:bg-[#121212]">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-10 text-center">
          <p className="text-sm font-bold tracking-widest text-[#759c2c] dark:text-[#c7f36b]">
            FIND YOUR CREATIVE SPACE
          </p>

          <h1 className="mt-3 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
            Explore Studios
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-500 dark:text-gray-400 sm:text-base">
            Discover and book inspiring creative spaces for your photography,
            music, video production and other projects.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-[#333333] dark:bg-[#1c1c1c]">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Search Input */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Search Studios
              </label>

              <input
                type="text"
                placeholder="Search by title, location or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Filter by Category
              </label>

              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className={inputClass}
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
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Available Studios
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {filteredStudios.length} Studios Found
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-2xl border border-gray-100 bg-white dark:border-[#333333] dark:bg-[#1c1c1c]"
              >
                <div className="h-52 bg-gray-200 dark:bg-[#303030]" />

                <div className="space-y-4 p-5">
                  <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-[#303030]" />
                  <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-[#303030]" />
                  <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-[#303030]" />
                  <div className="h-10 rounded bg-gray-200 dark:bg-[#303030]" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredStudios.length === 0 ? (
          /* Empty State */
          <div className="rounded-2xl border border-gray-200 bg-white px-5 py-16 text-center dark:border-[#333333] dark:bg-[#1c1c1c]">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              No Studios Found
            </h2>

            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Try changing your search or category filter.
            </p>

            <button
              type="button"
              onClick={clearFilters}
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
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-[#333333] dark:bg-[#1c1c1c] dark:hover:shadow-black/30"
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

                  {typeof studio.rating === "number" && (
                    <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-gray-800 shadow-sm">
                      ★ {studio.rating.toFixed(1)}
                    </span>
                  )}
                </div>

                {/* Studio Information */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {studio.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {studio.location}
                  </p>

                  <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                    {studio.description}
                  </p>

                  {/* Studio Details */}
                  <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-[#333333]">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Hourly Rate
                      </p>

                      <p className="mt-1 text-xl font-extrabold text-gray-900 dark:text-white">
                        ${studio.hourlyRate}
                        <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                          /hr
                        </span>
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Capacity
                      </p>

                      <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
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
                          className="rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-600 dark:bg-[#303030] dark:text-gray-300"
                        >
                          {amenity}
                        </span>
                      ))}

                      {studio.amenities.length > 3 && (
                        <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-600 dark:bg-[#303030] dark:text-gray-300">
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
