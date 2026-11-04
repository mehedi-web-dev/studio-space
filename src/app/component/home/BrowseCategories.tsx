import Link from "next/link";
import {
  Camera,
  Clapperboard,
  Mic2,
  Music2,
  Palette,
  ArrowUpRight,
} from "lucide-react";

const categories = [
  {
    title: "Photo Studios",
    value: "Photo Studio",
    description: "Professional spaces for photography and creative shoots.",
    icon: Camera,
  },
  {
    title: "Sound Stages",
    value: "Film Stage",
    description: "Production-ready spaces for filmmaking and video shoots.",
    icon: Clapperboard,
  },
  {
    title: "Podcast Rooms",
    value: "Podcast Lounge",
    description: "Dedicated rooms for podcasts and audio recording.",
    icon: Mic2,
  },
  {
    title: "Music Suites",
    value: "Music Suite",
    description: "Creative spaces for music production and recording.",
    icon: Music2,
  },
  {
    title: "Art Workshops",
    value: "Workshop",
    description: "Inspiring spaces for art, crafts, and creative work.",
    icon: Palette,
  },
];

export default function BrowseCategories() {
  return (
    <section className="bg-white px-5 py-16 transition-colors duration-300 dark:bg-[#121212]">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-[#759c2c] dark:text-[#c7f36b]">
            Find Your Creative Space
          </p>

          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Browse by Categories
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500 dark:text-gray-400">
            Explore creative spaces designed for your unique projects and ideas.
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.value}
                href={`/studios?category=${encodeURIComponent(category.value)}`}
                className="group rounded-2xl border border-gray-100 bg-[#f8f7f4] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#c7f36b] hover:bg-white hover:shadow-lg dark:border-[#333333] dark:bg-[#1c1c1c] dark:hover:bg-[#252525] dark:hover:shadow-black/30"
              >
                {/* Category Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf8ce] text-[#759c2c] transition group-hover:bg-[#c7f36b] dark:bg-[#303d22] dark:text-[#c7f36b] dark:group-hover:bg-[#c7f36b] dark:group-hover:text-[#171717]">
                  <Icon size={27} strokeWidth={1.8} />
                </div>

                {/* Category Information */}
                <h3 className="mt-5 text-lg font-bold text-gray-900 dark:text-white">
                  {category.title}
                </h3>

                <p className="mt-2 min-h-12 text-sm leading-6 text-gray-500 dark:text-gray-400">
                  {category.description}
                </p>

                {/* Explore Link */}
                <div className="mt-5 flex items-center gap-2 text-sm font-bold text-[#759c2c] dark:text-[#c7f36b]">
                  Explore Studios
                  <ArrowUpRight
                    size={17}
                    className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
