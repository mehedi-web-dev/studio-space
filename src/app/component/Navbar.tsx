"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Aperture,
  LogOut,
  Menu,
  X,
  ArrowUpRight,
  LayoutDashboard,
  PlusCircle,
  Building2,
  CalendarDays,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

import Container from "./Container";

// Theme Toggle Component
function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const isDark = mounted && theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#e8e7e2] bg-white text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-yellow-400 dark:hover:bg-gray-700"
    >
      {isDark ? <Sun size={19} /> : <Moon size={19} />}
    </button>
  );
}

// User Avatar Component
function UserAvatar({
  image,
  name,
  size = "h-10 w-10",
}: {
  image?: string | null;
  name?: string | null;
  size?: string;
}) {
  const initials =
    name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  if (image) {
    return (
      <img
        src={image}
        alt={name || "Profile"}
        className={`${size} shrink-0 rounded-full border border-[#e8e7e2] object-cover`}
      />
    );
  }

  return (
    <span
      className={`flex ${size} shrink-0 items-center justify-center rounded-full bg-[#171717] text-sm font-bold text-[#c7f36b]`}
    >
      {initials}
    </span>
  );
}

// Navbar Links
const navLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/studios" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "About Us", href: "/about" },
];

// User Dashboard Links
const dashboardLinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Add New Studio",
    href: "/add-studio",
    icon: PlusCircle,
  },
  {
    name: "My Studio Listings",
    href: "/my-listings",
    icon: Building2,
  },
  {
    name: "My Bookings",
    href: "/my-bookings",
    icon: CalendarDays,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  // Active Navigation
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    if (href === "/studios") {
      return pathname.startsWith("/studios");
    }

    return false;
  };

  // Sign Out
  const handleSignOut = async () => {
    if (signingOut) return;

    try {
      setSigningOut(true);

      await authClient.signOut();

      setIsDropdownOpen(false);
      setIsMenuOpen(false);

      toast.success("Signed out successfully");

      router.replace("/");
      router.refresh();
    } catch {
      toast.error("Failed to sign out. Please try again.");
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#e8e7e2] bg-[#f8f7f4]/95 backdrop-blur-lg dark:border-gray-800 dark:bg-gray-950/95">
      <Container className="flex h-[76px] items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="StudioSpace Home"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#171717] text-[#c7f36b]">
            <Aperture size={23} strokeWidth={2} />
          </span>

          <span className="text-xl font-extrabold tracking-tight text-[#171717] dark:text-white">
            Studio<span className="text-[#829d39]">Space</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 md:flex"
        >
          {navLinks.map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                key={link.name}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-2 text-sm font-semibold transition-colors ${
                  active
                    ? "text-[#171717] dark:text-white"
                    : "text-[#777777] hover:text-[#171717] dark:text-gray-400 dark:hover:text-white"
                }`}
              >
                {link.name}

                {active && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-[#c7f36b]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          {isPending ? (
            <div className="h-10 w-28 animate-pulse rounded-full bg-gray-200" />
          ) : user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-expanded={isDropdownOpen}
                aria-label="Open user menu"
                className="flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-[#eeede8] dark:hover:bg-gray-800"
              >
                <UserAvatar image={user.image} name={user.name} />

                <span className="flex max-w-36 flex-col text-left leading-tight">
                  <span className="truncate text-sm font-semibold text-[#171717] dark:text-white">
                    {user.name}
                  </span>

                  <span className="truncate text-xs text-[#777777] dark:text-gray-400">
                    {user.email}
                  </span>
                </span>

                <ChevronDown
                  size={16}
                  className={`text-gray-500 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* User Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-[#e8e7e2] bg-white p-2 shadow-xl dark:border-gray-700 dark:bg-gray-900">
                  <div className="border-b border-gray-100 px-3 py-3 dark:border-gray-700">
                    <p className="text-xs text-gray-500">Signed in as</p>

                    <p className="mt-1 truncate text-sm font-semibold text-gray-900 dark:text-white">
                      {user.email}
                    </p>
                  </div>

                  <div className="py-2">
                    {dashboardLinks.map((link) => {
                      const Icon = link.icon;

                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsDropdownOpen(false)}
                          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                            pathname === link.href
                              ? "bg-[#eff8dc] text-[#638b23]"
                              : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                          }`}
                        >
                          <Icon size={17} />
                          {link.name}
                        </Link>
                      );
                    })}
                  </div>

                  <div className="border-t border-gray-100 pt-2 dark:border-gray-700">
                    <button
                      type="button"
                      disabled={signingOut}
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                    >
                      <LogOut size={17} />
                      {signingOut ? "Signing out..." : "Sign Out"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-[#171717] transition-colors hover:bg-[#eeede8] dark:text-white dark:hover:bg-gray-800"
              >
                Log In
              </Link>

              <Link
                href="/sign-up"
                className="group flex items-center gap-2 rounded-full bg-[#171717] px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-[#303030]"
              >
                Get Started
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#e8e7e2] text-[#171717] transition-colors hover:bg-[#eeede8] dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </Container>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-[#e8e7e2] bg-[#f8f7f4] px-4 pb-6 pt-4 shadow-lg dark:border-gray-800 dark:bg-gray-950 md:hidden"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-[#eeede8] text-[#171717] dark:bg-gray-800 dark:text-white"
                      : "text-[#777777] hover:bg-[#eeede8] hover:text-[#171717] dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="mt-5 flex flex-col gap-3 border-t border-[#e8e7e2] pt-5 dark:border-gray-800">
            {isPending ? (
              <div className="h-12 animate-pulse rounded-xl bg-gray-200" />
            ) : user ? (
              <>
                <div className="flex items-center gap-3 px-2 py-2">
                  <UserAvatar image={user.image} name={user.name} />

                  <span className="flex min-w-0 flex-col leading-tight">
                    <span className="truncate text-sm font-semibold text-[#171717] dark:text-white">
                      {user.name}
                    </span>

                    <span className="truncate text-xs text-[#777777] dark:text-gray-400">
                      {user.email}
                    </span>
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  {dashboardLinks.map((link) => {
                    const Icon = link.icon;

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                          pathname === link.href
                            ? "bg-[#eff8dc] text-[#638b23]"
                            : "text-gray-700 hover:bg-[#eeede8] dark:text-gray-300 dark:hover:bg-gray-800"
                        }`}
                      >
                        <Icon size={17} />
                        {link.name}
                      </Link>
                    );
                  })}
                </div>

                <button
                  type="button"
                  disabled={signingOut}
                  onClick={handleSignOut}
                  className="flex items-center justify-center gap-2 rounded-full border border-[#e8e7e2] px-5 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50 dark:border-gray-700"
                >
                  <LogOut size={16} />
                  {signingOut ? "Signing out..." : "Sign Out"}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-full border border-[#e8e7e2] px-5 py-3 text-center text-sm font-semibold text-[#171717] transition-colors hover:bg-[#eeede8] dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
                >
                  Log In
                </Link>

                <Link
                  href="/sign-up"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-[#171717] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#303030]"
                >
                  Get Started
                  <ArrowUpRight size={16} />
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
