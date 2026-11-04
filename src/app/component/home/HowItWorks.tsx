import Link from "next/link";
import {
  Search,
  CalendarDays,
  ClipboardCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discover a Studio",
    description:
      "Explore creative spaces and find the perfect studio for your project.",
    icon: Search,
  },
  {
    number: "02",
    title: "Choose Your Schedule",
    description: "Select your preferred booking date, start time and end time.",
    icon: CalendarDays,
  },
  {
    number: "03",
    title: "Request a Booking",
    description:
      "Review your booking details and send a reservation request to the host.",
    icon: ClipboardCheck,
  },
  {
    number: "04",
    title: "Create Something Amazing",
    description:
      "Wait for host approval and get ready to bring your creative ideas to life.",
    icon: Sparkles,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 bg-[#f8f7f4] px-5 py-20 transition-colors duration-300 dark:bg-[#121212]"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-[#759c2c] dark:text-[#c7f36b]">
            Simple Booking Process
          </p>

          <h2 className="mt-3 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            How StudioSpace Works
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-500 dark:text-gray-400 sm:text-base">
            Finding and booking your ideal creative workspace is simple. Follow
            these four steps to get started.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative rounded-2xl border border-gray-100 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-[#333333] dark:bg-[#1c1c1c] dark:hover:shadow-black/30"
              >
                {/* Step Number */}
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-extrabold text-[#e8eddf] dark:text-[#353d2b]">
                    {step.number}
                  </span>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eff8dc] text-[#759c2c] dark:bg-[#303d22] dark:text-[#c7f36b]">
                    <Icon size={26} strokeWidth={1.8} />
                  </div>
                </div>

                {/* Step Information */}
                <h3 className="mt-7 text-lg font-bold text-gray-900 dark:text-white">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-500 dark:text-gray-400">
                  {step.description}
                </p>

                {/* Step Indicator */}
                {index !== steps.length - 1 && (
                  <div className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-gray-100 bg-white p-2 text-[#759c2c] lg:block dark:border-[#333333] dark:bg-[#252525] dark:text-[#c7f36b]">
                    <ArrowRight size={16} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/studios"
            className="inline-flex items-center gap-2 rounded-full bg-[#171717] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#303030] dark:bg-[#c7f36b] dark:text-[#171717] dark:hover:bg-[#b5e65a]"
          >
            Explore Studios
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
