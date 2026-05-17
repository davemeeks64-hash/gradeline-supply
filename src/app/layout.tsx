import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://gradelinesupplyco.com",
  ),
  applicationName: "Gradeline Supply Co.",
  title: {
    default: "Gradeline Supply Co.",
    template: "%s | Gradeline Supply Co.",
  },
  description:
    "Custom laser engraving, industrial gifts, leather goods, tumblers, cutting boards, signs, and blue-collar inspired products.",
  keywords: [
    "custom laser engraving",
    "industrial gifts",
    "leather goods",
    "tumblers",
    "cutting boards",
    "custom signs",
    "blue-collar gifts",
    "Gradeline Supply Co.",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Gradeline Supply Co.",
    description:
      "Custom laser engraving, industrial gifts, leather goods, tumblers, cutting boards, signs, and blue-collar inspired products.",
    url: "/",
    siteName: "Gradeline Supply Co.",
    images: [
      {
        url: "/images/hero/gradeline-homepage-hero-banner-v2.png",
        alt: "Gradeline Supply Co. custom laser engraving and shop-built goods",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gradeline Supply Co.",
    description:
      "Custom laser engraving, industrial gifts, leather goods, tumblers, cutting boards, signs, and blue-collar inspired products.",
    images: ["/images/hero/gradeline-homepage-hero-banner-v2.png"],
  },
  icons: {
    icon: "/gradeline-logo.png",
    shortcut: "/gradeline-logo.png",
    apple: "/gradeline-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
