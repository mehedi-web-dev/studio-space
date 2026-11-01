"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Aperture, LogOut, Menu, X, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/studios" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "About Us", href: "/#about-us" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = authClient.useSession();

  const user = session?.user;
  const initials = user?.name
    ?.split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const avatar = user && (
    <>
      {user.image ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={user.image}
          alt={user.name ?? "Profile"}
          className="h-10 w-10 shrink-0 rounded-full border border-[#e8e7e2] object-cover"
        />
      ) : (
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#171717] text-sm font-bold text-[#c7f36b]">
          {initials}
        </span>
      )}
    </>
  );

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("Signed out");
    router.replace("/");
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/studios") return pathname.startsWith("/studios");
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#e8e7e2] bg-[#f8f7f4]/95 backdrop-blur-lg">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
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

          <span className="text-xl font-extrabold tracking-tight text-[#171717]">
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
                    ? "text-[#171717]"
                    : "text-[#777777] hover:text-[#171717]"
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
          {user ? (
            <div className="flex items-center gap-3">
              {avatar}
              <span className="flex flex-col leading-tight">
                <span className="max-w-37.5truncate text-sm font-semibold text-[#171717]">
                  {user.name}
                </span>
                <span className="max-w-37.5 truncate text-xs text-[#777777]">
                  {user.email}
                </span>
              </span>
              <button
                type="button"
                onClick={handleSignOut}
                aria-label="Sign out"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#e8e7e2] text-[#777777] transition-colors hover:bg-[#eeede8] hover:text-[#171717]"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-[#171717] transition-colors hover:bg-[#eeede8]"
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

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#e8e7e2] text-[#171717] transition-colors hover:bg-[#eeede8] md:hidden"
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-[#e8e7e2] bg-[#f8f7f4] px-4 pb-6 pt-4 shadow-lg md:hidden"
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
                      ? "bg-[#eeede8] text-[#171717]"
                      : "text-[#777777] hover:bg-[#eeede8] hover:text-[#171717]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="mt-5 flex flex-col gap-3 border-t border-[#e8e7e2] pt-5">
            {user ? (
              <>
                <div className="flex items-center gap-3 px-1">
                  {avatar}
                  <span className="flex min-w-0 flex-col leading-tight">
                    <span className="truncate text-sm font-semibold text-[#171717]">
                      {user.name}
                    </span>
                    <span className="truncate text-xs text-[#777777]">
                      {user.email}
                    </span>
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleSignOut();
                  }}
                  className="flex items-center justify-center gap-2 rounded-full border border-[#e8e7e2] px-5 py-3 text-sm font-semibold text-[#171717] transition-colors hover:bg-[#eeede8]"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-full border border-[#e8e7e2] px-5 py-3 text-center text-sm font-semibold text-[#171717] transition-colors hover:bg-[#eeede8]"
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
