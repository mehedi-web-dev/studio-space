"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import {
  // FaAperture,
  FaArrowUpRightFromSquare,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaEnvelope,
} from "react-icons/fa6";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/studios" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "About Us", href: "/about" },
];

const studioCategories = [
  { name: "Photo Studios", category: "Photo Studio" },
  { name: "Film Stages", category: "Film Stage" },
  { name: "Podcast Lounges", category: "Podcast Lounge" },
  { name: "Music Suites", category: "Music Suite" },
  { name: "Art Workshops", category: "Workshop" },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    icon: FaFacebookF,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    icon: FaInstagram,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: FaLinkedinIn,
  },
  {
    name: "X",
    href: "https://x.com/",
    icon: FaXTwitter,
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    toast.info(
      "Newsletter subscription will be available after backend integration.",
    );

    setEmail("");
  };

  return (
    <footer className="bg-[#171717] text-white">
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-16 lg:px-8 lg:pt-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#c7f36b] text-[#171717]">
                {/* <FaAperture size={26} /> */}
              </span>

              <span className="text-2xl font-extrabold tracking-tight">
                Studio
                <span className="text-[#c7f36b]">Space.</span>
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-[#a5a5a5]">
              Discover inspiring creative spaces and bring your next big idea to
              life. Connect with professional studios, create meaningful work,
              and make every moment count.
            </p>

            {/* Social Links */}
            <div className="mt-7 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#383838] text-[#b5b5b5] transition-all duration-300 hover:border-[#c7f36b] hover:bg-[#c7f36b] hover:text-[#171717]"
                  >
                    <Icon size={17} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="mb-6 text-sm font-bold tracking-wide text-white">
              Quick Links
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#a5a5a5] transition-colors hover:text-[#c7f36b]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio Categories */}
          <div className="lg:col-span-2">
            <h3 className="mb-6 text-sm font-bold tracking-wide text-white">
              Explore Spaces
            </h3>

            <ul className="space-y-4">
              {studioCategories.map((item) => (
                <li key={item.category}>
                  <Link
                    href={`/studios?category=${encodeURIComponent(item.category)}`}
                    className="text-sm text-[#a5a5a5] transition-colors hover:text-[#c7f36b]"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="mb-6 text-sm font-bold tracking-wide text-white">
              Stay Inspired
            </h3>

            <p className="mb-5 text-sm leading-6 text-[#a5a5a5]">
              Get creative inspiration, new studio discoveries, and updates
              delivered to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex items-center gap-2 rounded-xl border border-[#383838] bg-[#222222] px-3 py-3 focus-within:border-[#c7f36b]">
                <FaEnvelope size={16} className="shrink-0 text-[#999999]" />

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  aria-label="Your email address"
                  className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-[#777777]"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#c7f36b] px-4 py-3 text-sm font-bold text-[#171717] transition-all duration-300 hover:bg-[#d5ff80]"
              >
                Subscribe
                <FaArrowUpRightFromSquare size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 flex flex-col gap-5 border-t border-[#383838] pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#888888]">
            © {new Date().getFullYear()} StudioSpace. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-[#888888] transition-colors hover:text-[#c7f36b]"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-xs text-[#888888] transition-colors hover:text-[#c7f36b]"
            >
              Terms & Conditions
            </Link>

            <Link
              href="/about"
              className="text-xs text-[#888888] transition-colors hover:text-[#c7f36b]"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
