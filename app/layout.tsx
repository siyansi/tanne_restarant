import type { Metadata, Viewport } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import Providers from "../hooks/provider";
import "./globals.css";
import { CulinaryCursor } from "@/hooks/crusor";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Tanne Fine Dining",
  description: "Tanne fine dining in Coimbatore.",
  authors: [{ name: "Tanne Fine Dining" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Tanne Fine Dining",
    description: "An immersive garden fine-dining experience in Coimbatore.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* <CulinaryCursor /> */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}