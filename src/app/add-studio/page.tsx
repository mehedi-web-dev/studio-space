"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { API_URL } from "@/lib/api";
import Container from "../component/Container";

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

export default function AddStudioPage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [loading, setLoading] = useState(false);

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

  // Check authentication
  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/sign-in");
    }
  }, [isPending, session, router]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
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

  // Submit studio
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session) {
      toast.error("Please login before adding a studio.");
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
      setLoading(true);

      const response = await fetch(`${API_URL}/api/studios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create studio.");
      }

      toast.success("Studio created successfully!");

      router.push("/my-listings");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (isPending || !session) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#f8f7f4] transition-colors duration-300 dark:bg-[#121212]">
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
      </main>
    );
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-[#9bc83f] focus:ring-2 focus:ring-[#c7f36b]/30 dark:border-[#383838] dark:bg-[#252525] dark:text-white dark:placeholder:text-gray-500";

  const labelClass = "text-sm font-semibold text-gray-700 dark:text-gray-300";

  const sectionHeadingClass =
    "mb-5 text-lg font-bold text-gray-900 dark:text-white";

  const dividerClass = "border-t border-gray-100 dark:border-[#333333]";

  return (
    <main className="min-h-screen bg-[#f8f7f4] py-12 transition-colors duration-300 dark:bg-[#121212]">
      <Container>
        <div className="mx-auto max-w-4xl">
        {/* Page Heading */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-[#759c2c] dark:text-[#c7f36b]">
            HOST YOUR SPACE
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-[#191919] dark:text-white">
            Add New Studio
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
            Share your creative space with creators and start earning.
          </p>
        </div>

        {/* Add Studio Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-7 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-[#333333] dark:bg-[#1c1c1c] sm:p-8"
        >
          {/* Studio Information */}
          <section>
            <h2 className={sectionHeadingClass}>Studio Information</h2>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Studio Title */}
              <div className="sm:col-span-2">
                <label className={labelClass}>Studio Title *</label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter studio title"
                  className={inputClass}
                  required
                  maxLength={100}
                />
              </div>

              {/* Category */}
              <div>
                <label className={labelClass}>Category *</label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="">Select a category</option>

                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Capacity */}
              <div>
                <label className={labelClass}>Max Capacity *</label>

                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  placeholder="e.g. 10"
                  min="1"
                  className={inputClass}
                  required
                />
              </div>

              {/* Hourly Rate */}
              <div>
                <label className={labelClass}>Hourly Rate ($) *</label>

                <input
                  type="number"
                  name="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  placeholder="e.g. 50"
                  min="0.01"
                  step="0.01"
                  className={inputClass}
                  required
                />
              </div>

              {/* Security Deposit */}
              <div>
                <label className={labelClass}>Security Deposit ($) *</label>

                <input
                  type="number"
                  name="securityDeposit"
                  value={formData.securityDeposit}
                  onChange={handleChange}
                  placeholder="e.g. 100"
                  min="0"
                  step="0.01"
                  className={inputClass}
                  required
                />
              </div>

              {/* Location */}
              <div className="sm:col-span-2">
                <label className={labelClass}>Location / Address *</label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter full studio address"
                  className={inputClass}
                  required
                />
              </div>

              {/* Image URL */}
              <div className="sm:col-span-2">
                <label className={labelClass}>Image URL *</label>

                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/studio-image.jpg"
                  className={inputClass}
                  required
                />

                {/* Image Preview */}
                {formData.image && (
                  <div className="relative mt-4 h-48 w-full overflow-hidden rounded-xl">
                    <Image
                      src={formData.image}
                      alt="Studio preview"
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 768px"
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </section>

          <div className={dividerClass} />

          {/* Studio Amenities */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Studio Amenities
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Select the facilities available in your studio.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {availableAmenities.map((amenity) => (
                <label
                  key={amenity}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-3 text-sm text-gray-700 transition hover:border-[#9bc83f] dark:border-[#383838] dark:text-gray-300 dark:hover:border-[#c7f36b]"
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

          <div className={dividerClass} />

          {/* Studio Description */}
          <section>
            <h2 className={sectionHeadingClass}>Detailed Overview</h2>

            <label className={labelClass}>Studio Description *</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your studio, its facilities, suitable activities and what makes it special..."
              rows={6}
              maxLength={3000}
              className={`${inputClass} resize-y`}
              required
            />

            <p className="mt-1 text-right text-xs text-gray-400 dark:text-gray-500">
              {formData.description.length}/3000
            </p>
          </section>

          <div className={dividerClass} />

          {/* Host Information */}
          <section>
            <h2 className={sectionHeadingClass}>Host Information</h2>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Host Name */}
              <div>
                <label className={labelClass}>Host Name</label>

                <input
                  type="text"
                  value={session.user.name || ""}
                  readOnly
                  className={`${inputClass} cursor-not-allowed bg-gray-100 dark:bg-[#303030]`}
                />
              </div>

              {/* Host Email */}
              <div>
                <label className={labelClass}>Host Email</label>

                <input
                  type="email"
                  value={session.user.email || ""}
                  readOnly
                  className={`${inputClass} cursor-not-allowed bg-gray-100 dark:bg-[#303030]`}
                />
              </div>
            </div>

            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              Host information is automatically verified through your
              authenticated account.
            </p>
          </section>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#c7f36b] px-6 py-4 text-sm font-bold text-[#171717] transition hover:bg-[#b8e65b] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Studio..." : "Create Studio"}
          </button>
        </form>
        </div>
      </Container>
    </main>
  );
}
