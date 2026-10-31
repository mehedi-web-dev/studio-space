import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "StudioSpace | Creative Spaces",
    template: "%s | StudioSpace",
  },
  description:
    "Discover and book inspiring creative studios for photography, filmmaking, podcasting, music, and art.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar></Navbar>
        {children}

        <Footer></Footer>
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
