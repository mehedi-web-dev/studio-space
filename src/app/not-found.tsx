import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";

const NotFound = () => {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-gray-50 px-4 py-16">
      <div className="mx-auto max-w-xl text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-indigo-100">
            <Search className="h-12 w-12 text-indigo-600" />
          </div>
        </div>

        <p className="text-8xl font-extrabold tracking-tight text-indigo-600">
          404
        </p>

        <h1 className="mt-5 text-3xl font-bold text-gray-900 sm:text-4xl">
          Page Not Found
        </h1>

        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-gray-500">
          Sorry, the page you are looking for does not exist or may have been
          moved. Let&apos;s help you find the right creative space.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            <Home size={18} />
            Back to Home
          </Link>

          <Link
            href="/studios"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:border-indigo-600 hover:text-indigo-600"
          >
            <ArrowLeft size={18} />
            Explore Studios
          </Link>
        </div>

        <p className="mt-10 text-sm text-gray-400">
          StudioSpace — Find your perfect creative space.
        </p>
      </div>
    </main>
  );
};

export default NotFound;
