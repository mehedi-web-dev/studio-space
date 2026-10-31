"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { FaArrowRight } from "react-icons/fa6";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    eyebrow: "THE CREATIVE SPACE MARKETPLACE",
    title: "Your Next Creative Space Starts Here.",
    description:
      "Discover inspiring studios designed for creators, filmmakers, photographers, and artists.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=85",
  },
  {
    id: 2,
    eyebrow: "CREATE WITHOUT LIMITS",
    title: "Create More. Worry Less.",
    description:
      "Find professional production spaces with transparent pricing and flexible booking.",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=2000&q=85",
  },
  {
    id: 3,
    eyebrow: "BECOME A STUDIO HOST",
    title: "Turn Your Space Into Opportunity.",
    description:
      "List your creative workspace and connect with creators looking for their next perfect space.",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2000&q=85",
  },
];

export default function HeroSlider() {
  return (
    <section className="mx-auto max-w-7xl px-3 pt-4 sm:px-5 sm:pt-6">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        slidesPerView={1}
        loop={true}
        speed={800}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        className="studiospace-swiper overflow-hidden rounded-2xl sm:rounded-3xl"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative flex min-h-[560px] items-center overflow-hidden bg-cover bg-center px-6 py-16 sm:min-h-[600px] sm:px-12 lg:min-h-[680px] lg:px-20"
              style={{
                backgroundImage: `url("${slide.image}")`,
              }}
            >
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10" />

              {/* Content */}
              <div className="relative z-10 max-w-3xl">
                <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[10px] font-bold tracking-[0.2em] text-[#c7f36b] backdrop-blur-sm sm:text-xs">
                  <span className="h-2 w-2 rounded-full bg-[#c7f36b]" />
                  {slide.eyebrow}
                </span>

                <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-7xl">
                  {slide.title}
                </h1>

                <p className="mt-6 max-w-xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8 lg:text-lg">
                  {slide.description}
                </p>

                {/* CTA Buttons */}
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/studios"
                    className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#c7f36b] px-7 py-4 text-sm font-bold text-[#171717] transition-all duration-300 hover:bg-[#d8ff86]"
                  >
                    Explore Studios
                    <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href="/studios"
                    className="inline-flex items-center justify-center gap-3 rounded-full border border-white/40 bg-white/10 px-7 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-[#171717]"
                  >
                    Host Your Space
                    <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
