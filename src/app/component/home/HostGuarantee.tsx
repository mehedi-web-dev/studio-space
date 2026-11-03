import { ShieldCheck, BadgeCheck, Wrench, Headset } from "lucide-react";

const guarantees = [
  {
    number: "01",
    title: "Liability Protection",
    description:
      "Enjoy greater peace of mind with clear booking policies and platform support throughout your studio reservation.",
    icon: ShieldCheck,
  },
  {
    number: "02",
    title: "Verified Profiles",
    description:
      "Connect with registered hosts and creators through a trusted platform designed for creative collaboration.",
    icon: BadgeCheck,
  },
  {
    number: "03",
    title: "Equipment Safety",
    description:
      "Find studio equipment details and amenities before booking so you can choose a space that suits your project.",
    icon: Wrench,
  },
  {
    number: "04",
    title: "24/7 Host Support",
    description:
      "Get support for booking-related questions and communicate with your host when you need assistance.",
    icon: Headset,
  },
];

export default function HostGuarantee() {
  return (
    <section className="bg-white px-5 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-[#759c2c]">
            Your Creative Journey Matters
          </p>

          <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Your Space, Our Commitment
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">
            We focus on creating a reliable experience for studio hosts and
            creators at every step of the booking journey.
          </p>
        </div>

        {/* Guarantee Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {guarantees.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.number}
                className="group rounded-2xl border border-gray-100 bg-[#f8f7f4] p-7 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
              >
                {/* Icon and Number */}
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf6d4] text-[#759c2c] transition group-hover:bg-[#c7f36b]">
                    <Icon size={27} strokeWidth={1.8} />
                  </div>

                  <span className="text-3xl font-extrabold text-gray-200">
                    {item.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="mt-7 text-lg font-bold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
