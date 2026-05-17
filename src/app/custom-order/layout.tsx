import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Order",
  description:
    "Start a custom order with Gradeline Supply Co. for laser engraving, industrial gifts, leather goods, tumblers, cutting boards, signs, and shop-built products.",
  alternates: {
    canonical: "/custom-order",
  },
  openGraph: {
    title: "Custom Order | Gradeline Supply Co.",
    description:
      "Start a custom order with Gradeline Supply Co. for laser engraving, industrial gifts, leather goods, tumblers, cutting boards, signs, and shop-built products.",
    url: "/custom-order",
    images: [
      {
        url: "/images/workflow/gradeline-custom-order-workflow.png",
        alt: "Start a custom Gradeline Supply Co. order",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Order | Gradeline Supply Co.",
    description:
      "Start a custom order with Gradeline Supply Co. for laser engraving, industrial gifts, leather goods, tumblers, cutting boards, signs, and shop-built products.",
    images: ["/images/workflow/gradeline-custom-order-workflow.png"],
  },
};

export default function CustomOrderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
