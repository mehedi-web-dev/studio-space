"use client";

import { useEffect, useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { API_URL } from "@/lib/api";

const categories = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
];

const availableAmenities = [
  "Professional Lighting",
  "Air Conditioning",
  "WiFi",
  "Soundproofing",
  "Parking",
  "Changing Room",
  "Makeup Station",
  "Kitchen",
];

interface IStudio {
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit: number;
  capacity: number;
  location: string;
  image: string;
  amenities: string[];
  description: string;
}

export default function EditStudioPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const studioId = params.id;

  const { data: session, isPending } = authClient.useSession();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    hourlyRate: "",
    securityDeposit: "",
    capacity: "",
    location: "",
    image: "",
    amenities: [] as string[],
    description: "",
  });

  // Fetch existing studio data
  useEffect(() => {
    if (isPending) return;

    if (!session) {
      router.replace("/sign-in");
      return;
    }

    const fetchStudio = async () => {
      try {
        const response = await fetch(`${API_URL}/api/studios/${studioId}`, {
          method: "GET",
          credentials: "include",
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to load studio.");
        }

        const studio: IStudio = result.data;

        setFormData({
          title: studio.title,
          category: studio.category,
          hourlyRate: String(studio.hourlyRate),
          securityDeposit: String(studio.securityDeposit),
          capacity: String(studio.capacity),
          location: studio.location,
          image: studio.image,
          amenities: studio.amenities || [],
          description: studio.description,
        });
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Something went wrong.",
        );

        router.replace("/my-listings");
      } finally {
        setLoading(false);
      }
    };

    fetchStudio();
  }, [session, isPending, router, studioId]);

  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle amenities
  const handleAmenityChange = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((item) => item !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  // Update studio
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session) {
      toast.error("Please login first.");
      router.replace("/sign-in");
      return;
    }

    if (
      !Number.isFinite(Number(formData.hourlyRate)) ||
      Number(formData.hourlyRate) <= 0
    ) {
      toast.error("Enter a valid hourly rate.");
      return;
    }

    if (
      !Number.isFinite(Number(formData.securityDeposit)) ||
      Number(formData.securityDeposit) < 0
    ) {
      toast.error("Enter a valid security deposit.");
      return;
    }

    if (
      !Number.isInteger(Number(formData.capacity)) ||
      Number(formData.capacity) < 1
    ) {
      toast.error("Capacity must be at least 1.");
      return;
    }

    try {
      setUpdating(true);

      const response = await fetch(`${API_URL}/api/studios/${studioId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update studio.");
      }

      toast.success("Studio updated successfully!");
      router.push("/my-listings");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setUpdating(false);
    }
  };

  if (isPending || loading || !session) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#f8f7f4] transition-colors duration-300 dark:bg-[#111827]">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Loading studio...
        </p>
      </main>
    );
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#9bc83f] focus:ring-2 focus:ring-[#c7f36b]/30 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400";

  const labelClass = "text-sm font-semibold text-gray-700 dark:text-gray-200";

  return (
    <main className="min-h-screen bg-[#f8f7f4] px-5 py-12 transition-colors duration-300 dark:bg-[#111827]">
      <div className="mx-auto max-w-4xl">
        {/* Page Header */}
        <div className="mb-8">
          <Link
            href="/my-listings"
            className="text-sm font-semibold text-[#759c2c] transition hover:underline dark:text-[#c7f36b]"
          >
            ← Back to My Listings
          </Link>

          <h1 className="mt-4 text-3xl font-extrabold text-[#191919] dark:text-white">
            Edit Studio
          </h1>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Update your studio information and save your changes.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-7 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-800 sm:p-8"
        >
          {/* Studio Information */}
          <section>
            <h2 className="mb-5 text-lg font-bold text-gray-900 dark:text-white">
              Studio Information
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className={labelClass}>Studio Title *</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={inputClass}
                  required
                  maxLength={100}
                />
              </div>

              <div>
                <label className={labelClass}>Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Max Capacity *</label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  min="1"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Hourly Rate ($) *</label>
                <input
                  type="number"
                  name="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  min="0.01"
                  step="0.01"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Security Deposit ($) *</label>
                <input
                  type="number"
                  name="securityDeposit"
                  value={formData.securityDeposit}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className={inputClass}
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>Location / Address *</label>
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>Image URL *</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />

                {/* Image Preview */}
                {formData.image && (
                  <div className="relative mt-4 h-48 w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700">
                    <Image
                      src={formData.image}
                      alt="Studio preview"
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 800px"
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </section>

          <div className="border-t border-gray-100 dark:border-gray-700" />

          {/* Studio Amenities */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Studio Amenities
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {availableAmenities.map((amenity) => (
                <label
                  key={amenity}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-3 text-sm text-gray-700 transition hover:border-[#9bc83f] dark:border-gray-600 dark:text-gray-200 dark:hover:border-[#c7f36b]"
                >
                  <input
                    type="checkbox"
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => handleAmenityChange(amenity)}
                    className="h-4 w-4 accent-[#9bc83f]"
                  />
                  {amenity}
                </label>
              ))}
            </div>
          </section>

          <div className="border-t border-gray-100 dark:border-gray-700" />

          {/* Detailed Overview */}
          <section>
            <h2 className="mb-5 text-lg font-bold text-gray-900 dark:text-white">
              Detailed Overview
            </h2>

            <label className={labelClass}>Studio Description *</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              maxLength={3000}
              className={`${inputClass} resize-y`}
              required
            />
          </section>

          {/* Form Actions */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/my-listings"
              className="rounded-xl border border-gray-200 px-6 py-3 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={updating}
              className="rounded-xl bg-[#c7f36b] px-6 py-3 text-sm font-bold text-[#171717] transition hover:bg-[#b8e65b] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {updating ? "Updating Studio..." : "Update Studio"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
