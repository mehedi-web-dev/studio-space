import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Studios", href: "/studios" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "About Us", href: "/#about-us" },
  ];

  const categories = [
    { name: "Photo Studios", href: "/studios?category=Photo%20Studio" },
    { name: "Film Stages", href: "/studios?category=Film%20Stage" },
    { name: "Podcast Lounges", href: "/studios?category=Podcast%20Lounge" },
    { name: "Music Suites", href: "/studios?category=Music%20Suite" },
    { name: "Workshops", href: "/studios?category=Workshop" },
  ];

  return (
    <footer className="bg-[#101828] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand and Mission */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-xl font-bold">
                S
              </span>

              <span className="text-2xl font-bold tracking-tight">
                Studio<span className="text-indigo-400">Space</span>
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-gray-400">
              Connecting creators with inspiring spaces. Discover and book
              professional studios for photography, filmmaking, music, podcasts,
              and creative projects.
            </p>

            {/* Social Links */}
            <div className="mt-5 flex gap-3">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="rounded-lg bg-white/10 p-2.5 transition hover:bg-indigo-600"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="rounded-lg bg-white/10 p-2.5 transition hover:bg-indigo-600"
              >
                <FaXTwitter size={18} />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="rounded-lg bg-white/10 p-2.5 transition hover:bg-indigo-600"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded-lg bg-white/10 p-2.5 transition hover:bg-indigo-600"
              >
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>

            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition hover:text-indigo-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold">Studio Categories</h3>

            <ul className="mt-5 space-y-3">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="text-sm text-gray-400 transition hover:text-indigo-400"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter and Contact */}
          <div>
            <h3 className="text-lg font-semibold">Stay Connected</h3>

            <p className="mt-5 text-sm leading-6 text-gray-400">
              Get updates about new studios and creative spaces.
            </p>

            <div className="mt-4 flex">
              <input
                type="email"
                placeholder="Your email address"
                aria-label="Your email address"
                required
                className="min-w-0 flex-1 rounded-l-lg border border-white/10 bg-white/10 px-3 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-indigo-400"
              />

              <button
                type="button"
                className="rounded-r-lg bg-indigo-600 px-4 text-sm font-semibold transition hover:bg-indigo-700"
              >
                Join
              </button>
            </div>

            <div className="mt-6 space-y-3 text-sm text-gray-400">
              <p className="flex items-center gap-2">
                <Mail size={16} />
                support@studiospace.com
              </p>

              <p className="flex items-center gap-2">
                <Phone size={16} />
                +880 1XXX-XXXXXX
              </p>

              <p className="flex items-center gap-2">
                <MapPin size={16} />
                Dhaka, Bangladesh
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} StudioSpace. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="/terms" className="transition hover:text-white">
              Terms & Conditions
            </Link>

            <Link href="/privacy" className="transition hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
