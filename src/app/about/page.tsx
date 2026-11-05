import Link from "next/link";
import {
  Aperture,
  Camera,
  Film,
  Mic,
  Music,
  Palette,
  ArrowRight,
  Target,
  Heart,
  Users,
} from "lucide-react";

import Container from "../component/Container";

const creativeCategories = [
  {
    icon: Camera,
    title: "Photography Studios",
    description: "Professional spaces for photographers and visual creators.",
  },
  {
    icon: Film,
    title: "Film Production Stages",
    description:
      "Production-ready environments for filmmakers and video teams.",
  },
  {
    icon: Mic,
    title: "Podcast Lounges",
    description: "Dedicated spaces for recording podcasts and conversations.",
  },
  {
    icon: Music,
    title: "Music Suites",
    description: "Creative environments for recording and producing music.",
  },
  {
    icon: Palette,
    title: "Creative Workshops",
    description: "Flexible spaces for artists, makers, and creative projects.",
  },
];

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "Make professional creative spaces easier to discover and book, helping creators focus on bringing their ideas to life.",
  },
  {
    icon: Heart,
    title: "Our Vision",
    description:
      "Build a connected creative community where studio owners and creators can find opportunities to work together.",
  },
  {
    icon: Users,
    title: "Our Community",
    description:
      "Bring photographers, filmmakers, musicians, podcasters, artists, and studio hosts together in one platform.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f8f7f4] dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#171717] py-24 text-white sm:py-32">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#c7f36b]/10 blur-3xl" />

        <Container className="relative text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#c7f36b] text-[#171717]">
            <Aperture size={34} />
          </div>

          <p className="mt-7 text-sm font-bold uppercase tracking-[0.25em] text-[#c7f36b]">
            About StudioSpace
          </p>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-6xl">
            Every Great Creation
            <br />
            <span className="text-[#c7f36b]">Needs Its Space.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">
            StudioSpace is a peer-to-peer creative workspace platform connecting
            creators with inspiring studios. We make it easier to discover,
            explore, and book spaces for creative projects.
          </p>

          <Link
            href="/studios"
            className="mt-9 inline-flex items-center gap-2 rounded-xl bg-[#c7f36b] px-7 py-4 font-bold text-[#171717] transition hover:bg-[#b8e65b]"
          >
            Explore Studios
            <ArrowRight size={19} />
          </Link>
        </Container>
      </section>

      {/* Who We Are */}
      <section className="py-20 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-[#759c2c]">
              Who We Are
            </p>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-gray-900 dark:text-white sm:text-4xl">
              A Space for Every Creative Idea
            </h2>

            <p className="mt-6 leading-8 text-gray-600 dark:text-gray-400">
              Every creative project starts with an idea. But finding the right
              space to bring that idea to life can be challenging. StudioSpace
              connects people who need creative workspaces with studio owners
              who have spaces to share.
            </p>

            <p className="mt-4 leading-8 text-gray-600 dark:text-gray-400">
              Whether you are planning a photography session, filming a
              production, recording a podcast, producing music, or working on an
              artistic project, StudioSpace helps you discover spaces that fit
              your creative needs.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex min-h-52 flex-col justify-end rounded-3xl bg-[#e5edda] p-6 dark:bg-gray-800">
              <Camera size={34} className="text-[#759c2c]" />
              <h3 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">
                Create
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Turn your ideas into reality.
              </p>
            </div>

            <div className="mt-10 flex min-h-52 flex-col justify-end rounded-3xl bg-[#e4eaff] p-6 dark:bg-gray-800">
              <Users size={34} className="text-indigo-600" />
              <h3 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">
                Connect
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Meet spaces and creative people.
              </p>
            </div>

            <div className="flex min-h-52 flex-col justify-end rounded-3xl bg-[#fff0d9] p-6 dark:bg-gray-800">
              <Film size={34} className="text-orange-600" />
              <h3 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">
                Explore
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Find your next creative space.
              </p>
            </div>

            <div className="mt-10 flex min-h-52 flex-col justify-end rounded-3xl bg-[#f2e6f8] p-6 dark:bg-gray-800">
              <Music size={34} className="text-purple-600" />
              <h3 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">
                Inspire
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Make something meaningful.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission, Vision and Community */}
      <section className="bg-white py-20 dark:bg-gray-900 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-[#759c2c]">
              What Drives Us
            </p>

            <h2 className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              More Than Just a Booking Platform
            </h2>

            <p className="mt-4 leading-7 text-gray-600 dark:text-gray-400">
              We believe the right environment can make a difference in every
              creative journey.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  className="rounded-2xl border border-gray-100 bg-[#f8f7f4] p-8 dark:border-gray-800 dark:bg-gray-950"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#e5edda] text-[#759c2c] dark:bg-gray-800">
                    <Icon size={27} />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">
                    {value.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-400">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Creative Spaces */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-[#759c2c]">
              What You Can Discover
            </p>

            <h2 className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Spaces for Every Kind of Creator
            </h2>

            <p className="mt-4 leading-7 text-gray-600 dark:text-gray-400">
              Explore different creative environments designed for different
              types of projects.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {creativeCategories.map((category) => {
              const Icon = category.icon;

              return (
                <article
                  key={category.title}
                  className="rounded-2xl border border-gray-200 bg-white p-7 transition hover:-translate-y-1 hover:border-[#c7f36b] hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e5edda] text-[#759c2c] dark:bg-gray-800">
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-gray-900 dark:text-white">
                    {category.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                    {category.description}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="px-5 pb-20">
        <div className="mx-auto w-full max-w-6xl rounded-3xl bg-[#171717] px-6 py-16 text-center text-white sm:px-12">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Ready to Create Something Amazing?
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-gray-300">
            Discover a creative space that matches your next project and take
            the first step toward bringing your ideas to life.
          </p>

          <Link
            href="/studios"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#c7f36b] px-7 py-4 font-bold text-[#171717] transition hover:bg-[#b8e65b]"
          >
            Find Your Studio
            <ArrowRight size={19} />
          </Link>
        </div>
      </section>
    </main>
  );
}
