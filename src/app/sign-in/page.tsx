"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Aperture, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { signIn } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<
      string,
      string
    >;

    setLoading(true);

    try {
      const { error } = await signIn.email({
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast.error(error.message ?? "Invalid email or password");
        return;
      }

      toast.success("Welcome back!");
      router.replace("/");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setGoogleLoading(true);

    try {
      const { error } = await signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message ?? "Google sign in failed");
        setGoogleLoading(false);
      }
    } catch {
      toast.error("Unable to sign in with Google. Please try again.");
      setGoogleLoading(false);
    }
  }

  return (
    <main className="grid min-h-[calc(100vh-76px)] bg-white dark:bg-gray-950 lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-[#171717] p-12 text-white lg:flex">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#c7f36b]/15 blur-3xl" />
        <div className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-[#829d39]/20 blur-3xl" />

        <Link
          href="/"
          className="relative flex items-center gap-2.5"
          aria-label="StudioSpace Home"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c7f36b] text-[#171717]">
            <Aperture size={23} strokeWidth={2} />
          </span>

          <span className="text-xl font-extrabold tracking-tight">
            Studio<span className="text-[#c7f36b]">Space</span>
          </span>
        </Link>

        <div className="relative">
          <h2 className="max-w-md text-4xl font-extrabold leading-tight tracking-tight">
            Your next shoot starts here.
          </h2>

          <p className="mt-4 max-w-md text-base text-white/60">
            Book inspiring studios for photography, filmmaking, podcasting,
            music, and art — all in one place.
          </p>
        </div>

        <p className="relative text-sm text-white/40">
          Trusted by creators, studios, and teams worldwide.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-white px-4 py-12 transition-colors dark:bg-gray-950 sm:px-8">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#171717] dark:text-white">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-[#777777] dark:text-gray-400">
            Sign in to your StudioSpace account.
          </p>

          {/* Email & Password Form */}
          <Form onSubmit={onSubmit} className="mt-8 flex flex-col gap-5">
            <TextField isRequired name="email" type="email">
              <Label className="text-gray-700 dark:text-gray-200">Email</Label>

              <Input
                placeholder="you@example.com"
                className="dark:text-white"
              />

              <FieldError />
            </TextField>

            <TextField isRequired name="password" type="password">
              <Label className="text-gray-700 dark:text-gray-200">
                Password
              </Label>

              <Input placeholder="••••••••" className="dark:text-white" />

              <Description className="text-gray-500 dark:text-gray-400">
                Your password must be at least 8 characters with 1 uppercase and
                1 number.
              </Description>

              <FieldError />
            </TextField>

            <Button
              type="submit"
              variant="secondary"
              isPending={loading}
              isDisabled={googleLoading}
              className="w-full rounded-full bg-[#171717] text-white transition-colors hover:bg-[#303030] dark:bg-[#c7f36b] dark:text-[#171717] dark:hover:bg-[#b5e45b]"
            >
              Sign In
              <ArrowRight size={16} />
            </Button>
          </Form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-800" />
            </div>

            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs text-gray-500 dark:bg-gray-950 dark:text-gray-400">
                OR CONTINUE WITH
              </span>
            </div>
          </div>

          {/* Google Sign In */}
          <Button
            type="button"
            variant="secondary"
            isPending={googleLoading}
            isDisabled={loading}
            onPress={handleGoogleSignIn}
            className="w-full rounded-full border border-gray-200 bg-white text-gray-800 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
          >
            {!googleLoading && (
              <svg
                width="19"
                height="19"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.75 7.18l7.73 6C44.42 37.96 46.98 31.86 46.98 24.55z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.55 2.56 10.78l7.97-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
              </svg>
            )}
            Continue with Google
          </Button>

          <p className="mt-6 text-center text-sm text-[#777777] dark:text-gray-400">
            New to StudioSpace?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-[#829d39] hover:text-[#171717] dark:text-[#c7f36b] dark:hover:text-white"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
