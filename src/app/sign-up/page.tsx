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
import { signUp } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<
      string,
      string
    >;

    setLoading(true);

    const { error } = await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message ?? "Could not create your account");
      return;
    }

    toast.success("Account created. Welcome to StudioSpace!");
    router.replace("/");
  }

  return (
    <main className="grid min-h-[calc(100vh-76px)] bg-white transition-colors dark:bg-gray-950 lg:grid-cols-2">
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
            Create. Book. Shine.
          </h2>

          <p className="mt-4 max-w-md text-base text-white/60">
            Join StudioSpace and launch your creative journey today — from your
            first booking in under a minute.
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
            Create your account
          </h1>

          <p className="mt-2 text-sm text-[#777777] dark:text-gray-400">
            Start discovering and booking creative studios.
          </p>

          <Form onSubmit={onSubmit} className="mt-8 flex flex-col gap-5">
            <TextField isRequired name="name" minLength={2}>
              <Label className="text-gray-700 dark:text-gray-200">
                Full name
              </Label>

              <Input placeholder="Jane Doe" className="dark:text-white" />

              <FieldError />
            </TextField>

            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => {
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                  return "Please enter a valid email address";
                }

                return null;
              }}
            >
              <Label className="text-gray-700 dark:text-gray-200">Email</Label>

              <Input
                placeholder="you@example.com"
                className="dark:text-white"
              />

              <FieldError />
            </TextField>

            <TextField
              isRequired
              name="password"
              type="password"
              minLength={8}
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }

                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }

                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number";
                }

                return null;
              }}
            >
              <Label className="text-gray-700 dark:text-gray-200">
                Password
              </Label>

              <Input placeholder="••••••••" className="dark:text-white" />

              <Description className="text-gray-500 dark:text-gray-400">
                Must be at least 8 characters with 1 uppercase and 1 number
              </Description>

              <FieldError />
            </TextField>

            <label className="flex items-center gap-2 text-sm text-[#777777] dark:text-gray-400">
              <input
                type="checkbox"
                name="terms"
                required
                className="h-4 w-4 rounded border-[#e8e7e2] accent-[#829d39]"
              />
              I agree to the Terms of Service
            </label>

            <Button
              type="submit"
              variant="secondary"
              isPending={loading}
              className="w-full rounded-full bg-[#171717] text-white transition-colors hover:bg-[#303030] dark:bg-[#c7f36b] dark:text-[#171717] dark:hover:bg-[#b5e45b]"
            >
              Create Account
              <ArrowRight size={16} />
            </Button>
          </Form>

          <p className="mt-6 text-center text-sm text-[#777777] dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-[#829d39] hover:text-[#171717] dark:text-[#c7f36b] dark:hover:text-white"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
