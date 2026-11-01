"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  FaLocationDot,
  FaMagnifyingGlass,
  FaCalendarDays,
  FaClock,
} from "react-icons/fa6";

const categories = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
];

export default function StudioSearch() {
  const router = useRouter();

  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (startTime && endTime && endTime <= startTime) {
      toast.error("End time must be later than start time.");
      return;
    }

    const params = new URLSearchParams();

    if (location.trim()) {
      params.set("location", location.trim());
    }

    if (category) {
      params.set("category", category);
    }

    if (date) {
      params.set("date", date);
    }

    if (startTime) {
      params.set("startTime", startTime);
    }

    if (endTime) {
      params.set("endTime", endTime);
    }

    const query = params.toString();

    router.push(query ? `/studios?${query}` : "/studios");
  };

  return (
    <section className="relative z-20 mx-auto -mt-8 w-full max-w-6xl px-4 sm:-mt-10 sm:px-6">
      <div className="rounded-2xl border border-[#e8e7e2] bg-white p-5 shadow-[0_15px_50px_rgba(0,0,0,0.08)] sm:p-7">
        {/* Section Heading */}
        <div className="mb-6">
          <h2 className="text-xl font-extrabold tracking-tight text-[#171717] sm:text-2xl">
            Find Your Perfect Studio
          </h2>

          <p className="mt-2 text-sm text-[#777777]">
            Search creative spaces that match your next big idea.
          </p>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:items-end"
        >
          {/* Location */}
          <div className="lg:col-span-3">
            <label
              htmlFor="studio-location"
              className="mb-2 flex items-center gap-2 text-xs font-bold text-[#444444]"
            >
              <FaLocationDot className="text-[#829f3e]" />
              Location
            </label>

            <input
              id="studio-location"
              type="text"
              placeholder="Where do you need a studio?"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="h-12 w-full rounded-xl border border-[#e8e7e2] bg-[#fafaf8] px-3 text-sm text-[#171717] outline-none transition-colors placeholder:text-[#999999] focus:border-[#a9cc5b]"
            />
          </div>

          {/* Category */}
          <div className="lg:col-span-2">
            <label
              htmlFor="studio-category"
              className="mb-2 block text-xs font-bold text-[#444444]"
            >
              Studio Type
            </label>

            <select
              id="studio-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-12 w-full rounded-xl border border-[#e8e7e2] bg-[#fafaf8] px-3 text-sm text-[#171717] outline-none focus:border-[#a9cc5b]"
            >
              <option value="">All Categories</option>

              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="sm:col-span-2 lg:col-span-2">
            <label
              htmlFor="booking-date"
              className="mb-2 flex items-center gap-2 text-xs font-bold text-[#444444]"
            >
              <FaCalendarDays className="text-[#829f3e]" />
              Booking Date
            </label>

            <input
              id="booking-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-12 w-full rounded-xl border border-[#e8e7e2] bg-[#fafaf8] px-3 text-sm text-[#171717] outline-none focus:border-[#a9cc5b]"
            />
          </div>

          {/* Start Time */}
          <div className="lg:col-span-2">
            <label
              htmlFor="start-time"
              className="mb-2 flex items-center gap-2 text-xs font-bold text-[#444444]"
            >
              <FaClock className="text-[#829f3e]" />
              Start Time
            </label>

            <input
              id="start-time"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="h-12 w-full rounded-xl border border-[#e8e7e2] bg-[#fafaf8] px-3 text-sm text-[#171717] outline-none focus:border-[#a9cc5b]"
            />
          </div>

          {/* End Time */}
          <div className="lg:col-span-2">
            <label
              htmlFor="end-time"
              className="mb-2 flex items-center gap-2 text-xs font-bold text-[#444444]"
            >
              <FaClock className="text-[#829f3e]" />
              End Time
            </label>

            <input
              id="end-time"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="h-12 w-full rounded-xl border border-[#e8e7e2] bg-[#fafaf8] px-3 text-sm text-[#171717] outline-none focus:border-[#a9cc5b]"
            />
          </div>

          {/* Search Button */}
          <div className="sm:col-span-2 lg:col-span-12">
            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#171717] px-6 text-sm font-bold text-white transition-all duration-300 hover:bg-[#333333] hover:shadow-lg sm:w-auto sm:min-w-48"
            >
              <FaMagnifyingGlass className="text-[#c7f36b]" />
              Search Studios
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
